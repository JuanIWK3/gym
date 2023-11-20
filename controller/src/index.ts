import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { appRouter } from './trpc/router';
import mqtt from 'mqtt';

const server = createHTTPServer({
  router: appRouter,
});

server.listen(4000);

console.log('Listening on http://localhost:4000');

const client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', () => {
  console.log('Connected to MQTT broker');
  client.subscribe('sensor');
});

client.on('message', (topic, message) => {
  console.log("Received message: ", message.toString());

  if (message.toString() === 'Juan') {
    client.publish('sensor-response', 'confirmed');
    console.log("Published message: ", 'confirmed');

  } else {
    client.publish('sensor-response', 'denied');
    console.log("Published message: ", 'denied');
  }
});