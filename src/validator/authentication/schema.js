const Joi = require('joi')

exports.AddAuthenticationPayloadSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
})

exports.EditAuthenticationPayloadSchema = Joi.object({
  refreshToken: Joi.string().required()
})

exports.DeleteAuthenticationPayloadSchema = Joi.object({
  refreshToken: Joi.string().required()
})
