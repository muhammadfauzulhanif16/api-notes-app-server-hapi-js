exports.UploadHandlers = (services, validator) => {
  const addUploadImage = async (req, h) => {
    const { data } = req.payload

    validator.validateImageHeaders(data.hapi.headers)

    const filename = await services.writeFile(data, data.hapi)

    return h
      .response({
        status: 'success',
        data: {
          fileLocation: `http://${process.env.HOST}:${process.env.PORT}/upload/images/${filename}`
        }
      })
      .code(201)
  }

  return {
    addUploadImage
  }
}
