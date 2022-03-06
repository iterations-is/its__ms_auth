import amqp from 'amqplib/callback_api';

import { BROKER_CHANNEL_EMAILS, BROKER_CHANNEL_NOTIFICATIONS, BROKER_URL } from '../constants';
import { emailer, notifier } from './channels';

export const runBroker = () => {
	try {
		amqp.connect(BROKER_URL, (errorConnection, connection) => {
			if (errorConnection) {
				// TODO: log
				throw errorConnection;
			}

			connection.createChannel((errorChannel, channel) => {
				if (errorChannel) {
					// TODO: log
					throw errorChannel;
				}

				// Crate a queue for the channel
				channel.assertQueue(BROKER_CHANNEL_NOTIFICATIONS, {
					durable: false,
				});

				notifier.setChannel(channel);
			});

			connection.createChannel((errorChannel, channel) => {
				if (errorChannel) {
					// TODO: log
					throw errorChannel;
				}

				// Crate a queue for the channel
				channel.assertQueue(BROKER_CHANNEL_EMAILS, {
					durable: false,
				});

				emailer.setChannel(channel);
			});
		});
	} catch (error) {
		// TODO: handle error
		console.log(error);
	}
};
