import joi from 'joi';

export const AuthSchemaValidation = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

export const RegisterSchemaValidation = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  password: joi.string().min(6).required(),
  email: joi.string().email().required(),
  contactNo: joi.string().required(),
  role: joi.string().required(),
  status: joi.string().required(),
});
