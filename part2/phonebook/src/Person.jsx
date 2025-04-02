const Person = ({ person }) => {
  console.log(person.name, person.number)
  return (
      <li>{person.name} {person.number}</li> 
  )
}

export default Person;
