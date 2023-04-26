const { Pool } = require('pg')
const uuid = require('uuid')
const { mapDBToNoteModel } = require('../../utils')
const {
  InvariantError,
  NotFoundError,
  AuthorizationError
} = require('../../exceptions')

exports.NoteServices = (collaborationService) => {
  const pool = new Pool()

  const addNote = async ({ title, body, tags }, owner) => {
    const id = uuid.v4()
    const createdAt = new Date()

    const note = await pool.query(
      'INSERT INTO notes VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      [id, title, body, tags, createdAt, createdAt, owner]
    )

    if (!note.rows[0].id) {
      throw new InvariantError('Catatan gagal ditambahkan')
    }

    return note.rows[0].id
  }

  const getNotes = async (owner) => {
    const notes = await pool.query(
      'SELECT notes.* FROM notes LEFT JOIN collaborations ON collaborations.note_id = notes.id WHERE notes.owner = $1 OR collaborations.user_id = $1 GROUP BY notes.id',
      [owner]
    )

    return notes.rows.map(mapDBToNoteModel)
  }

  const getNoteById = async (id) => {
    const note = await pool.query(
      'SELECT notes.*, users.username FROM notes LEFT JOIN users ON users.id = notes.owner WHERE notes.id = $1',
      [id]
    )

    if (!note.rows.length) {
      throw new NotFoundError('Catatan tidak ditemukan')
    }

    return note.rows.map(mapDBToNoteModel)[0]
  }

  const editNoteById = async (id, { title, body, tags }) => {
    const updatedAt = new Date()

    const note = await pool.query(
      'UPDATE notes SET title = $1, body = $2, tags = $3, updated_at = $4 WHERE id = $5 RETURNING id',
      [title, body, tags, updatedAt, id]
    )

    if (!note.rows.length) {
      throw new NotFoundError('Gagal memperbarui catatan. Id tidak ditemukan')
    }
  }

  const deleteNoteById = async (id) => {
    const note = await pool.query(
      'DELETE FROM notes WHERE id = $1 RETURNING id',
      [id]
    )

    if (!note.rows.length) {
      throw new NotFoundError('Catatan gagal dihapus. Id tidak ditemukan')
    }
  }

  const verifyNoteOwner = async (id, owner) => {
    const result = await pool.query(
      'SELECT * FROM notes WHERE id = $1 AND owner = $2',
      [id, owner]
    )

    if (!result.rows.length) {
      throw new NotFoundError('Catatan tidak ditemukan')
    }

    if (result.rows[0].owner !== owner) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini')
    }
  }

  const verifyNoteAccess = async (noteId, userId) => {
    try {
      await verifyNoteOwner(noteId, userId)
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error
      }

      try {
        await collaborationService.verifyCollaborator(noteId, userId)
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
    verifyNoteOwner,
    verifyNoteAccess
  }
}
