exports.AuthenticationRoutes = (handler) => [
  {
    method: 'POST',
    path: '/authentications',
    handler: (req, h) => handler.addAuthentication(req, h)
  },
  {
    method: 'PUT',
    path: '/authentications',
    handler: (req, h) => handler.editAuthentication(req, h)
  },
  {
    method: 'DELETE',
    path: '/authentications',
    handler: (req, h) => handler.deleteAuthentication(req, h)
  }
]
