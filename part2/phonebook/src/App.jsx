import { useEffect, useState } from 'react'
import PersonForm from './Form.jsx'
import Filter from './Filter.jsx'
import Persons from './Persons.jsx'

import personService from './services/persons.js'


const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='success'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchField, setSearchField] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect (() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
    }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const duplicate = persons.find(person => person.name === newPerson)

    if (duplicate) {
      if (window.confirm(`${newPerson} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = {...duplicate, number: newNumber}

        personService
          .update(duplicate.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => 
              person.id !== duplicate.id ? person : returnedPerson
            ))
            setNewPerson('')
            setNewNumber('')
            setSuccessMessage(
              `${newPerson}'s number has been successfully updated.`
            )
            setTimeout(() => {
              setSuccessMessage(null)
            }, 3000)
            setNotes(notes.filter(n => n.id !== id))
          })
        }
      } else {
        console.log('Button was pressed', event.target)
        const personObject = {
          name: newPerson,
          number: newNumber
        }
    
        personService
          .create(personObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewPerson('')
            setNewNumber('')
            setSuccessMessage(
              `${newPerson}'s number has been successfully added.`
            )
            setTimeout(() => {
              setSuccessMessage(null)
            }, 3000)
            setNotes(notes.filter(n => n.id !== id))
          })
      }
    }

  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(setPersons(persons.filter(person => person.id !== id)))
    }
  }


  const personToShow = 
    searchField === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(searchField.toLowerCase()))

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewPerson(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchFieldChange = (event) => {
    console.log(event.target.value)
    setSearchField(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage}/>
      <Filter 
      searchField={searchField} 
      handleSearchFieldChange={handleSearchFieldChange} 
      />
      <h3>Add a new</h3>
      <PersonForm 
        addPerson={addPerson}
        newPerson={newPerson}
        handlePersonChange={handlePersonChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons personToShow={personToShow} removePerson={removePerson}/>
    </div>
  )
}

export default App
