import Joi from "@hapi/joi";

export const createCategory = Joi.object({
  name: Joi.string().required(),
  department: Joi.string().required(),
  description:Joi.string()
});

export const updateCategory = Joi.object({
  name: Joi.string(),
  department: Joi.string(),
  description:Joi.string()
});

