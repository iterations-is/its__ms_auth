import { Router, Response, Request } from 'express';
import jwt from 'jsonwebtoken';

import { VerificationAccessTokenReqDTO, VerificationAccessTokenReqDTOSchema } from '../dto';
import { response } from '../../src-ms/utils';
import { JWT_SECRET } from '../constants';

export const internalRouter = Router();

internalRouter.post('/tokens/verification', (req: Request, res: Response) => {
	// Validation
	const verificationAccessTokenReq: VerificationAccessTokenReqDTO = req.body;
	const { error } = VerificationAccessTokenReqDTOSchema.validate(verificationAccessTokenReq);
	if (error) return response(res, 400, { message: 'validation error', payload: error });

	// Verify token
	const token = verificationAccessTokenReq.accessToken;
	try {
		const payload = jwt.verify(token, JWT_SECRET);
		return response(res, 200, { message: 'token is valid', payload });
	} catch (err) {
		// TODO: more error types
		return response(res, 401, { message: 'invalid token' });
	}
});
