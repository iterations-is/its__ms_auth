import { generateRandomString } from './generateRandomString';

describe('generateRandomString', () => {
	it('should return a string', () => {
		expect(typeof generateRandomString(2)).toBe('string');
	});

	it('should return a string of length 32', () => {
		expect(generateRandomString(32).length).toBe(32);
	});

	it('should return a string of length 16', () => {
		expect(generateRandomString(16).length).toBe(16);
	});

	it('should contain only letters and numbers', () => {
		const randomString = generateRandomString(16);
		expect(randomString).toMatch(/^[a-zA-Z0-9]+$/);
	});
});
