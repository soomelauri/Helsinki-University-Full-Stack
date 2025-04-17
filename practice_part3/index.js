require('dotenv').config()
const express = require('express')
const app = express()

const Note = require('./models/note')

app.use(express.static('dist'))

let notes = [
    {
      id: "1",
      content: "HTML is easy",
      important: true
    },
    {
      id: "2",
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: "3",
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
]

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:', request.path)
  console.log('Body:', request.body)
  console.log('---')
  next()
}


// use () to return middleware
app.use(express.json())
// no need for () due to the function already being directly usable
app.use(requestLogger)


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

// app.get('/api/notes', (request, response) => {
//   response.json(notes)
// })

// fetch a single resourc
app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id;
  const note = notes.find(note => note.id === id)

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

// delete a rensource
app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id;
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})

// Generate an id for the note
const generateId = () => {
  const maxId = notes.length > 0
  ? Math.max(...notes.map(n => Number(n.id)))
  : 0

  return String(maxId + 1)
}

// MongoDB Code

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({error: 'content missing'})
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save()
    .then(savedNote => {
      response.json(savedNote)
    })
})

app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id)
    .then(note => {
      response.json(note)
    })
})

app.get('/api/notes', (request, response) => {
  Note.find({})
    .then(notes => {
      response.json(notes)
    })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'endpoint not found'})
}

// no need for () due to the function already being directly usable
app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})
