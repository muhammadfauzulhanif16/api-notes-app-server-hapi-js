exports.CollaborationRoutes = (handler) => [
  {
    method: 'POST',
    path: '/collaborations',
    handler: (req, h) => handler.addCollaboration(req, h),
    options: {
      auth: 'notes_app_jwt'
    }
  },
  {
    method: 'DELETE',
    path: '/collaborations',
    handler: (req, h) => handler.deleteCollaboration(req, h),
    options: {
      auth: 'notes_app_jwt'
    }
  }
]
