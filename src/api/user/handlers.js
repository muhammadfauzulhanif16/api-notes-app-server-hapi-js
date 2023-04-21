exports.UserHandlers = (service, validator) => {
  const postUserHandler = async (req, h) => {
    validator.validateUserPayload(req.payload)
    const userId = await service.postUserService(req.payload)

    return h
      .response({
        status: 'success',
        message: 'User berhasil ditambahkan',
        data: {
          userId
        }
      })
      .code(201)
  }

  const getUserByIdHandler = async (req) => {
    const user = await service.getUserByIdService(req.params.id)

    return {
      status: 'success',
      data: {
        user
      }
    }
  }

  return {
    postUserHandler,
    getUserByIdHandler
  }
}
