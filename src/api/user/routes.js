exports.UserRoutes = (handlers) => [
  {
    method: 'POST',
    path: '/users',
    handler: (req, h) => handlers.addUser(req, h)
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: (req, h) => handlers.getUserById(req, h)
  },
  {
    method: 'GET',
    path: '/users',
    handler: (req, h) => handlers.getUsersByUsername(req, h)
  }
]
