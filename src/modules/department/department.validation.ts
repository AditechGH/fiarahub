import Joi from "@hapi/joi";

export const createDepartment = Joi.object({
  name: Joi.string().required(),
  description:Joi.string()
});

export const updateDepartment = Joi.object({
  name: Joi.string(),
  description:Joi.string()
})

