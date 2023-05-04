const { UploadHandlers } = require('./handlers')
const { UploadRoutes } = require('./routes')

exports.Upload = {
  name: 'upload',
  version: '1.0.0',
  register: async (server, { services, validator }) => {
    server.route(UploadRoutes(UploadHandlers(services, validator)))
  }
}
