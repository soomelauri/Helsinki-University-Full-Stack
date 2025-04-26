const logger = require('./logger.js')

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'ValidationError' && error.message.includes('User validation failed: username:')) {
    return response.status(401).json({ error: 'username `username` must be at least 3 characters' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(401).json({ error: 'expected `username` to be unique' })
  }
  next(error)
}

module.exports = {
  errorHandler
}
