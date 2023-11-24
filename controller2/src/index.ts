import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { appRouter } from './trpc/router';
import mqtt from 'mqtt';
import { UserService } from './user/service';

const server = createHTTPServer({
  router: appRouter,
});

server.listen(4001);

console.log('Listening on http://localhost:4001');

const client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', () => {
  console.log('Connected to MQTT broker');
  client.subscribe('sensor-controller2');
});

client.on('message', async(topic, message) => {
  console.log("Received message: ", message.toString());

  const userService = new UserService()
  const users = await userService.getUsers()
  const names = users.map(user => user.name)

  if (names.includes(message.toString().trim())) {
    client.publish('sensor-response', 'granted');
    const userService = new UserService()
    userService.addEntrance(message.toString().trim())
  } else {
    client.publish('sensor-response', 'denied');
  }
});