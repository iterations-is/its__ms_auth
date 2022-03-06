import { Channel } from 'amqplib/callback_api';
import { BROKER_CHANNEL_NOTIFICATIONS } from '../../constants';

class Notifier {
	channel: any;

	setChannel(channel: Channel) {
		this.channel = channel;
	}

	send(data: object) {
		const serialized = Buffer.from(JSON.stringify(data));
		this.channel.sendToQueue(BROKER_CHANNEL_NOTIFICATIONS, serialized);
	}
}

export const notifier = new Notifier();
