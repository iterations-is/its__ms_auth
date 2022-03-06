import { Request, Response } from 'express';
import axios from 'axios';
import { omit } from 'lodash';

import { SignUpReqDTO, SignUpReqDTOSchema, TokenPairDTO } from '../../dto';
import {
	JWT_EXPIRATION_TIME_ACCESS,
	JWT_EXPIRATION_TIME_REFRESH,
	URI_MS_USERS,
} from '../../constants';
import { handleRestError } from '../../../src-ms';
import { generateTokens } from '../../utils';
import { notifier } from '../../broker';

export const epSignUp = async (req: Request, res: Response) => {
	// Validation
	const signUpReq: SignUpReqDTO = req.body;
	const { error } = SignUpReqDTOSchema.validate(signUpReq);
	if (error) return res.status(400).json({ message: 'validation error', payload: error });

	// REST Create user
	let userData;
	try {
		const userCreationResponse = await axios.post(`${URI_MS_USERS}/users`, signUpReq);
		userData = userCreationResponse.data.payload;
	} catch (error) {
		const errorData = handleRestError(error);
		return res.status(errorData[0]).json(errorData[1]);
	}

	// Create token pair
	const tokenPair: TokenPairDTO = generateTokens(
		JWT_EXPIRATION_TIME_ACCESS,
		JWT_EXPIRATION_TIME_REFRESH
	)(omit(userData, ['password']));

	notifier.send({
		userId: userData.id,
		text: 'Welcome to the system!',
	});

	return res.status(201).json({
		message: 'user was created',
		payload: tokenPair,
	});
};
