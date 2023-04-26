exports.UserRoutes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: (req, h) => handler.addUser(req, h)
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: (req, h) => handler.getUserById(req, h)
  },
  {
    method: 'GET',
    path: '/users',
    handler: (req, h) => handler.getUsersByUsername(req, h)
  }
]
