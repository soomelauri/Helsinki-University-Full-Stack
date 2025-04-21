const logger = require('./logger.js')

// no need for () due to the function already being directly usable
const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:', request.path)
  logger.info('Body:', request.body)
  logger.info('---')
  next()
}

// Handling undefined endpoints
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'endpoint not found' })
}

// Error-Handling Middleware has to be the last one in order, and all routes must be defined before defining this piece of middleware
const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}
