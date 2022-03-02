import Joi from 'joi';

export interface SignUpReqDTO {
	email: string;
	name: string;
	username: string;
	password: string;
}

export const SignUpReqDTOSchema: Joi.ObjectSchema = Joi.object({
	email: Joi.string().email().required(),
	name: Joi.string().required(),
	username: Joi.string().required(),
	password: Joi.string().min(8).required(),
});
