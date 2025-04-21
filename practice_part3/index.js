require('dotenv').config()
const express = require('express')
const app = express()

const Note = require('./models/note')

app.use(express.static('dist'))


// use () to return middleware
app.use(express.json())

// creating our Express Error-Handler
const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id'})
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message})
  }

  next(error)
}

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

// no need for () due to the function already being directly usable
app.use(requestLogger)


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})


// New way to delete a resource, using MongoDB
app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// New way to update a resource using MongoDB
app.put('/api/notes/:id', (request, response, next) => {
  const { content, important } = request.body

  Note.findById(request.params.id)
    .then(note => {
      if (!note) {
        return response.status(404).end()
      }

      note.content = content
      note.important = important

      return note.save()
        .then((updatedNote) => {
          response.json(updatedNote)
        })
    })
    .catch(error => next(error))
})

// MongoDB Code

app.post('/api/notes', (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save()
    .then(savedNote => {
      response.json(savedNote)
    })
  .catch(error => next(error))
})

// GET specific note by ID using MongoDB
app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.get('/api/notes', (request, response) => {
  Note.find({})
    .then(notes => {
      response.json(notes)
    })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'endpoint not found' })
}

// no need for () due to the function already being directly usable
app.use(unknownEndpoint)

// Error-Handling Middleware has to be the last one in order, and all routes must be defined before defining this piece of middleware
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})
