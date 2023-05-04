const redis = require('redis')
const { ClientError } = require('../../exceptions')

exports.CacheServices = () => {
  const client = redis.createClient({
    socket: {
      host: process.env.REDIS_SERVER
    }
  })

  client.on('error', (error) => {
    console.error(error)
  })

  client.connect()

  const setCache = async (key, value, expirationInSecond = 3600) => {
    await client.set(key, value, {
      EX: expirationInSecond
    })
  }

  const getCache = async (key) => {
    const result = await client.get(key)

    if (result === null) throw new ClientError('Cache tidak ditemukan')

    return result
  }

  const deleteCache = async (key) => {
    return client.del(key)
  }

  return {
    setCache,
    getCache,
    deleteCache
  }
}
