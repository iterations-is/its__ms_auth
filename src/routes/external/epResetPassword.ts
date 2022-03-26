import { Request, Response } from 'express';
import axios from 'axios';

import { ResetPasswordReqDTO, ResetPasswordReqDTOSchema, UserDataResDTO } from '../../dto';
import { MS_NAME, URI_MS_USERS } from '../../constants';
import {
	API_INTERNAL_TOKEN,
	BrokerMessageEmail,
	BrokerMessageLog,
	BrokerMessageNotification,
	handleRestError,
	MessageDTO,
} from '@its/ms';
import { generateRandomString } from '../../utils';
import { emailer, logger, notifier } from '../../broker';

export const epResetPassword = async (req: Request, res: Response) => {
	// Validation
	const resetPassword: ResetPasswordReqDTO = req.body;
	const { error } = ResetPasswordReqDTOSchema.validate(resetPassword);
	if (error) return res.status(400).json({ code: 'VALIDATION', payload: error } as MessageDTO);

	// REST Try to find user
	const email: string = resetPassword.email;
	let userData: UserDataResDTO;
	try {
		const userCreationResponse = await axios.post(
			`${URI_MS_USERS}/users/search`,
			{ email },
			{ headers: { 'x-its-ms': API_INTERNAL_TOKEN } }
		);
		userData = userCreationResponse.data.payload;

		if (!userData)
			return res.status(200).json({
				message: 'a email with a new password was reset',
			} as MessageDTO);
	} catch (error) {
		const errorData = handleRestError(error);

		if (errorData[0] === 404)
			return res.status(200).json({
				message: 'a email with a new password was reset',
			} as MessageDTO);

		return res.status(errorData[0]).json(errorData[1]);
	}

	// REST Update password
	const userId: string = userData.id;
	let password: string;
	if (userId) {
		try {
			password = generateRandomString(14);
			await axios.patch(
				`${URI_MS_USERS}/users/${userId}`,
				{ password },
				{ headers: { 'x-its-ms': API_INTERNAL_TOKEN } }
			);

			notifier.send({
				userId,
				createdAt: new Date(),
				description: 'A new password was sent to your email',
			} as BrokerMessageNotification);

			emailer.send({
				to: email,
				subject: 'ITS - Your new password',
				text: `Hello ${userData.name}. Your new password is: ${password}`,
			} as BrokerMessageEmail);

			logger.send({
				ms: MS_NAME,
				createdAt: new Date(),
				description: `A new password was sent to ${email}`,
			} as BrokerMessageLog);
		} catch (error) {
			const errorData = handleRestError(error);

			return res.status(errorData[0]).json(errorData[1]);
		}
	}

	return res.status(200).json({
		message: 'a email with a new password was reset',
	} as MessageDTO);
};
