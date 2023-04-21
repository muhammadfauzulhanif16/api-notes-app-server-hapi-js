exports.AuthenticationHandlers = (
  authenticationService,
  userService,
  tokenManager,
  validator
) => {
  const postAuthenticationHandler = async (req, h) => {
    validator.validatePostAuthenticationPayload(req.payload)

    const { username, password } = req.payload
    const id = await userService.verifyUserCredentialService(username, password)

    const accessToken = tokenManager.generateAccessToken({ id })
    const refreshToken = tokenManager.generateRefreshToken({ id })

    await authenticationService.postRefreshTokenService(refreshToken)

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

  const putAuthenticationHandler = async (req, h) => {
    validator.validatePutAuthenticationPayload(req.payload)

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

  const deleteAuthenticationHandler = async (req, h) => {
    validator.validateDeleteAuthenticationPayload(req.payload)

    await authenticationService.verifyRefreshTokenService(
      req.payload.refreshToken
    )
    await authenticationService.deleteRefreshTokenService(
      req.payload.refreshToken
    )

    return {
      status: 'success',
      message: 'Refresh token berhasil dihapus'
    }
  }

  return {
    postAuthenticationHandler,
    putAuthenticationHandler,
    deleteAuthenticationHandler
  }
}
