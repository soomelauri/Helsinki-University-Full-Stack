const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')

const app = require('../app.js')
const supertest = require('supertest')
const api = supertest(app)

const helper = require('../utils/test_helper.js')
const Blog = require('../models/blog.js')
const User = require('../models/user.js')

describe('when there is initially one user in the DB', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('secret', 10)

    const user = new User({ username: 'test_user', passwordHash })
    await user.save()
  })
  test('saving a valid user to the DB', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'laurisoome',
      username: 'ls1996',
      password: 'strongpassword'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    const users = usersAtEnd.map(user => user.username)

    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    assert(users.includes('ls1996'))
  })

  test('duplicate user is not saved to the DB', async() => {
    const usersAtStart = await helper.usersInDb()

    const duplicateUser = {
      name: 'Invalid User',
      username: 'test_user',
      password: 'strongpassword'
    }

    await api
      .post('/api/users')
      .send(duplicateUser)
      .expect(401)

    const usersAtEnd = await helper.usersInDb()

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('user with too short username not saved to DB', async() => {
    const usersAtStart = await helper.usersInDb()

    const invalidUser = {
      name: 'Invalid User',
      username: 'iu',
      password: 'strongpassword'
    }

    await api
      .post('/api/users')
      .send(invalidUser)
      .expect(401)

    const usersAtEnd = await helper.usersInDb()

    const users = usersAtEnd.map(user => user.username)

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)

    assert(!users.includes('iu'))
  })
})

after(async () => {
  await mongoose.connection.close()
})
