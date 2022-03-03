import { Request, Response } from 'express';
import { VerificationAccessTokenReqDTO, VerificationAccessTokenReqDTOSchema } from '../../dto';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../constants';

export const epVerifyToken = (req: Request, res: Response) => {
	// Validation
	const verificationAccessTokenReq: VerificationAccessTokenReqDTO = req.body;
	const { error } = VerificationAccessTokenReqDTOSchema.validate(verificationAccessTokenReq);
	if (error) return res.status(400).json({ message: 'validation error', payload: error });

	// Verify token
	const token = verificationAccessTokenReq.accessToken;
	try {
		const payload = jwt.verify(token, JWT_SECRET);

		return res.status(200).json({
			message: 'token is valid',
			payload: payload as object,
		});
	} catch (err) {
		// TODO: more error types
		return res.status(401).json({
			message: 'invalid token',
		});
	}
};
