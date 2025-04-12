const express = require('express')
const app = express()
app.use(express.json())

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

  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/notes', (request, response) => {
    response.json(notes)
  })

  // fetch a single resourc
  app.get('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    const note = notes.find(note => note.id === id)

    if (note) {
      res.json(note)
    } else {
      res.status(404).end()
    }
  })

  // delete a rensource
  app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    notes = notes.filter(note => note.id !== id)
    res.status(204).end()
  })

  // Generate an id for the note
  const generateId = () => {
    const maxId = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0

    return String(maxId + 1)
  }

  // create a resource using POST
  app.post('/api/notes', (req, res) => {
    
    if (!body.content) {
      return res.status(400).json({
        error: "Content missing"
      })
    }

    const note = {
      content: body.content,
      important: body.important || false,
      id: generateId()
    }

    notes = notes.concat(note)

    res.json(note)
  })
  
const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
console.log(`Go to the page: http://localhost:${PORT}`)
