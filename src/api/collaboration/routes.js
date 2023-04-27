exports.CollaborationRoutes = (handlers) => [
  {
    method: 'POST',
    path: '/collaborations',
    handler: (req, h) => handlers.addCollaboration(req, h),
    options: {
      auth: 'notes_app_jwt'
    }
  },
  {
    method: 'DELETE',
    path: '/collaborations',
    handler: (req, h) => handlers.deleteCollaboration(req, h),
    options: {
      auth: 'notes_app_jwt'
    }
  }
]
