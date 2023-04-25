exports.AuthenticationHandlers = (
  authenticationService,
  userService,
  tokenManager,
  validator
) => {
  const addAuthentication = async (req, h) => {
    validator.validateAddAuthenticationPayload(req.payload)

    const { username, password } = req.payload
    console.log(username)
    console.log(password)
    const id = await userService.verifyUserCredential(username, password)
    console.log(id)

    const accessToken = tokenManager.generateAccessToken({ id })
    const refreshToken = tokenManager.generateRefreshToken({ id })
    console.log(accessToken)
    console.log(refreshToken)

    await authenticationService.addRefreshToken(refreshToken)

    return h
      .response({
        status: 'success',
        message: 'Authentication berhasil ditambahkan',
        data: {
          accessToken,
          refreshToken
        }
      })
      .code(201)
  }

  const editAuthentication = async (req) => {
    validator.validateEditAuthenticationPayload(req.payload)
    await authenticationService.verifyRefreshToken(req.payload.refreshToken)
    const { id } = tokenManager.verifyRefreshToken(req.payload.refreshToken)
    const accessToken = tokenManager.generateAccessToken({ id })

    return {
      status: 'success',
      message: 'Access Token berhasil diperbarui',
      data: {
        accessToken
      }
    }
  }

  const deleteAuthentication = async (req) => {
    validator.validateDeleteAuthenticationPayload(req.payload)
    await authenticationService.verifyRefreshToken(req.payload.refreshToken)
    await authenticationService.deleteRefreshToken(req.payload.refreshToken)

    return {
      status: 'success',
      message: 'Refresh token berhasil dihapus'
    }
  }

  return {
    addAuthentication,
    editAuthentication,
    deleteAuthentication
  }
}
