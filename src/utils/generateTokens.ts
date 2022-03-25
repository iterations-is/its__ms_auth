import jwt, { JwtPayload } from 'jsonwebtoken';

import { JWT_EXPIRATION_TIME_ACCESS, JWT_EXPIRATION_TIME_REFRESH, JWT_SECRET } from '../constants';
import { TokenPairDTO } from '../dto';

export const generateTokens =
	(
		accessExp: string = JWT_EXPIRATION_TIME_ACCESS,
		refreshExp: string = JWT_EXPIRATION_TIME_REFRESH
	) =>
	(payload: object | string | JwtPayload): TokenPairDTO => {
		const accessToken = jwt.sign({ tokenType: 'access', payload }, JWT_SECRET, {
			expiresIn: accessExp,
		});
		const refreshToken = jwt.sign({ tokenType: 'refresh', payload }, JWT_SECRET, {
			expiresIn: refreshExp,
		});

		return { accessToken, refreshToken };
	};
