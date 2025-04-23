const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config.js')
const logger = require('./utils/logger.js')
const errorHandler = require('./utils/middleware.js').errorHandler


const blogRouter = require('./controllers/blogs.js')

// create express app
const app = express()

// state that we are connecting to DB
logger.info('Connecting to DB', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Successfully connected to MongoDB')
  })
  .catch(error => {
    logger.error('Error', error.message)
  })

// Use Middleware
app.use(express.json())

// use router
app.use('/api/blogs', blogRouter)

// use Middleware
app.use(errorHandler)

module.exports = app
