import { Channel } from 'amqplib';

import { ChannelProducer } from './ChannelProducer';

export const activateChannelProducer = (connection: any, channelProducer: ChannelProducer) => {
	connection.createChannel((errorChannel: object, channel: Channel) => {
		if (errorChannel) throw errorChannel;

		// Crate a queue for the channel
		channel.assertQueue(channelProducer.name, {
			durable: false,
		});

		channelProducer.observable.setChannel(channel);
	});
};
