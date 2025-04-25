const asyncHandler = require('express-async-handler')
const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

notesRouter.get('/', asyncHandler(async (request, response) => {
  const notes = await Note.find({}).populate('user', { name: 1, username: 1 })
  response.json(notes)
}))

notesRouter.get('/:id', asyncHandler(async (request, response) => {
  const note = await Note.findById(request.params.id)

  // if note exists, return it, otherwise give an error
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
}))

// Make sure the token is sent with the notes post request
const getTokenFrom = request => {
  const authorization = request.get('authorization')

  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

notesRouter.post('/', asyncHandler(async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'invalid token' })
  }

  const user = await User.findById(decodedToken.id)

  const note = new Note({
    content: body.content,
    important: body.important === 'undefined' ? false : body.important,
    user: user.id
  })
  const savedNote = await note.save()

  user.notes = user.notes.concat(savedNote._id)
  await user.save()

  response.status(201).json(savedNote)
}))

notesRouter.delete('/:id', asyncHandler(async (request, response) => {
  await Note.findByIdAndDelete(request.params.id)
  response.status(204).end()
}))

notesRouter.put('/:id', async (request, response) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important
  }

  const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, { new: true })
  response.json(updatedNote)
})

module.exports = notesRouter
