import { Router, Response, Request } from 'express';
import { pick } from 'lodash';

import pkg from '../../package.json';

export const aboutRouter = Router();

aboutRouter.get('/about', (req: Request, res: Response) => {
	const data = pick(pkg, ['name', 'version', 'description']);

	return res.status(200).json(data);
});

aboutRouter.get('/about/health', (req: Request, res: Response) => res.status(200).end());
