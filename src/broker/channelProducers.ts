import {
	BROKER_CHANNEL_EMAILS,
	BROKER_CHANNEL_LOGS,
	BROKER_CHANNEL_NOTIFICATIONS,
	ChannelObservable,
	ChannelProducer,
} from '../../src-ms';

export const notifier = new ChannelObservable(BROKER_CHANNEL_NOTIFICATIONS);
export const emailer = new ChannelObservable(BROKER_CHANNEL_EMAILS);
export const logger = new ChannelObservable(BROKER_CHANNEL_LOGS);

export const channelProducers: ChannelProducer[] = [
	{
		name: BROKER_CHANNEL_NOTIFICATIONS,
		observable: notifier,
	},
	{
		name: BROKER_CHANNEL_EMAILS,
		observable: emailer,
	},
	{
		name: BROKER_CHANNEL_LOGS,
		observable: logger,
	},
];
