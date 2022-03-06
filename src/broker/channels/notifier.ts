import { BrokerChannel } from '../BrokerChannel';
import { BROKER_CHANNEL_NOTIFICATIONS } from '../../constants';

export const notifier = new BrokerChannel(BROKER_CHANNEL_NOTIFICATIONS);
