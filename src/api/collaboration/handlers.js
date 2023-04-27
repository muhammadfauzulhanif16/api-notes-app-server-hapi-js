exports.CollaborationHandlers = (
  collaborationServices,
  noteServices,
  validator
) => {
  const addCollaboration = async (req, h) => {
    validator.validateCollaborationPayload(req.payload)

    await noteServices.verifyNoteOwner(
      req.payload.noteId,
      req.auth.credentials.id
    )
    const id = await collaborationServices.addCollaboration(
      req.payload.noteId,
      req.payload.userId
    )

    return h
      .response({
        status: 'success',
        message: 'Kolaborasi berhasil ditambahkan',
        data: {
          id
        }
      })
      .code(201)
  }

  const deleteCollaboration = async (req) => {
    validator.validateCollaborationPayload(req.payload)

    await noteServices.verifyNoteOwner(
      req.payload.noteId,
      req.auth.credentials.id
    )
    await collaborationServices.deleteCollaboration(
      req.payload.noteId,
      req.payload.userId
    )

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
