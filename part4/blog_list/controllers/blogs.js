const asyncHandler = require('express-async-handler')
const blogRouter = require('express').Router()
const Blog = require('../models/blog.js')

// Create API Routes
// GET Route
blogRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({})
  response.json(blogs)
})

// POST Route
blogRouter.post('/', asyncHandler(async (request, response) => {
  const body = request.body
  const blog = new Blog({
    _id: body._id,
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    __v: 0
  })

  const savedBlog = await blog.save()
  return response.status(201).json(savedBlog)
}))

module.exports = blogRouter
