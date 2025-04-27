const mongoose = require('mongoose')
const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const app = require('../app.js')
const supertest = require('supertest')
const api = supertest(app)

const helper = require('../utils/test_helper.js')
const Blog = require('../models/blog.js')
const User = require('../models/user.js')

// Define the token and deleteLaterBlog globally
let token

// use beforeEach to first clear out the test db, then store the initialBlogs found in the helper file to the db
beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('test_password', 10)
  const user = new User({
    username: 'test_user',
    name: 'Test User',
    passwordHash
  })
  const savedUser = await user.save()
  token = jwt.sign({
    username: user.username,
    id: user._id.toString()
  },
  process.env.SECRET)
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
    .set('Authorization', `Bearer ${token}`)
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
    .set('Authorization', `Bearer ${token}`)
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
    .set('Authorization', `Bearer ${token}`)
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
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)

  // check the db
  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

// Final POST request, making sure that no token provided request is rejected with a 401 status code
test('post with no token fails with 401 unauthorized', async() => {
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
    .expect(401)


  // get the blogs after POST
  const blogsAtEnd = await helper.blogsInDb()

  // get contents of all blogs
  const titles = blogsAtEnd.map(b => b.title)

  // make sure the length of the db increased by 1
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

  // make sure the contents have our blog
  assert(!titles.includes('Tennis Game'))
})

// DELETE test, first creating the blog to be deleted:
test('deleting a resource (new)', async() => {
  const blogsAtStart = await helper.blogsInDb()
  // first we need to create the resource
  const newBlog = {
    _id: '9a422aa71b54a676234d17f9',
    title: 'Deleted Blog',
    author: 'Deleter',
    url: 'https://deletethis.com',
    likes: 31,
    __v: 0
  }
  const response = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const savedBlogId = response.body.id

  await api
    .delete(`/api/blogs/${savedBlogId}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  const titles = blogsAtEnd.map(r => r.title)

  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)

  assert(!titles.includes('Deleted Blog'))
})

// First PUT request, making sure we can update the likes of a blog
test('updating a resource', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const blogData = {
    likes: 666,
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogData)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  const updatedBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)


  assert.strictEqual(updatedBlog.likes, 666)
})


after(async () => {
  await mongoose.connection.close()
})
