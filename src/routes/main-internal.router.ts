import { Router, Response, Request } from 'express';

export const internalRouter = Router();

internalRouter.post('/verify', (req: Request, res: Response) => {
	res.json({ info: 'success verify' });
});
