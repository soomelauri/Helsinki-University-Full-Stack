require('dotenv').config()
const Person = require('./models/person')
const morgan = require('morgan')
const express = require('express')
const app = express()

app.use(express.static('dist'))

// define new error-handling middleware
// add new error-handling for ValidationError
const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    response.status(400).json({ error: 'malformatted id'})
  } else if (error.name === 'ValidationError') {
    response.status(400).json({ error: error.message})
  }

  next(error)
}

// morgan token method for the request body
morgan.token('body', 
  function(request) { 
    return JSON.stringify(request.body) 
  })

// set json parsing as the first middleware
app.use(express.json())

// set morgan as the second middleware
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// Start simple -> Get all the details for all people in the phonebook database
// For this, we need to set up a connection to MongoDB
// Definet the person constructor using schema
// Use the Person constructor and app.get

// new mongodb GET request
app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then(people => {
      res.json(people)
    })
    .catch(error => next(error))
})


// new mongodb POST request
// add validation to this POST request using mongoose
app.post('/api/persons', (req, res, next) => {
  const body = req.body

  const person = new Person ({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then(savedPerson => {
      res.json(savedPerson)
    })

  .catch(error => next(error))
})


// new mongodb GET request for a specific person
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
})


// new GET request for a mongoDB info page 
app.get('/info', (req, res, next) => {
  // store current time
  const timeNow = new Date()

  Person.countDocuments({})
    .then(count => {
      res.send(`Phonebook has info for ${count} people <br> ${timeNow.toString()}`)
    })
    .catch(error => next(error))
})

// new MongoDB PUT request
app.put('/api/persons/:id', (req, res, next) => {
  // first we need to deconstruct the name and number from the request body
  const { name, number } = req.body

  // Take the Person constructor function and iterate through it using .findbyID
  Person.findById(req.params.id)
    .then(person => {
      // If person doesn't exist, return 404 status code
      if (!person) {
        return res.status(404).end()
      }
      // If person exists, take the deconstructed name and number and store them into the person object
      person.name = name
      person.number = number


      // Save the person to the db
      person.save()
        .then((updatedPerson) => {
          return res.json(updatedPerson)
        })
    })
    // Send error to middleware
    .catch(error => next(error))
})

// new MongoDB delete request
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})
