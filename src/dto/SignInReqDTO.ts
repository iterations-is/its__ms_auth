import Joi from 'joi';

export interface SignInReqDTO {
	username: string;
	password: string;
}

export const SignInReqDTOSchema: Joi.ObjectSchema = Joi.object({
	username: Joi.string().required(),
	password: Joi.string().required(),
});
