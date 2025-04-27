const asyncHandler = require('express-async-handler')
const blogRouter = require('express').Router()
const Blog = require('../models/blog.js')

// Create API Routes
// GET Route
blogRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 })
  response.json(blogs)
})

// POST Route
blogRouter.post('/', asyncHandler(async (request, response) => {
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
blogRouter.delete('/:id', asyncHandler(async (request, response) => {

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
    likes: body.likes
  }

  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  return response.status(204).end()
})

module.exports = blogRouter
