import Person from './Person.jsx'

const Persons = ({ personToShow, removePerson }) => {
    return (
        <ul>
            {personToShow.map(person =>
                <Person 
                key={person.id} 
                person={person} 
                removePerson={removePerson} 
                />
            )}
        </ul>
    )
}

export default Persons
