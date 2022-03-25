import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { MessageDTO } from '@its/ms';
import { VerificationAccessTokenReqDTO, VerificationAccessTokenReqDTOSchema } from '../../dto';
import { JWT_SECRET } from '../../constants';

export const epVerifyToken = (req: Request, res: Response) => {
	// Validation
	const verificationAccessTokenReq: VerificationAccessTokenReqDTO = req.body;
	const { error } = VerificationAccessTokenReqDTOSchema.validate(verificationAccessTokenReq);
	if (error) return res.status(400).json({ code: 'VALIDATION', payload: error } as MessageDTO);

	// Verify token
	const token = verificationAccessTokenReq.accessToken;
	try {
		const payload = jwt.verify(token, JWT_SECRET);

		return res.status(200).json({
			message: 'token is valid',
			payload: payload as object,
		} as MessageDTO);
	} catch (err) {
		return res.status(401).json({
			code: 'INVALID_TOKEN',
			message: 'invalid token',
		} as MessageDTO);
	}
};
