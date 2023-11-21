import { json } from '@sveltejs/kit';
import mqtt from 'mqtt';

import { waitForMessage } from '$lib';


export async function POST({ request }) {
  const { name } = await request.json();

  const client = await mqtt.connectAsync('mqtt://localhost:1883');

  try {
    await client.publishAsync('sensor-controller', name);

    console.log('Waiting for message on controller 1');

    const res = await waitForMessage(client, 'sensor-response');

    await client.endAsync();

    return json({ message: res, name });
  } catch (error) {
    console.log('Error on controller 1, trying controller 2');

    try {
      await client.publishAsync('sensor-controller2', name);

      console.log('Waiting for message on controller 2');

      const res = await waitForMessage(client, 'sensor-response');

      await client.endAsync();

      return json({ message: res, name });
    } catch (error) {
      await client.endAsync();

      return json({ message: error, name });
    }
  }
}
