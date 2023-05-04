const { Pool } = require('pg')
const uuid = require('uuid')
const { InvariantError } = require('../../exceptions')

exports.CollaborationServices = (cacheServices) => {
  const addCollaboration = async (noteId, userId) => {
    const id = uuid.v4()

    const result = await new Pool().query(
      'INSERT INTO collaborations VALUES($1, $2, $3) RETURNING id',
      [id, noteId, userId]
    )

    if (!result.rowCount) {
      throw new InvariantError('Kolaborasi gagal ditambahkan')
    }

    await cacheServices.deleteCache(`notes:${userId}`)
    return result.rows[0].id
  }

  const deleteCollaboration = async (noteId, userId) => {
    const result = await new Pool().query(
      'DELETE FROM collaborations WHERE note_id = $1 AND user_id = $2 RETURNING id',
      [noteId, userId]
    )

    if (!result.rowCount) {
      throw new InvariantError('Kolaborasi gagal dihapus')
    }

    await cacheServices.deleteCache(`notes:${userId}`)
  }

  const verifyCollaborator = async (noteId, userId) => {
    const result = await new Pool().query(
      'SELECT * FROM collaborations WHERE note_id = $1 AND user_id = $2',
      [noteId, userId]
    )

    if (!result.rowCount) {
      throw new InvariantError('Kolaborasi gagal diverifikasi')
    }
  }

  return { addCollaboration, deleteCollaboration, verifyCollaborator }
}
