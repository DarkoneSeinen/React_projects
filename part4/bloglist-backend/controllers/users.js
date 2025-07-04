import bcrypt from 'bcrypt'
import express from 'express'
import User from '../models/user.js'

const usersRouter = express.Router()

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('notes') // si tienes relación
  response.json(users)
})

export default usersRouter
