exports.NoteRoutes = (handlers) => [
  {
    method: 'POST',
    path: '/notes',
    handler: (req, h) => handlers.addNote(req, h),
    options: {
      auth: 'notes'
    }
  },
  {
    method: 'GET',
    path: '/notes',
    handler: (req, h) => handlers.getNotes(req, h),
    options: {
      auth: 'notes'
    }
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: (req, h) => handlers.getNoteById(req, h),
    options: {
      auth: 'notes'
    }
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: (req, h) => handlers.editNoteById(req, h),
    options: {
      auth: 'notes'
    }
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: (req, h) => handlers.deleteNoteById(req, h),
    options: {
      auth: 'notes'
    }
  }
]
