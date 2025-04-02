const Person = ({ person, removePerson }) => {
  console.log(person.name, person.number)
  return (
      <li>{person.name} {person.number}
      <button onClick={() => removePerson(person.id, person.name)}>
        delete
      </button>
      </li>
  )
}

export default Person;
