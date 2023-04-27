const { CollaborationHandlers } = require('./handlers')
const { CollaborationRoutes } = require('./routes')

exports.Collaboration = {
  name: 'collaboration',
  version: '1.0.0',
  register: async (
    server,
    { collaborationServices, noteServices, validator }
  ) => {
    server.route(
      CollaborationRoutes(
        CollaborationHandlers(collaborationServices, noteServices, validator)
      )
    )
  }
}
