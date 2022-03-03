import { Router } from 'express';

import { epRefreshTokens, epResetPassword, epSignIn, epSignUp } from './external';

export const externalRouter = Router();

externalRouter.post('/signup', epSignUp);

externalRouter.post('/signin', epSignIn);

externalRouter.post('/reset-password', epResetPassword);

externalRouter.post('/refresh', epRefreshTokens);
