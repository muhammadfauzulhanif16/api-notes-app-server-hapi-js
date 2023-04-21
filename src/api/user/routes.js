exports.UserRoutes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: (req, h) => handler.postUserHandler(req, h)
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: (req, h) => handler.getUserByIdHandler(req, h)
  }
]
