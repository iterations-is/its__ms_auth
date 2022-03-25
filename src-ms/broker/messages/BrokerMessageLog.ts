import { MessageDTO } from '../../dto';

export interface BrokerMessageLog {
	description: string;
	data?: string | object | [number, MessageDTO];
	createdAt: Date;
	ms: string;
}
