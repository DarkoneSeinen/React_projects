import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const userExtractor = async (request, response, next) => {
  const token = request.token
  if (!token) {
    return response.status(401).json({ error: 'token missing' })
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(decodedToken.id)
    request.user = user
    next()
  } catch (error) {
    return response.status(401).json({ error: 'token invalid' })
  }
}

export default userExtractor
