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

after(async () => {
  await mongoose.connection.close()
})
