const asyncHandler = require('express-async-handler')
const blogRouter = require('express').Router()
const Blog = require('../models/blog.js')
const userExtractor = require('../utils/middleware.js').userExtractor

// Create API Routes
// GET Route
blogRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 })
  response.json(blogs)
})

// POST Route
blogRouter.post('/', userExtractor, asyncHandler(async (request, response) => {
  const body = request.body

  const user = request.user

  const blog = new Blog({
    _id: body._id,
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    __v: 0,
    user: user._id
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  return response.status(201).json(savedBlog)
}))

// DELETE ROUTE
blogRouter.delete('/:id', userExtractor, asyncHandler(async (request, response) => {

  const user = request.user

  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() !== user._id.toString()) {
    return response.status(401).json({ error: 'unauthorized user' })
  }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
}))

// PUT ROUTE
blogRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user.id
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user', { name: 1, username: 1 })
  return response.status(200).json(updatedBlog)
})

module.exports = blogRouter
