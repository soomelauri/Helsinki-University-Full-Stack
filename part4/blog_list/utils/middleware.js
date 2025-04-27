const logger = require('./logger.js')
const jwt = require('jsonwebtoken')
const User = require('../models/user.js')
const asyncHandler = require('express-async-handler')

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'ValidationError' && error.message.includes('User validation failed: username:')) {
    return response.status(401).json({ error: 'username `username` must be at least 3 characters' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(401).json({ error: 'expected `username` to be unique' })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  }
  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')

  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  } else {
    request.token = null
  }

  next()
}

const userExtractor = asyncHandler( async (request, response, next) => {
  if (!request.token) {
    return response.status(401).json({ error: 'missing token' })
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'invalid token' })
  }

  const user = await User.findById(decodedToken.id)

  request.user = user

  next()
})

module.exports = {
  errorHandler,
  tokenExtractor,
  userExtractor
}
