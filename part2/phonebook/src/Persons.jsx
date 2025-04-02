import Person from './Person.jsx'

const Persons = ({ personToShow }) => {
    return (
        <ul>
            {personToShow.map(person =>
                <Person key={person.id} person={person} />
            )}
        </ul>
    )
}

export default Persons
