import { Channel } from 'amqplib/callback_api';

export class ChannelObservable {
	name: string;
	channel: Channel;

	constructor(name: string) {
		this.name = name;
	}

	setChannel(channel: Channel) {
		this.channel = channel;
	}

	send(data: object) {
		const serialized = Buffer.from(JSON.stringify(data));
		this.channel.sendToQueue(this.name, serialized);
	}
}
