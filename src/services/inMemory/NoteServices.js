const Uuid = require('uuid')
const Exception = require('../../exceptions')

const NoteServices = () => {
  const notes = []

  // const postNoteService = (payload) => {
  const postNoteService = ({ title, body, tags }) => {
    const id = Uuid.v5(title, Uuid.v4())
    const createdAt = new Date().toISOString()
    const updatedAt = createdAt

    notes.push({
      id,
      // payload,
      title,
      body,
      tags,
      createdAt,
      updatedAt
    })

    if (!notes.filter(({ id: noteId }) => noteId === id).length > 0) {
      throw Exception.InvariantError('Catatan gagal ditambahkan')
      // throw new Error('Catatan gagal ditambahkan')
    }

    return id
  }

  const getNotesService = () => notes

  const getNoteByIdService = (id) => {
    const note = notes.filter(({ id: noteId }) => noteId === id)[0]

    if (!note) {
      throw Exception.NotFoundError('Catatan tidak ditemukan')
      // throw new Error('Catatan tidak ditemukan')
    }

    return note
  }

  // const putNoteService = (id, payload) => {
  const putNoteService = (id, { title, body, tags }) => {
    const noteId = notes.findIndex(({ id: noteId }) => noteId === id)

    if (noteId === -1) {
      throw Exception.NotFoundError('Gagal memperbarui catatan. Id tidak ditemukan')
      // throw new Error('Gagal memperbarui catatan. Id tidak ditemukan')
    }

    const updatedAt = new Date().toISOString()

    notes[noteId] = {
      ...notes[noteId],
      // payload,
      title,
      body,
      tags,
      updatedAt
    }
  }

  const deleteNoteService = (id) => {
    const noteId = notes.findIndex(({ id: noteId }) => noteId === id)

    if (noteId === -1) {
      throw Exception.NotFoundError('Catatan gagal dihapus. Id tidak ditemukan')
      // throw new Error('Catatan gagal dihapus. Id tidak ditemukan')
    }

    notes.splice(noteId, 1)
  }

  return {
    postNoteService,
    getNotesService,
    getNoteByIdService,
    putNoteService,
    deleteNoteService
  }
}

module.exports = NoteServices
