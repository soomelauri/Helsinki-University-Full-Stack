const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

// Creating a POST request to save a user
userRouter.post('/', async (request, response)  => {
  const { name, username, password } = request.body

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
  const users = await User.find({})
  response.json(users)
})

module.exports = userRouter
