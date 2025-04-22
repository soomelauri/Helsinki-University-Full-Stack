const app = require('../app.js')
const mongoose = require('mongoose')
const supertest = require('supertest')
const { test, after, beforeEach } = require('node:test')
const assert  = require('node:assert')
const Note = require('../models/note.js')

const api = supertest(app)

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false,
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true,
  },
]

beforeEach(async () => {
  // Clear out DB
  await Note.deleteMany({})
  // Create a new note
  let noteObject = new Note(initialNotes[0])
  // Save the newly created note
  await noteObject.save()
  // Create the second note
  noteObject = new Note(initialNotes[1])
  // Save the second note
  await noteObject.save()
})


test.only('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
after(async() => {
  await mongoose.connection.close()
})

test.only('all notes are returned', async () => {
  // in order to check whether all notes are returned, let's make sure that
  // the length of the api response is the same as the length  of the initialnotes
  const response = await api.get('/api/notes')
  assert.strictEqual(response.body.length, initialNotes.length)
})

test('a specific note within returned notes', async () => {
  const response = await api.get('/api/notes')

  const contents = response.body.map(e => e.content)

  assert.strictEqual(contents.includes('HTML is easy'), true)
})
