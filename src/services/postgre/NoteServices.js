const { Pool } = require('pg')
const uuid = require('uuid')
const { mapDBToNoteModel } = require('../../utils')
const { InvariantError, NotFoundError } = require('../../exceptions')

exports.NoteServices = () => {
  const pool = new Pool()

  const addNote = async ({ title, body, tags }) => {
    const id = uuid.v4()
    const createdAt = new Date()

    const note = await pool.query({
      text: 'INSERT INTO notes VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, title, body, tags, createdAt, createdAt]
    })

    if (!note.rows[0].id) {
      throw new InvariantError('Catatan gagal ditambahkan')
    }

    return note.rows[0].id
  }

  const getNotes = async () => {
    const notes = await pool.query('SELECT * FROM notes')

    return notes.rows.map(mapDBToNoteModel)
  }

  const getNoteById = async (id) => {
    const note = await pool.query({
      text: 'SELECT * FROM notes WHERE id = $1',
      values: [id]
    })

    if (!note.rows.length) {
      throw new NotFoundError('Catatan tidak ditemukan')
    }

    return note.rows.map(mapDBToNoteModel)[0]
  }

  const editNoteById = async (id, { title, body, tags }) => {
    const updatedAt = new Date()

    const note = await pool.query({
      text: 'UPDATE notes SET title = $1, body = $2, tags = $3, updated_at = $4 WHERE id = $5 RETURNING id',
      values: [title, body, tags, updatedAt, id]
    })

    if (!note.rows.length) {
      throw new NotFoundError('Gagal memperbarui catatan. Id tidak ditemukan')
    }
  }

  const deleteNoteById = async (id) => {
    const note = await pool.query({
      text: 'DELETE FROM notes WHERE id = $1 RETURNING id',
      values: [id]
    })

    if (!note.rows.length) {
      throw new NotFoundError('Catatan gagal dihapus. Id tidak ditemukan')
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
