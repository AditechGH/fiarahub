import Joi from "@hapi/joi";

export const create = Joi.object({
  name: Joi.string().required(),
  description:Joi.string().required(),
  price:Joi.number().required(),
  discounted_price:Joi.number().required(),
  display:Joi.number().required(),
});

export const update = Joi.object({
  name: Joi.string(),
  description:Joi.string(),
  price:Joi.number(),
  discounted_price:Joi.number(),
  display:Joi.number(),
})

