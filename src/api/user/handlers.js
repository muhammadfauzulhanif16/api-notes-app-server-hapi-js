exports.UserHandlers = (services, validator) => {
  const addUser = async (req, h) => {
    validator.validateUserPayload(req.payload)

    const id = await services.addUser(req.payload)

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
    const user = await services.getUserById(req.params.id)

    return {
      status: 'success',
      data: {
        user
      }
    }
  }

  const getUsersByUsername = async (req) => {
    const users = await services.getUsersByUsername(req.query.username)

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
