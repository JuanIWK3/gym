import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { appRouter } from './trpc/router';
import mqtt from 'mqtt';
import { UserService } from './user/service';

const userService = new UserService()

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

type Message = {
  name: string;
  pin: string;
}


client.on('message', (topic, message) => {
  console.log("Received message: ", message.toString());

  const parsedMessage: Message = JSON.parse(message.toString());

  if (parsedMessage.name === 'Juan') {
    client.publish('sensor-response', 'granted');
    const userService = new UserService()
    userService.addEntrance(parsedMessage.name, parsedMessage.pin)
  } else {
    client.publish('sensor-response', 'denied');
  }
});