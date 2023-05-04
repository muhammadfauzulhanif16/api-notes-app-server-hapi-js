const { InvariantError } = require('../../exceptions')
const { ImageHeadersSchema } = require('./schema')

exports.UploadValidator = {
  validateImageHeaders: (headers) => {
    const { error } = ImageHeadersSchema.validate(headers)

    if (error) {
      throw new InvariantError(error.message)
    }
  }
}
