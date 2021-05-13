import Joi from 'joi';

export const signUpSchema = Joi.object({
  telephoneNumber: Joi.string().length(11),
});
