const testingRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// send a post request to the route with the reset using the request
testingRouter.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = testingRouter
