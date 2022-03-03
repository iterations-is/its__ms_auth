import { Router } from 'express';

import { epVerifyToken } from './internal';

export const internalRouter = Router();

internalRouter.post('/tokens/verification', epVerifyToken);
