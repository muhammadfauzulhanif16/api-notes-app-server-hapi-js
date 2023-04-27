const { UserHandlers } = require('./handlers')
const { UserRoutes } = require('./routes')

exports.User = {
  name: 'user',
  version: '1.0.0',
  register: async (server, { services, validator }) => {
    server.route(UserRoutes(UserHandlers(services, validator)))
  }
}
