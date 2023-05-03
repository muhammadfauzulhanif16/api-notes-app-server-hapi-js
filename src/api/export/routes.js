exports.ExportRoutes = (handlers) => [
  {
    method: 'POST',
    path: '/export/notes',
    handler: (req, h) => handlers.addExportNotes(req, h),
    options: {
      auth: 'notes'
    }
  }
]
