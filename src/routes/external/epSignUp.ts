import { Request, Response } from 'express';
import axios from 'axios';
import { pick } from 'lodash';

import { SignUpReqDTO, SignUpReqDTOSchema, TokenPairDTO } from '../../dto';
import { BrokerMessageLog, BrokerMessageNotification, handleRestError, MessageDTO } from '@its/ms';
import { generateTokens } from '../../utils';
import { logger, notifier } from '../../broker';
import { MS_NAME, URI_MS_USERS } from '../../constants';

export const epSignUp = async (req: Request, res: Response) => {
	// Validation
	const signUpReq: SignUpReqDTO = req.body;
	const { error } = SignUpReqDTOSchema.validate(signUpReq);
	if (error) return res.status(400).json({ code: 'VALIDATION', payload: error } as MessageDTO);

	// REST Create user
	let userData;
	try {
		const userCreationResponse = await axios.post(`${URI_MS_USERS}/users`, signUpReq);
		userData = userCreationResponse.data.payload;
	} catch (error) {
		// REST error
		const errorData = handleRestError(error);

		logger.send({
			ms: MS_NAME,
			createdAt: new Date(),
			description: 'Error user registration',
			data: errorData,
		} as BrokerMessageLog);

		return res.status(errorData[0]).json(errorData[1]);
	}

	// Create token pair
	const tokenPair: TokenPairDTO = generateTokens()(
		pick(userData, ['id', 'name', 'username', 'email', 'role'])
	);

	notifier.send({
		userId: userData.id,
		createdAt: new Date(),
		description: 'Welcome to the system!',
	} as BrokerMessageNotification);

	logger.send({
		ms: MS_NAME,
		createdAt: new Date(),
		description: `User ${userData.email} was registered`,
	} as BrokerMessageLog);

	return res.status(201).json({
		message: 'user was created',
		payload: tokenPair,
	} as MessageDTO);
};
