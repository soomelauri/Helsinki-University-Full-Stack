import { useState } from 'react'

const Person = ({ person }) => {
  console.log(person.name, person.number)
  return (
      <li>{person.name} {person.number}</li> 
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '0401234567',
      id: '1'
     }
  ]) 
  
  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewPerson(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
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
          {persons.map(person => 
            <Person key={person.id} person={person} />
          )}
      </ul>
    </div>
  )
}

export default App
