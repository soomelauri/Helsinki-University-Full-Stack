const morgan = require('morgan')
const express = require('express')
const app = express()

app.use(express.static('dist'))

// morgan token method for the request body
morgan.token('body', 
  function(request) { 
    return JSON.stringify(request.body) 
  })

// set json parsing as the first middleware
app.use(express.json())

// set morgan as the second middleware
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const phonebook_length = persons.length

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

// get specific person from the phonebook
app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.find(person => person.id === id)
  res.json(person)
})

// info page
// calculate the length of phonebook - then output that in the info
app.get('/info', (req, res) => {
  res.send(`Phonebook has info for ${phonebook_length} people`)

})

// generate a random id using a large enough range to avoid duplicate ids
const generateId = () => {
  return String(Math.floor(Math.random() * 100))
}
// post request for adding a new person entry to the phonebook
app.post('/api/persons', (req, res) => {
  
  const body = req.body;

  if(!body.name || !body.number) {
    return res.status(400).json({error: 'Missing name or number'})
  }

  const duplicate = persons.find(person => person.name === body.name)

  if (duplicate) {
    return res.status(400).json({
      error: `This name already exists in the phonebook ${body.name}`
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)
  res.json(person)

})

// Delete one entry using the id param
app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})
