import { generateTokens } from './generateTokens';

jest.mock('../constants', () => ({
	JWT_EXPIRATION_TIME_ACCESS: '10 seconds',
	JWT_EXPIRATION_TIME_REFRESH: '10 seconds',
	JWT_SECRET: 'secret',
}));

describe('generateTokens', () => {
	it('should return a token and a refresh token', () => {
		const tokens = generateTokens()({});
		expect(tokens).toHaveProperty('accessToken');
		expect(tokens).toHaveProperty('refreshToken');
	});
});
