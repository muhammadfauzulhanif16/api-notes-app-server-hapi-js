const { AuthenticationHandlers } = require('./handlers')
const { AuthenticationRoutes } = require('./routes')

exports.Authentication = {
  name: 'authentication',
  version: '1.0.0',
  register: async (
    server,
    { authenticationServices, userServices, tokenManager, validator }
  ) => {
    server.route(
      AuthenticationRoutes(
        AuthenticationHandlers(
          authenticationServices,
          userServices,
          tokenManager,
          validator
        )
      )
    )
  }
}
