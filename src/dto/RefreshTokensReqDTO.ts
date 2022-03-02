import Joi from 'joi';

export interface RefreshTokensReqDTO {
	accessToken: string;
}

export const RefreshTokensReqDTOSchema: Joi.ObjectSchema = Joi.object({
	accessToken: Joi.string(),
});
