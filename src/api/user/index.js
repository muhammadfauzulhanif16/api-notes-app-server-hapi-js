const { UserHandlers } = require('./handlers')
const { UserRoutes } = require('./routes')

exports.User = {
  name: 'user',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    server.route(UserRoutes(UserHandlers(service, validator)))
  }
}
