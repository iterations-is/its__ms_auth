import { Response } from 'express';

interface ResponseTemplate {
	message?: string;
	payload?: any;
	code?: string;
}

export const response = (res: Response, status: number, data?: ResponseTemplate) =>
	res.status(status).json({
		code: data?.code,
		message: data?.message,
		payload: data?.payload,
	});
