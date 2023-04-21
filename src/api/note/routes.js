exports.NoteRoutes = (handler) => [
  {
    method: 'POST',
    path: '/notes',
    handler: (req, h) => handler.addNote(req, h)
  },
  {
    method: 'GET',
    path: '/notes',
    handler: (req, h) => handler.getNotes(req, h)
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: (req, h) => handler.getNoteById(req, h)
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: (req, h) => handler.editNoteById(req, h)
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: (req, h) => handler.deleteNoteById(req, h)
  }
]
