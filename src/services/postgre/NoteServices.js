const { Pool } = require('pg')
const uuid = require('uuid')
const { mapDBToNoteModel } = require('../../utils')
const {
  InvariantError,
  NotFoundError,
  AuthorizationError
} = require('../../exceptions')

exports.NoteServices = (collaborationServices) => {
  const addNote = async ({ title, body, tags }, owner) => {
    const id = uuid.v4()
    const createdAt = new Date()

    const result = await new Pool().query(
      'INSERT INTO notes VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      [id, title, body, tags, createdAt, createdAt, owner]
    )

    if (!result.rows[0].id) {
      throw new InvariantError('Catatan gagal ditambahkan')
    }

    return result.rows[0].id
  }

  const getNotes = async (owner) => {
    const result = await new Pool().query(
      'SELECT notes.* FROM notes LEFT JOIN collaborations ON collaborations.note_id = notes.id WHERE notes.owner = $1 OR collaborations.user_id = $1 GROUP BY notes.id',
      [owner]
    )

    return result.rows.map(mapDBToNoteModel)
  }

  const getNoteById = async (id) => {
    const result = await new Pool().query(
      'SELECT notes.*, users.username FROM notes LEFT JOIN users ON users.id = notes.owner WHERE notes.id = $1',
      [id]
    )

    if (!result.rowCount) throw new NotFoundError('Catatan tidak ditemukan')

    return result.rows.map(mapDBToNoteModel)[0]
  }

  const editNoteById = async (id, { title, body, tags }) => {
    const updatedAt = new Date()

    const result = await new Pool().query(
      'UPDATE notes SET title = $1, body = $2, tags = $3, updated_at = $4 WHERE id = $5 RETURNING id, owner',
      [title, body, tags, updatedAt, id]
    )

    if (!result.rowCount) {
      throw new NotFoundError('Gagal memperbarui catatan. Id tidak ditemukan')
    }
  }

  const deleteNoteById = async (id) => {
    const result = await new Pool().query(
      'DELETE FROM notes WHERE id = $1 RETURNING id',
      [id]
    )

    if (!result.rowCount) {
      throw new NotFoundError('Catatan gagal dihapus. Id tidak ditemukan')
    }
  }

  const verifyOwner = async (noteId, owner) => {
    const result = await new Pool().query('SELECT * FROM notes WHERE id = $1', [
      noteId
    ])

    if (!result.rowCount) throw new NotFoundError('Catatan tidak ditemukan')

    if (result.rows[0].owner !== owner) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini')
    }
  }

  const verifyNoteAccess = async (noteId, userId) => {
    try {
      await verifyOwner(noteId, userId)
    } catch (error) {
      if (error instanceof NotFoundError) throw error

      try {
        await collaborationServices.verifyCollaborator(noteId, userId)
      } catch {
        throw error
      }
    }
  }

  return {
    addNote,
    getNotes,
    getNoteById,
    editNoteById,
    deleteNoteById,
    verifyOwner,
    verifyNoteAccess
  }
}
