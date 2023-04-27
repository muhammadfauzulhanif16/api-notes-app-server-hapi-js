exports.AuthenticationHandlers = (
  authenticationServices,
  userServices,
  tokenManager,
  validator
) => {
  const addAuthentication = async (req, h) => {
    validator.validateAddAuthenticationPayload(req.payload)

    const id = await userServices.verifyUserCredential(
      req.payload.username,
      req.payload.password
    )
    const accessToken = tokenManager.generateAccessToken({ id })
    const refreshToken = tokenManager.generateRefreshToken({ id })
    await authenticationServices.addRefreshToken(refreshToken)

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

    await authenticationServices.verifyRefreshToken(req.payload.refreshToken)
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

    await authenticationServices.verifyRefreshToken(req.payload.refreshToken)
    await authenticationServices.deleteRefreshToken(req.payload.refreshToken)

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
