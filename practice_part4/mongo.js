const mongoose = require('mongoose')

if (process.argv.env < 3) {
  console.log('give password as an argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://laurisoome1996:${password}@cluster0.0ck4zk2.mongodb.net/testNoteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url).then(() => {
  const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
  })

  const Note = mongoose.model('Note', noteSchema)

  /*
  const note = new Note({
    content: 'Second note',
    important: false,
  })

  note.save().then(() => {
    console.log('note saved!')
    mongoose.connection.close()
  })
  */

  Note.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })
})
