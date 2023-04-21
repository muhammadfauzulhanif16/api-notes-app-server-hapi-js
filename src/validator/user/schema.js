const Joi = require('joi')

exports.UserPayloadSchema = Joi.object({
  fullName: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required()
})
