const { ExportNotesPayloadSchema } = require('./schema')
const { InvariantError } = require('../../exceptions')

exports.ExportValidator = {
  validateExportNotesPayload: (payload) => {
    const { error } = ExportNotesPayloadSchema.validate(payload)

    if (error) throw new InvariantError(error.message)
  }
}
