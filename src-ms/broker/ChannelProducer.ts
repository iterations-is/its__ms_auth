import { ChannelObservable } from './ChannelObservable';

export interface ChannelProducer {
	name: string;
	observable: ChannelObservable;
}
