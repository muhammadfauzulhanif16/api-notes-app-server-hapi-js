const { Pool } = require('pg')
const { InvariantError } = require('../../exceptions')

exports.AuthenticationServices = () => {
  const pool = new Pool()

  const addRefreshToken = async (token) => {
    await pool.query({
      text: 'INSERT INTO authentications VALUES($1)',
      values: [token]
    })
  }

  const verifyRefreshToken = async (token) => {
    const result = await pool.query({
      text: 'SELECT token FROM authentications WHERE token = $1',
      values: [token]
    })

    if (!result.rows.length) {
      throw new InvariantError('Refresh token tidak valid')
    }
  }

  const deleteRefreshToken = async (token) => {
    await pool.query({
      text: 'DELETE FROM authentications WHERE token = $1',
      values: [token]
    })
  }

  return {
    addRefreshToken,
    verifyRefreshToken,
    deleteRefreshToken
  }
}
