import { Router, Response, Request } from 'express';

export const externalRouter = Router();

externalRouter.post('/signup', (req: Request, res: Response) => {
	res.json({ info: 'success signup' });
});

externalRouter.post('/signin', (req: Request, res: Response) => {
	res.json({ info: 'success signin' });
});

externalRouter.post('/reset-password', (req: Request, res: Response) => {
	res.json({ info: 'success reset' });
});

externalRouter.post('/refresh', (req: Request, res: Response) => {
	res.json({ info: 'success refresh' });
});
