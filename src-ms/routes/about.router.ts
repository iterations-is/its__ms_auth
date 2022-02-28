import { Router, Response, Request } from 'express';
import pkg from '../../package.json';

export const aboutRouter = Router();

aboutRouter.get('/about', (req: Request, res: Response) => {
	res.json(pkg);
});

aboutRouter.get('/about/health', (req: Request, res: Response) => res.status(200).end());
