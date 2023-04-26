exports.NoteHandlers = (service, validator) => {
  const addNote = async (req, h) => {
    validator.validateNotePayload(req.payload)
    const { id: credentialId } = req.auth.credentials
    const id = await service.addNote(req.payload, credentialId)

    return h
      .response({
        status: 'success',
        message: 'Catatan berhasil ditambahkan',
        data: {
          id
        }
      })
      .code(201)
  }

  const getNotes = async (req) => {
    const { id: credentialId } = req.auth.credentials
    const notes = await service.getNotes(credentialId)

    return {
      status: 'success',
      data: {
        notes
      }
    }
  }

  const getNoteById = async (req) => {
    const { id: credentialId } = req.auth.credentials
    await service.verifyNoteOwner(req.params.id, credentialId)
    const note = await service.getNoteById(req.params.id)

    return {
      status: 'success',
      data: {
        note
      }
    }
  }

  const editNoteById = async (req) => {
    validator.validateNotePayload(req.payload)
    const { id: credentialId } = req.auth.credentials
    await service.verifyNoteOwner(req.params.id, credentialId)
    const note = await service.editNoteById(req.params.id, req.payload)

    return {
      status: 'success',
      message: 'Catatan berhasil diperbarui',
      data: {
        note
      }
    }
  }

  const deleteNoteById = async (req) => {
    const { id: credentialId } = req.auth.credentials
    await service.verifyNoteOwner(req.params.id, credentialId)
    await service.deleteNoteById(req.params.id)

    return {
      status: 'success',
      message: 'Catatan berhasil dihapus'
    }
  }

  return {
    addNote,
    getNotes,
    getNoteById,
    editNoteById,
    deleteNoteById
  }
}
