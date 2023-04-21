exports.NoteHandlers = (service, validator) => {
  const addNote = async (req, h) => {
    validator.validateNotePayload(req.payload)
    const id = await service.addNote(req.payload)

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

  const getNotes = async () => {
    const notes = await service.getNotes()

    return {
      status: 'success',
      data: {
        notes
      }
    }
  }

  const getNoteById = async (req) => {
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
    await service.getNoteById(req.params.id, req.payload)

    return {
      status: 'success',
      message: 'Catatan berhasil diperbarui'
    }
  }

  const deleteNoteById = async (req) => {
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
