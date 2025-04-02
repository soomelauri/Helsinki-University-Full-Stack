import { useState } from 'react'

const Person = ({ person }) => {
  console.log(person.name, person.number)
  return (
      <li>{person.name} {person.number}</li> 
  )
}

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
      <div>
        <input value={searchField} onChange={handleSearchFieldChange} />
      </div>
      <form onSubmit={addPerson}>
        <h2>add new</h2>
        <div>
          name: <input value={newPerson} onChange={handlePersonChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
          {personToShow.map(person => 
            <Person key={person.id} person={person} />
          )}
      </ul>
    </div>
  )
}

export default App
