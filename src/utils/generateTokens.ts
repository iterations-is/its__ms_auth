import jwt, { JwtPayload } from 'jsonwebtoken';

import { JWT_SECRET } from '../constants';
import { TokenPairDTO } from '../dto';

export const generateTokens =
	(accessExp: string, refreshExp: string) =>
	(payload: object | string | JwtPayload): TokenPairDTO => {
		const accessToken = jwt.sign({ tokenType: 'access', payload }, JWT_SECRET, {
			expiresIn: accessExp,
		});
		const refreshToken = jwt.sign({ tokenType: 'refresh', payload }, JWT_SECRET, {
			expiresIn: refreshExp,
		});

		return { accessToken, refreshToken };
	};
