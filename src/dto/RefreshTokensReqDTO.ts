import Joi from 'joi';

export interface RefreshTokensReqDTO {
	token: string;
}

export const RefreshTokensReqDTOSchema: Joi.ObjectSchema = Joi.object({
	token: Joi.string(),
});
