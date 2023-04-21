const { NotePayloadSchema } = require('./schema')
const { InvariantError } = require('../../exceptions')

exports.NoteValidator = {
  validateNotePayload: (payload) => {
    const { error } = NotePayloadSchema.validate(payload)

    if (error) throw new InvariantError(error.message)
  }
}
