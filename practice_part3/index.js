const express = require('express')
const app = express()

const http = require('http')

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

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

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

// create a resource using POST
app.post('/api/notes', (request, response) => {
  
  if (!body.content) {
    return response.status(400).json({
      error: "Content missing"
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId()
  }

  notes = notes.concat(note)

  response.json(note)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'endpoint not found'})
}

// no need for () due to the function already being directly usable
app.use(unknownEndpoint)
  
const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
console.log(`Go to the page: http://localhost:${PORT}`)
