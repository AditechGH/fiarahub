import Joi from "@hapi/joi";
const passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

export const registerAdmin = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().regex(passwordReg).required(),
      type: Joi.string().required(),
      name: Joi.string().required()
});

export const changePassword = Joi.object({
   password: Joi.string().regex(passwordReg).required(),
});

export const updateAdmin = Joi.object({
  email: Joi.string().email(),
  type: Joi.string(),
  name: Joi.string()
});
