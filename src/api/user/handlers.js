exports.UserHandlers = (service, validator) => {
  const addUser = async (req, h) => {
    validator.validateUserPayload(req.payload)
    const id = await service.addUser(req.payload)

    return h
      .response({
        status: 'success',
        message: 'User berhasil ditambahkan',
        data: {
          id
        }
      })
      .code(201)
  }

  const getUserById = async (req) => {
    const user = await service.getUserById(req.params.id)

    return {
      status: 'success',
      data: {
        user
      }
    }
  }

  const getUsersByUsername = async (req) => {
    const users = await service.getUsersByUsername(req.query.username)

    return {
      status: 'success',
      data: {
        users
      }
    }
  }

  return {
    addUser,
    getUserById,
    getUsersByUsername
  }
}
