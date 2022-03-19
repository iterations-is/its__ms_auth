import { Connection } from 'amqplib';
import amqp from 'amqplib/callback_api';
import { BROKER_URL } from '../../src/constants';
import { ChannelProducer } from './ChannelProducer';
import { activateChannelProducer } from './activateChannelProducer';
import { ChannelConsumer } from './ChannelConsumer';
import { activateChannelConsumer } from './activateChannelConsumer';

export const runBroker = (
	channelProducers: ChannelProducer[],
	channelConsumers: ChannelConsumer[]
) => {
	try {
		amqp.connect(BROKER_URL, (errorConnection, connection: Connection) => {
			if (errorConnection) throw errorConnection;

			channelProducers.forEach((producer) => {
				activateChannelProducer(connection, producer);
			});

			channelConsumers.forEach((consumer) => {
				activateChannelConsumer(connection, consumer);
			});
		});
	} catch (error) {
		// TODO: handle error
		console.log(error);
	}
};
