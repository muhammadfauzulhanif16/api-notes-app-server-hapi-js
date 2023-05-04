const path = require('path')

exports.UploadRoutes = (handlers) => [
  {
    method: 'POST',
    path: '/upload/images',
    handler: (req, h) => handlers.addUploadImage(req, h),
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream'
      }
    }
  },
  {
    method: 'GET',
    path: '/upload/{param*}',
    handler: {
      directory: {
        path: path.resolve(__dirname, 'file')
      }
    }
  }
]
