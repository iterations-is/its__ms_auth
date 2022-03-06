import { Request, Response } from 'express';
import axios from 'axios';

import { ResetPasswordReqDTO, ResetPasswordReqDTOSchema, UserDataResDTO } from '../../dto';
import { URI_MS_USERS } from '../../constants';
import { BrokerMessageEmail, BrokerMessageNotification, handleRestError } from '../../../src-ms';
import { generateRandomString } from '../../utils';
import { emailer, notifier } from '../../broker';

export const epResetPassword = async (req: Request, res: Response) => {
	// Validation
	const resetPassword: ResetPasswordReqDTO = req.body;
	const { error } = ResetPasswordReqDTOSchema.validate(resetPassword);
	if (error)
		return res.status(400).json({
			message: 'validation error',
			payload: error,
		});

	// REST Try to find user
	const email: string = resetPassword.email;
	let userData: UserDataResDTO;
	try {
		const userCreationResponse = await axios.post(`${URI_MS_USERS}/users/search`, { email });
		userData = userCreationResponse.data.payload;
		if (!userData)
			return res.status(200).json({ message: 'a email with a new password was reset' });
	} catch (error) {
		const errorData = handleRestError(error);
		return res.status(errorData[0]).json(errorData[1]);
	}

	// REST Update password
	const userId: string = userData.id;
	let password: string;
	if (userId) {
		try {
			password = generateRandomString(14);
			await axios.patch(`${URI_MS_USERS}/users/${userId}`, { password });

			const notificationPasswordChange: BrokerMessageNotification = {
				userId,
				createdAt: new Date(),
				description: 'A new password was sent to your email',
			};
			notifier.send(notificationPasswordChange);

			const emailPasswordChange: BrokerMessageEmail = {
				to: email,
				subject: 'ITS - Your new password',
				text: `Hello ${userData.name}. Your new password is: ${password}`,
			};
			emailer.send(emailPasswordChange);
		} catch (error) {
			const errorData = handleRestError(error);
			return res.status(errorData[0]).json(errorData[1]);
		}
	}

	return res.status(200).json({ message: 'a email with a new password was reset' });
};
