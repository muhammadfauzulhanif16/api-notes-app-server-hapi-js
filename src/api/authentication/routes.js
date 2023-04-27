exports.AuthenticationRoutes = (handlers) => [
  {
    method: 'POST',
    path: '/authentications',
    handler: (req, h) => handlers.addAuthentication(req, h)
  },
  {
    method: 'PUT',
    path: '/authentications',
    handler: (req, h) => handlers.editAuthentication(req, h)
  },
  {
    method: 'DELETE',
    path: '/authentications',
    handler: (req, h) => handlers.deleteAuthentication(req, h)
  }
]
