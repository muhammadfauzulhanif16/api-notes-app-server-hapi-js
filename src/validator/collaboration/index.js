const { InvariantError } = require('../../exceptions')
const { CollaborationPayloadSchema } = require('./schema')

exports.CollaborationValidator = {
  validateCollaborationPayload: (payload) => {
    const { error } = CollaborationPayloadSchema.validate(payload)
    if (error) throw new InvariantError(error.message)
  }
}
