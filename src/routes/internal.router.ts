import { Router } from 'express';
import { epVerifyToken } from './internal';
import { mwApiInternal } from '@its/ms';

export const internalRouter = Router();

internalRouter.post('/tokens/verification', mwApiInternal, epVerifyToken);
