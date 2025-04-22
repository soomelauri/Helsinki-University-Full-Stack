const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config.js')

const logger = require('./utils/logger.js')

const blogRouter = require('./controllers/blogs.js')

// create express app
const app = express()

// store the mongoDBURL
const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

// Use Middleware
app.use(express.json())

app.use('/api/blogs', blogRouter)

// Define PORT and set the app to listen to that port
app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
