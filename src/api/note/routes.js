exports.NoteRoutes = (handler) => [
  {
    method: 'POST',
    path: '/notes',
    handler: (req, h) => handler.addNote(req, h),
    options: {
      auth: 'notes_app_jwt'
    }
  },
  {
    method: 'GET',
    path: '/notes',
    handler: (req, h) => handler.getNotes(req, h),
    options: {
      auth: 'notes_app_jwt'
    }
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: (req, h) => handler.getNoteById(req, h),
    options: {
      auth: 'notes_app_jwt'
    }
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: (req, h) => handler.editNoteById(req, h),
    options: {
      auth: 'notes_app_jwt'
    }
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: (req, h) => handler.deleteNoteById(req, h),
    options: {
      auth: 'notes_app_jwt'
    }
  }
]
