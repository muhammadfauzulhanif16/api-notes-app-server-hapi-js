const {
  AddAuthenticationPayloadSchema,
  EditAuthenticationPayloadSchema,
  DeleteAuthenticationPayloadSchema
} = require('./schema')
const { InvariantError } = require('../../exceptions')

exports.AuthenticationValidator = {
  validateAddAuthenticationPayload: (payload) => {
    const { error } = AddAuthenticationPayloadSchema.validate(payload)
    if (error) throw new InvariantError(error.message)
  },
  validateEditAuthenticationPayload: (payload) => {
    const { error } = EditAuthenticationPayloadSchema.validate(payload)
    if (error) throw new InvariantError(error.message)
  },
  validateDeleteAuthenticationPayload: (payload) => {
    const { error } = DeleteAuthenticationPayloadSchema.validate(payload)
    if (error) throw new InvariantError(error.message)
  }
}
