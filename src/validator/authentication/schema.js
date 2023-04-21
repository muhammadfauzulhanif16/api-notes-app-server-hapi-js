const Joi = require('joi')

exports.PostAuthenticationPayloadSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
})

exports.PutAuthenticationPayloadSchema = Joi.object({
  refreshToken: Joi.string().required()
})

exports.DeleteAuthenticationPayloadSchema = Joi.object({
  refreshToken: Joi.string().required()
})
