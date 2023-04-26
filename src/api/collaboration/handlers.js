exports.CollaborationHandlers = (
  collaborationService,
  noteService,
  validator
) => {
  const addCollaboration = async (req, h) => {
    validator.validateCollaborationPayload(req.payload)
    const { id: credentialId } = req.auth.credentials

    await noteService.verifyNoteOwner(req.payload.noteId, credentialId)
    const collaborationId = await collaborationService.addCollaboration(
      req.payload
    )

    return h
      .response({
        status: 'success',
        message: 'Kolaborasi berhasil ditambahkan',
        data: {
          collaborationId
        }
      })
      .code(201)
  }

  const deleteCollaboration = async (req) => {
    validator.validateCollaborationPayload(req.payload)
    const { id: credentialId } = req.auth.credentials

    await noteService.verifyNoteOwner(req.payload.noteId, credentialId)
    await collaborationService.deleteCollaboration(req.payload)

    return {
      status: 'success',
      message: 'Kolaborasi berhasil dihapus'
    }
  }

  return {
    addCollaboration,
    deleteCollaboration
  }
}
