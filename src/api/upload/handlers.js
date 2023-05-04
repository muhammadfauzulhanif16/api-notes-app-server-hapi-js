exports.UploadHandlers = (services, validator) => {
  const addUploadImage = async (req, h) => {
    const { data } = req.payload

    validator.validateImageHeaders(data.hapi.headers)

    const fileLocation = await services.writeFile(data, data.hapi)

    return h
      .response({
        status: 'success',
        data: {
          fileLocation
        }
      })
      .code(201)
  }

  return {
    addUploadImage
  }
}
