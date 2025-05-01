const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config.js')
const logger = require('./utils/logger')
const notesRouter = require('./controllers/notes.js')
const usersRouter = require('./controllers/users.js')
const loginRouter = require('./controllers/login.js')
const middleware = require('./utils/middleware.js')

// initialize the app
const app = express()

// log the mongodb connection
logger.info('trying to connect to', config.MONGODB_URI)

// connect to DB and log the stuff
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('successfully connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connecting to MongoDB', error.message)
  })

app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

// add the testing router to only run if NODE_ENV === 'test'
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing.js')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
