import { Router, Response, Request } from 'express';
import {
	RefreshTokensReqDTO,
	RefreshTokensReqDTOSchema,
	ResetPasswordReqDTO,
	ResetPasswordReqDTOSchema,
	SignInReqDTO,
	SignInReqDTOSchema,
	SignUpReqDTO,
	SignUpReqDTOSchema,
	TokenPairDTO,
} from '../dto';
import { response } from '../../src-ms/utils';
import { generateTokens } from '../utils';

export const externalRouter = Router();

externalRouter.post('/signup', (req: Request, res: Response) => {
	// Validation
	const signUpReq: SignUpReqDTO = req.body;
	const { error } = SignUpReqDTOSchema.validate(signUpReq);
	if (error) return response(res, 400, { message: 'validation error', payload: error });

	// REST Create user

	// Create token pair
	const tokenPair: TokenPairDTO = generateTokens('5 seconds', '100 seconds')({});

	return response(res, 201, { message: 'user was created', payload: tokenPair });
});

externalRouter.post('/signin', (req: Request, res: Response) => {
	// Validation
	const signInReq: SignInReqDTO = req.body;
	const { error } = SignInReqDTOSchema.validate(signInReq);
	if (error) return response(res, 400, { message: 'validation error', payload: error });

	// REST Try to find user
	const username = signInReq.username;

	// Try to validate password
	const hash = '';

	// Create token pair
	const tokenPair: TokenPairDTO = generateTokens('5 seconds', '100 seconds')({});

	return response(res, 200, { message: 'credentials', payload: tokenPair });
});

externalRouter.post('/reset-password', (req: Request, res: Response) => {
	// Validation
	const resetPassword: ResetPasswordReqDTO = req.body;
	const { error } = ResetPasswordReqDTOSchema.validate(resetPassword);
	if (error) return response(res, 400, { message: 'validation error', payload: error });

	// REST Try to find user
	const email = resetPassword.email;

	// REST Update password

	// RMQ Send a request with body of mail

	return response(res, 200, { message: 'a email with a new password was reset' });
});

externalRouter.post('/refresh', (req: Request, res: Response) => {
	// Validation
	const refreshTokensReq: RefreshTokensReqDTO = req.body;
	const { error } = RefreshTokensReqDTOSchema.validate(refreshTokensReq);
	if (error) return response(res, 400, { message: 'validation error', payload: error });

	// Check if refresh token is valid

	// Generate a new pair with data from the old pair

	res.json({ info: 'success refresh' });
});
