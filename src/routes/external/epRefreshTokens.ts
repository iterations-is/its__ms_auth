import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { RefreshTokensReqDTO, RefreshTokensReqDTOSchema, TokenPairDTO } from '../../dto';
import {
	JWT_EXPIRATION_TIME_ACCESS,
	JWT_EXPIRATION_TIME_REFRESH,
	JWT_SECRET,
} from '../../constants';
import { generateTokens } from '../../utils';

export const epRefreshTokens = (req: Request, res: Response) => {
	// Validation
	const refreshTokensReq: RefreshTokensReqDTO = req.body;
	const { error } = RefreshTokensReqDTOSchema.validate(refreshTokensReq);
	if (error)
		return res.status(400).json({
			message: 'validation error',
			payload: error,
		});

	// Check if refresh token is valid
	const token = refreshTokensReq.token;
	let payload: any;
	try {
		payload = jwt.verify(token, JWT_SECRET);
	} catch (err) {
		// TODO: more error types
		return res.status(400).json({
			message: 'invalid token',
		});
	}

	// Generate a new pair with data from the old pair
	const tokenPair: TokenPairDTO = generateTokens(
		JWT_EXPIRATION_TIME_ACCESS,
		JWT_EXPIRATION_TIME_REFRESH
	)(payload?.payload);

	return res.status(200).json({
		message: 'credentials',
		payload: tokenPair,
	});
};
