const redis = require('redis')
const { REDIS_URL } = require('../util/config')

let client
let getAsync
let setAsync

if (!REDIS_URL) {
  const redisIsDisabled = () => {
    console.log('No REDIS_URL set, Redis is disabled')
    return null
  }
  getAsync = redisIsDisabled
  setAsync = redisIsDisabled
} else {
  client = redis.createClient({
    url: REDIS_URL
  })

  client.on('error', (err) => console.error('Redis Client Error', err))

  client.connect()

  getAsync = async (key) => {
    return await client.get(key)
  }

  setAsync = async (key, value) => {
    return await client.set(key, value)
  }
}

module.exports = {
  getAsync,
  setAsync
}
