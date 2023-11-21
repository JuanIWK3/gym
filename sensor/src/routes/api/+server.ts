import { json } from '@sveltejs/kit';
import mqtt from 'mqtt';

import { waitForMessage } from '$lib';

export async function POST({ request }) {
  const { name } = await request.json();

  const client = await mqtt.connectAsync('mqtt://localhost:1883');

  await client.publishAsync('sensor', name);

  try {
    const res = await waitForMessage(client, 'sensor-response');
    await client.endAsync();
    return json({ message: res, name });
  } catch (error) {
    await client.endAsync();
    return json({ message: error, name });
  }
}
