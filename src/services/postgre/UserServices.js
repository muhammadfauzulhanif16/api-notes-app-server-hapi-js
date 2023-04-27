require('dotenv').config()
const { Pool } = require('pg')
const uuid = require('uuid')
const bcrypt = require('bcrypt')
const {
  InvariantError,
  NotFoundError,
  AuthenticationError
} = require('../../exceptions')

exports.UserServices = () => {
  const pool = new Pool()

  const addUser = async ({ fullName, username, password }) => {
    await verifyNewUsername(username)

    const id = uuid.v4()
    const hashedPassword = await bcrypt.hash(password, 16)
    const createdAt = new Date()

    const result = await pool.query(
      'INSERT INTO users VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      [id, fullName, username, hashedPassword, createdAt, createdAt]
    )

    if (!result.rowCount) throw new InvariantError('User gagal ditambahkan')

    return result.rows[0].id
  }

  const verifyNewUsername = async (username) => {
    const result = await pool.query(
      'SELECT username FROM users WHERE username = $1',
      [username]
    )

    if (result.rowCount > 0) {
      throw new InvariantError(
        'Gagal menambahkan user. Username sudah digunakan.'
      )
    }
  }

  const getUserById = async (id) => {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id])

    if (!result.rowCount) {
      throw new NotFoundError('User tidak ditemukan')
    }

    return result.rows[0]
  }

  const verifyUserCredential = async (username, password) => {
    const result = await pool.query(
      'SELECT id, password FROM users WHERE username = $1',
      [username]
    )

    if (!result.rowCount) {
      throw new AuthenticationError('Kredensial yang Anda berikan salah')
    }

    const { id, password: hashedPassword } = result.rows[0]
    const isValid = await bcrypt.compare(password, hashedPassword)

    if (!isValid) {
      throw new AuthenticationError('Kredensial yang Anda berikan salah')
    }

    return id
  }

  const getUsersByUsername = async (username) => {
    const result = await pool.query(
      'SELECT id, username, full_name FROM users WHERE username LIKE $1',
      [`%${username}%`]
    )

    return result.rows
  }

  return {
    addUser,
    verifyNewUsername,
    getUserById,
    verifyUserCredential,
    getUsersByUsername
  }
}
