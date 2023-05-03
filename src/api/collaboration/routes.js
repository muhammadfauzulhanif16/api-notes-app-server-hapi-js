exports.CollaborationRoutes = (handlers) => [
  {
    method: 'POST',
    path: '/collaborations',
    handler: (req, h) => handlers.addCollaboration(req, h),
    options: {
      auth: 'notes'
    }
  },
  {
    method: 'DELETE',
    path: '/collaborations',
    handler: (req, h) => handlers.deleteCollaboration(req, h),
    options: {
      auth: 'notes'
    }
  }
]
