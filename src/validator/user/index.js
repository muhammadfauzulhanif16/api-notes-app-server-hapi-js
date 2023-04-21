const { UserPayloadSchema } = require('./schema')
const { InvariantError } = require('../../exceptions')

exports.UserValidator = {
  validateUserPayload: (payload) => {
    const { error } = UserPayloadSchema.validate(payload)

    if (error) throw new InvariantError(error.message)
  }
}
