const express = require('express')
const app = express()

const persons = [
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



const PORT = 3000
app.listen(PORT)
console.log(`To see the app, go to http://localhost:${PORT}`)
console.log(phonebook_length)
