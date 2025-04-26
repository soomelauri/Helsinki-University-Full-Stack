const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

// Creating a POST request to save a user
userRouter.post('/', async (request, response)  => {
  const { name, username, password } = request.body

  if (password.length < 3) {
    return response.status(401).json({ error: 'password must be at least three characters' })
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const user = new User({
    name,
    username,
    passwordHash
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

// GET route to get all users
userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, author: 1, title: 1 })
  response.json(users)
})

module.exports = userRouter
