exports.NoteHandlers = (services, validator) => {
  const addNote = async (req, h) => {
    validator.validateNotePayload(req.payload)

    const id = await services.addNote(req.payload, req.auth.credentials.id)

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
    const notes = await services.getNotes(req.auth.credentials.id)

    return {
      status: 'success',
      data: {
        notes
      }
    }
  }

  const getNoteById = async (req) => {
    await services.verifyNoteAccess(req.params.id, req.auth.credentials.id)
    const note = await services.getNoteById(req.params.id)

    return {
      status: 'success',
      data: {
        note
      }
    }
  }

  const editNoteById = async (req) => {
    validator.validateNotePayload(req.payload)

    await services.verifyNoteAccess(req.params.id, req.auth.credentials.id)
    await services.editNoteById(req.params.id, req.payload)

    return {
      status: 'success',
      message: 'Catatan berhasil diperbarui'
    }
  }

  const deleteNoteById = async (req) => {
    await services.verifyNoteOwner(req.params.id, req.auth.credentials.id)
    await services.deleteNoteById(req.params.id)

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
