const blogRouter = require('express').Router()
const Blog = require('../models/blog.js')

// Create API Routes
// GET Route
blogRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

// POST Route
blogRouter.post('/', (request, response) => {
  const body = request.body
  const blog = new Blog({
    _id: body._id,
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    __v: 0
  })

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

module.exports = blogRouter
