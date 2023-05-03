const { ExportHandlers } = require('./handlers')
const { ExportRoutes } = require('./routes')

exports.Export = {
  name: 'export',
  version: '1.0.0',
  register: async (server, { services, validator }) => {
    server.route(ExportRoutes(ExportHandlers(services, validator)))
  }
}
