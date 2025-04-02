import { useState } from 'react'
import Person from './Person.jsx'
import PersonForm from './Form.jsx'
import Filter from './Filter.jsx'
import Persons from './Persons.jsx'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchField, setSearchField] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    const duplicate = persons.some(person => person.name === newPerson)

    if (duplicate) {
      alert(`${newPerson} already exists in the phonebook.`)
      return
    }
    console.log('Button was pressed', event.target)
    const personObject = {
      name: newPerson,
      number: newNumber,
      id: String(persons.length + 1)
    }
    setPersons(persons.concat(personObject))
    setNewPerson('')
    setNewNumber('')
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
      <Persons personToShow={personToShow}/>
    </div>
  )
}

export default App
