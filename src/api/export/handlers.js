exports.ExportHandlers = (services, validator) => {
  const addExportNotes = async (req, h) => {
    validator.validateExportNotesPayload(req.payload)

    const message = {
      userId: req.auth.credentials.id,
      targetEmail: req.payload.targetEmail
    }

    await services.sendMessage('export:notes', JSON.stringify(message))

    return h
      .response({
        status: 'success',
        message: 'Permintaan Anda dalam antrean'
      })
      .code(201)
  }

  return {
    addExportNotes
  }
}
