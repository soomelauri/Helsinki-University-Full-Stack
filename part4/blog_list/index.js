const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

// create express app
const app = express()

// create blogschema for mongoose without validation
const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

// initialize the Blog constructor function
const Blog = mongoose.model('Blog', blogSchema)

// store the mongoDBURL
const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)

// Use Middleware
app.use(express.json())

// Create API Routes
// GET Route
app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

// POST Route
app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

// Define PORT and set the app to listen to that port
const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
