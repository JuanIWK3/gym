import type { MqttClient } from 'mqtt';

// place files you want to import through the `$lib` alias in this folder.
export async function waitForMessage(client: MqttClient, topic: string) {
	return new Promise((resolve, reject) => {
		client.subscribeAsync(topic).then(() => {
			client.on('message', (topic, message) => {
				console.log(message.toString());

				resolve(message.toString());
			});
		});

		setTimeout(() => {
			reject('timeout');
		}, 3000);
	});
}
