export const MS_EXPRESS_PORT = process.env.MS_EXPRESS_PORT ?? 3000;

export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRATION_TIME_ACCESS = process.env.JWT_EXPIRATION_TIME_ACCESS;
export const JWT_EXPIRATION_TIME_REFRESH = process.env.JWT_EXPIRATION_TIME_REFRESH;

export const BCRYPT_SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS;

export const URI_MS_USERS = process.env.URI_MS_USERS;

export const BROKER_URL = process.env.BROKER_URL ?? 'amqp://localhost';
export const BROKER_CHANNEL_NOTIFICATIONS = 'notifications';
