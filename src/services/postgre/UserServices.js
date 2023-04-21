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

  const postUserService = async ({ fullName, username, password }) => {
    await verifyNewUsernameService(username)

    const id = uuid.v4()
    const hashedPassword = await bcrypt.hash(password, 10)
    const createdAt = new Date()

    const user = await pool.query({
      text: 'INSERT INTO users VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, fullName, username, hashedPassword, createdAt, createdAt]
    })

    if (!user.rows.length) {
      throw new InvariantError('User gagal ditambahkan')
    }

    return user.rows[0].id
  }

  const verifyNewUsernameService = async (username) => {
    const user = await pool.query({
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username]
    })

    if (user.rows.length > 0) {
      throw new InvariantError(
        'Gagal menambahkan user. Username sudah digunakan.'
      )
    }
  }

  const getUserByIdService = async (id) => {
    const user = await pool.query({
      text: 'SELECT * FROM users WHERE id = $1',
      values: [id]
    })

    if (!user.rows.length) {
      throw new NotFoundError('User tidak ditemukan')
    }

    return user.rows[0]
  }

  const verifyUserCredentialService = async (username, password) => {
    const user = await pool.query({
      text: 'SELECT id, password FROM users WHERE username = $1',
      values: [username]
    })

    if (!user.rowCount) {
      throw new AuthenticationError('Kredensial yang Anda berikan salah')
    }

    const { id, password: hashedPassword } = user.rows[0]
    const isValid = await bcrypt.compare(password, hashedPassword)

    if (!isValid) {
      throw new AuthenticationError('Kredensial yang Anda berikan salah')
    }

    return id
  }

  return {
    postUserService,
    verifyNewUsernameService,
    getUserByIdService,
    verifyUserCredentialService
  }
}
