const { NoteHandlers } = require('./handlers')
const { NoteRoutes } = require('./routes')

exports.Note = {
  name: 'note',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    server.route(NoteRoutes(NoteHandlers(service, validator)))
  }
}
