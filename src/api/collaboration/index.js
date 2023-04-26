const { CollaborationHandlers } = require('./handlers')
const { CollaborationRoutes } = require('./routes')

exports.Collaboration = {
  name: 'collaboration',
  version: '1.0.0',
  register: async (
    server,
    { collaborationsService, noteService, validator }
  ) => {
    server.route(
      CollaborationRoutes(
        CollaborationHandlers(collaborationsService, noteService, validator)
      )
    )
  }
}
