import { useState } from 'react'

const Person = ({ person }) => {
  console.log(person)
  return (
    <ul>{person}</ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newPerson, setNewPerson] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    if (newPerson === persons.name) {
      alert(`Error, ${newPerson.name} already exists in contacts.`)
    }

    const duplicate = persons.some(person => person.name === newPerson)

    if (duplicate) {
      alert(`${newPerson} already exists in the phonebook.`)
      return
    }
    console.log('Button was pressed', event.target)
    const personObject = {
      name: newPerson,
      id: String(persons.length + 1)
    }
    setPersons(persons.concat(personObject))
    setNewPerson('')
  }

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewPerson(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newPerson} onChange={handlePersonChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
          {persons.map(person => 
            <Person key={person.id} person={person.name} />
          )}
        </ul>
    </div>
  )
}

export default App
