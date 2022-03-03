import { Request, Response } from 'express';
import axios from 'axios';
import bcrypt from 'bcryptjs';

import { SignInReqDTO, SignInReqDTOSchema, TokenPairDTO, UserDataResDTO } from '../../dto';
import {
	JWT_EXPIRATION_TIME_ACCESS,
	JWT_EXPIRATION_TIME_REFRESH,
	URI_MS_USERS,
} from '../../constants';
import { handleRestError } from '../../../src-ms';
import { generateTokens } from '../../utils';

export const epSignIn = async (req: Request, res: Response) => {
	// Validation
	const signInReq: SignInReqDTO = req.body;
	const { error } = SignInReqDTOSchema.validate(signInReq);
	if (error)
		return res.status(400).json({
			message: 'validation error',
			payload: error,
		});

	// REST Try to find user
	const username: string = signInReq.username;
	let userData: UserDataResDTO;
	try {
		const userCreationResponse = await axios.post(`${URI_MS_USERS}/users/search`, { username });
		userData = userCreationResponse.data.payload;
		if (!userData)
			return res.status(400).json({
				message: 'username or password is incorrect',
			});
	} catch (error) {
		const errorData = handleRestError(error);
		return res.status(errorData[0]).json(errorData[1]);
	}

	// Try to validate password
	const hash = userData.password;
	try {
		const isValid = await bcrypt.compare(signInReq.password, hash);
		if (!isValid) return res.status(400).json({ message: 'username or password is incorrect' });
	} catch (error) {
		return res.status(400).json({ message: 'password recognition error' });
	}

	// Create token pair
	const tokenPair: TokenPairDTO = generateTokens(
		JWT_EXPIRATION_TIME_ACCESS,
		JWT_EXPIRATION_TIME_REFRESH
	)(userData);

	return res.status(200).json({
		message: 'credentials',
		payload: tokenPair,
	});
};
