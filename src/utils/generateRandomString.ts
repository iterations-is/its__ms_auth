/**
 * https://gist.github.com/6174/6062387
 */

const allCapsAlpha = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
const allLowerAlpha = [...'abcdefghijklmnopqrstuvwxyz'];
const allNumbers = [...'0123456789'];
const base = [...allCapsAlpha, ...allNumbers, ...allLowerAlpha];

export const generateRandomString = (length: number) =>
	[...Array(length)].map(() => base[(Math.random() * base.length) | 0]).join('');
