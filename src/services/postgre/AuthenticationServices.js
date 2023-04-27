const { Pool } = require('pg')
const { InvariantError } = require('../../exceptions')

exports.AuthenticationServices = () => {
  const pool = new Pool()

  const addRefreshToken = async (token) => {
    await pool.query('INSERT INTO authentications VALUES($1)', [token])
  }

  const verifyRefreshToken = async (token) => {
    const result = await pool.query(
      'SELECT token FROM authentications WHERE token = $1',
      [token]
    )

    if (!result.rowCount) {
      throw new InvariantError('Refresh token tidak valid')
    }
  }

  const deleteRefreshToken = async (token) => {
    await verifyRefreshToken(token)
    await pool.query('DELETE FROM authentications WHERE token = $1', [token])
  }

  return {
    addRefreshToken,
    verifyRefreshToken,
    deleteRefreshToken
  }
}
