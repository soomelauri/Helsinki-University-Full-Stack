const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper.js')

const Note = require('../models/note')

beforeEach(async () => {
  // for this beforeEach function, let's use a for-loop to iterate over the array
  // and then
  await Note.deleteMany({})
  await Note.insertMany(helper.initialNotes)
})

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all notes are returned', async () => {
  const notes = await helper.notesInDb()
  assert.strictEqual(notes.length, helper.initialNotes.length)
})

test('a specific note is within the returned notes', async () => {
  const notes = await helper.notesInDb()

  const contents = notes.map(r => r.content)
  assert(contents.includes('HTML is easy'))
})

test('a valid note can be added', async () => {
  const newNote = {
    content: 'new one',
    important: true
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const notesAtEnd = await helper.notesInDb()
  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)

  const contents = notesAtEnd.map(r => r.content)
  assert(contents.includes('new one'))
})

test('a note missing the content cannnot be added', async () => {
  // create a new note with missing content
  const newNote = {
    important: true
  }
  // send the new note using await api.post
  await api
    .post('/api/notes')
    .send(newNote)
    .expect(400)

  // store the response from the GET request
  const notesAtEnd = await helper.notesInDb()

  // check that we haven't added the note
  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length)
})

// let's write a test for fetching an individual note
test('a specific not can be viewed', async () => {
  const notesAtStart = await helper.notesInDb()
  const noteToView = notesAtStart[0]

  const resultNote = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  assert.deepStrictEqual(resultNote.body, noteToView)
})

// let's write a test for deleting an individual note
test('a note can be deleted', async () => {
  // Get all notes, then store first as the one to be deleted
  const notesAtStart = await helper.notesInDb()
  const noteToDelete = notesAtStart[0]

  // use the delete api to delete the note
  await api
    .delete(`/api/notes/${noteToDelete.id}`)
    .expect(204)

  // let's check that the note was deleted
  const notesAtEnd = await helper.notesInDb()
  const contents = notesAtEnd.map(r => r.content)

  // make sure the contents at the end don't include the deleted note content
  assert(!contents.includes(noteToDelete.content))

  // compare the lengths of the objects
  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1)
})

after(async () => {
  await mongoose.connection.close()
})
