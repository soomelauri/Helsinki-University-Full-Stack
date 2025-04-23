const mongoose = require('mongoose')
const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')

const app = require('../app.js')
const supertest = require('supertest')
const api = supertest(app)

const helper = require('../utils/test_helper.js')
const Blog = require('../models/blog.js')

// use beforeEach to first clear out the test db, then store the initialBlogs found in the helper file to the db
beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

// First GET request using async/await to return all blogs in the db in Json format
test('all blog posts returned in JSON', async() => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

// Second GET request using async/await to make sure the same number of posts are retrieved
test('the correct number of blog posts returned', async() => {
  const notes = await helper.blogsInDb()
  assert.strictEqual(notes.length, helper.initialBlogs.length)
})

// Third GET request to make sure the identifier property is named 'id'
test('identifier property name check', async() => {
  const blogs = await helper.blogsInDb()
  assert.ok(blogs[0], 'id')
})

// First POST request
test('success creating a blog post', async () => {
  const newBlog = {
    _id: '5a422aa71b54a676234d17f9',
    title: 'Tennis Game',
    author: 'Andy Roddick',
    url: 'https://tennisgame.com',
    likes: 39,
    __v: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  // get the blogs after POST
  const blogsAtEnd = await helper.blogsInDb()

  // get contents of all blogs
  const titles = blogsAtEnd.map(b => b.title)

  // make sure the length of the db increased by 1
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  // make sure the contents have our blog
  assert(titles.includes('Tennis Game'))
})

// Second POST request making sure no like property turns to 0 likes.
test('no likes post sets likes to 0', async () => {
  const newBlog = {
    _id: '5a422aa71b54a676234d17f9',
    title: 'Golf Dreams',
    author: 'Tiger Woods',
    url: 'https://golfdreams.com',
    __v: 0,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blog = await Blog.findById(newBlog._id)

  assert.strictEqual(blog.likes, 0)
})

// Third POST request, making sure no title POST request is rejected
test('posts with missing title', async() => {
  const newBlog = {
    _id: '5a422aa71b54a676234d17f9',
    author: 'Tiger Woods',
    url: 'https://golfdreams.com',
    likes: 39,
    __v: 0,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  // get the current DB
  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

// Fourth POST request, making sure no url POST request is rejected
test('post with missing url', async () => {
  const newBlog = {
    _id: '5a422aa71b54a676234d17f9',
    title: 'Golf Dreams',
    author: 'Tiger Woods',
    likes: 39,
    __v: 0,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  // check the db
  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})


after(async () => {
  await mongoose.connection.close()
})
