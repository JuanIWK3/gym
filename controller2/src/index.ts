import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { appRouter } from './trpc/router';
import mqtt from 'mqtt';
import { UserService } from './user/service';

const userService = new UserService()

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

type Message = {
  name: string;
  pin: string;
}

client.on('message', async (topic: string, message: Buffer) => {
  const msg = message.toString().trim();
  console.log("Received message: ", msg);

  const parsedMessage: Message = JSON.parse(message.toString());

  const users = await userService.getUsers()
  const names = users.map(user => user.name)

  console.log(names);


  if (names.includes(parsedMessage.name)) {
    try {
      await userService.addEntrance(parsedMessage.name, parsedMessage.pin)
      client.publish('sensor-response', 'granted');
    } catch (e) {
      client.publish('sensor-response', 'pin incorrect');
      console.log(e)
    }
  } else {
    client.publish('sensor-response', 'not found');
  }
});