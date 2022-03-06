import { Channel } from 'amqplib';

import { ChannelConsumer } from './ChannelConsumer';

export const activateChannelConsumer = (connection: any, channelConsumer: ChannelConsumer) => {
	connection.createChannel((errorChannel: object, channel: Channel) => {
		if (errorChannel) throw errorChannel;

		// Crate a queue for the channel
		channel.assertQueue(channelConsumer.name, {
			durable: false,
		});

		channel.consume(channelConsumer.name, channelConsumer.handler, { noAck: true });
	});
};
