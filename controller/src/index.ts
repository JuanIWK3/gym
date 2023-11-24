import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { appRouter } from './trpc/router';
import mqtt from 'mqtt';
import { UserService } from './user/service';

const server = createHTTPServer({
  router: appRouter,
});

server.listen(4000);

console.log('Listening on http://localhost:4000');

const client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', () => {
  console.log('Connected to MQTT broker');
  client.subscribe('sensor-controller');
});

client.on('message', async (topic: string, message: Buffer) => {
  const msg = message.toString().trim();
  console.log("Received message: ", msg);

  const userService = new UserService()
  const users = await userService.getUsers()
  const names = users.map(user => user.name)

  if (names.includes(msg)) {
    client.publish('sensor-response', 'granted');
    userService.addEntrance(msg)
  } else {
    client.publish('sensor-response', 'denied');
  }
});