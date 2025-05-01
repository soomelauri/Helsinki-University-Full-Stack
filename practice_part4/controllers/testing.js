// add some backend code for the testing
// first we create the router using express.Router()
const testingRouter = require('express').Router()
// get the Note and the User from models
const Note = require('../models/note')
const User = require('../models/user')

// this router sends a post request to the /reset route, and that resets the User.deleteMany({}) and Note.deleteMany({})
testingRouter.post('/reset', async(request, response) => {
  await Note.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = testingRouter
