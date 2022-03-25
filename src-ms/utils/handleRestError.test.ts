import { AxiosError } from 'axios';
import { handleRestError } from './handleRestError';

describe('handleRestError', () => {
	it('should pass 200 response', () => {
		const status = 200;
		const data = {
			message: 'error message',
		};
		const error = {
			request: {},
			response: {
				status,
				data: data,
			},
		} as AxiosError;

		const result = handleRestError(error);

		expect(result[0]).toEqual(status);
		expect(result[1]).toEqual(data);
	});

	it('should pass 400 response', () => {
		const status = 400;
		const data = {
			message: 'error message',
		};
		const error = {
			response: {
				status,
				data: data,
			},
		} as AxiosError;

		const result = handleRestError(error);

		expect(result[0]).toEqual(status);
		expect(result[1]).toEqual(data);
	});

	it('should generate 500 response', () => {
		const data = { message: 'server not responding' };
		const error = {
			request: {},
		} as AxiosError;

		const result = handleRestError(error);

		expect(result[0]).toEqual(500);
		expect(result[1]).toEqual(data);
	});

	it('should generate global 500 error', () => {
		const data = { message: 'global server error' };
		const error = {} as AxiosError;

		const result = handleRestError(error);

		expect(result[0]).toEqual(500);
		expect(result[1]).toEqual(data);
	});
});
