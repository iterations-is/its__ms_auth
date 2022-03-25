import { Request, Response } from 'express';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { pick } from 'lodash';
import { BrokerMessageLog, handleRestError, MessageDTO } from '@its/ms';
import { SignInReqDTO, SignInReqDTOSchema, TokenPairDTO, UserDataResDTO } from '../../dto';
import { MS_NAME, URI_MS_USERS } from '../../constants';
import { generateTokens } from '../../utils';
import { logger } from '../../broker';

export const epSignIn = async (req: Request, res: Response) => {
	// Validation
	const signInReq: SignInReqDTO = req.body;
	const { error } = SignInReqDTOSchema.validate(signInReq);
	if (error) return res.status(400).json({ code: 'VALIDATION', payload: error } as MessageDTO);

	// REST Try to find user
	const username: string = signInReq.username;
	let userData: UserDataResDTO;
	try {
		const userCreationResponse = await axios.post(`${URI_MS_USERS}/users/search`, { username });
		userData = userCreationResponse.data.payload;

		if (!userData)
			return res.status(400).json({
				message: 'username or password is incorrect',
				code: 'INVALID_CREDENTIALS',
			} as MessageDTO);
	} catch (error) {
		const errorData = handleRestError(error);

		// User not found
		if (errorData[0] === 404)
			return res.status(400).json({
				message: 'username or password is incorrect',
				code: 'INVALID_CREDENTIALS',
			} as MessageDTO);

		return res.status(errorData[0]).json(errorData[1]);
	}

	// Try to validate password
	const hash = userData.password;
	try {
		const isValid = await bcrypt.compare(signInReq.password, hash);
		if (!isValid)
			return res.status(400).json({
				message: 'username or password is incorrect',
				code: 'INVALID_CREDENTIALS',
			} as MessageDTO);
	} catch (error) {
		logger.send({
			ms: MS_NAME,
			createdAt: new Date(),
			description: 'Password recognition error',
			data: error,
		} as BrokerMessageLog);

		return res.status(500).json({
			message: 'password recognition error',
		} as MessageDTO);
	}

	// Create token pair
	const tokenPair: TokenPairDTO = generateTokens()(
		pick(userData, ['id', 'name', 'username', 'email', 'role'])
	);

	logger.send({
		ms: MS_NAME,
		createdAt: new Date(),
		description: `User ${userData.username} signed in`,
	} as BrokerMessageLog);

	return res.status(200).json({
		message: 'credentials',
		payload: tokenPair,
	} as MessageDTO);
};
