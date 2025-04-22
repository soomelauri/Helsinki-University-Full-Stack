const Note = require('../models/note.js')

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true
  }
]

const nonExistingId = async () => {
  // Create a note using the Note contstructor
  const note = new Note({ content: 'willberemovedsoon' })
  // save the note using await
  await note.save()
  // delete the note using await
  await note.deleteOne()

  // try to get the deleted note's id
  return note._id.toString()
}

const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map(note => note.toJSON())
}

module.exports = {
  initialNotes,
  nonExistingId,
  notesInDb
}
