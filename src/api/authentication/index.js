const { AuthenticationHandlers } = require('./handlers')
const { AuthenticationRoutes } = require('./routes')

exports.Authentication = {
  name: 'authentication',
  version: '1.0.0',
  register: async (
    server,
    { authenticationService, userService, tokenManager, validator }
  ) => {
    server.route(
      AuthenticationRoutes(
        AuthenticationHandlers(
          authenticationService,
          userService,
          tokenManager,
          validator
        )
      )
    )
  }
}
