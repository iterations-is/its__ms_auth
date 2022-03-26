import { Request, Response, NextFunction } from 'express';
import { API_INTERNAL_TOKEN } from '../constants';
import { MessageDTO } from '../dto';

/**
 * Check permission of internal calls
 */
export const mwApiInternal = async (req: Request, res: Response, next: NextFunction) => {
	const internalHeader = req?.headers?.['x-its-ms'] ?? '';

	if (internalHeader !== API_INTERNAL_TOKEN)
		return res.status(403).json({
			message: 'You do not have the required system permissions',
		} as MessageDTO);

	return next();
};
