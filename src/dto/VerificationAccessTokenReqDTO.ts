import Joi from 'joi';

export interface VerificationAccessTokenReqDTO {
	accessToken?: string;
}

export const VerificationAccessTokenReqDTOSchema: Joi.ObjectSchema = Joi.object({
	accessToken: Joi.string().allow('').optional(),
});
