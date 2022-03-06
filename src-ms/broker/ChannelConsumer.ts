import { Message } from 'amqplib/callback_api';

export interface ChannelConsumer {
	name: string;
	handler: (message: Message | null) => void;
}
