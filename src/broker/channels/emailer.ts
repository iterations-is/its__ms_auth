import { BrokerChannel } from '../BrokerChannel';
import { BROKER_CHANNEL_EMAILS } from '../../constants';

export const emailer = new BrokerChannel(BROKER_CHANNEL_EMAILS);
