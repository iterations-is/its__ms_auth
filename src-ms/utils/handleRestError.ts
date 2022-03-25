import { AxiosError } from 'axios';
import { MessageDTO } from '../dto';

/**
 * Handle the error response from the REST API.
 *
 * May just pass the error to the caller. Or Recognize the connection error.
 */
export const handleRestError = (error: AxiosError): [number, MessageDTO] => {
	// MS responded with an error
	if (error.response) {
		// pass the error code and data to the caller
		return [error.response.status, error.response.data];
	}

	// MS doesnt respond at all
	if (error.request) {
		return [500, { message: 'server not responding' } as MessageDTO];
	}

	// Unknown error (this should never happen)
	return [500, { message: 'global server error' } as MessageDTO];
};
