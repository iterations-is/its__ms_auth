import Joi from 'joi';

export interface ResetPasswordReqDTO {
	email: string;
}

export const ResetPasswordReqDTOSchema: Joi.ObjectSchema = Joi.object({
	email: Joi.string().email().required(),
});
