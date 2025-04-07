import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ searchField, handleSearchFieldChange}) => {
    return (
        <div>
            <input value={searchField} onChange={handleSearchFieldChange} />
        </div>
    )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchField, setSearchField] = useState('')

  useEffect(() => {
    // use axios to pull all countries data
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => setCountries(response.data))
  }, [])

// filter based on search query result 
// 1. create a filteredCountries variable
// 2. Iterate through the list of countries using .filter
// 3. for each country, turn to lowercase, then use .include and turn the value to lowercase
const filteredCountries = countries.filter(country => 
    country.name.common.toLowerCase().includes(searchField.toLowerCase()))

const showCountries = () => {
    // Should this be used with conditional rendering? Like if search returns more than 10 countries, return message, 
    // if less than ten but more than 1, return the list, if 1 return the data
    if (filteredCountries.length >= 10) {
        return <p>Too many matches, specify another filter</p>
    } else if (filteredCountries.length > 1){
        return filteredCountries.map(country => <p key={country.cca2}>{country.name.common}</p>)
    } else if (filteredCountries.length === 1){
        const country = filteredCountries[0]
        return (
            <div>
                <h1>{country.name.common}</h1>
                <p>Capital {country.capital}</p>
                <p>Area {country.area}</p>
                <h2>Languages</h2>
                <ul>
                    {country.languages && Object.entries(country.languages).map(([code, language]) => (
                        <li key={code}>{language}</li>
                    ))}
                </ul>
                <img src={country.flags.png} alt= "The flag of Finland has a white field with a large blue cross that extend to the edges of the field. The vertical part of this cross is offset towards the hoist side." />
            </div>
        )
    } else {
        return <p>No matching countries.</p>
    }
}

const handleSearchFieldChange = (event) => {
    console.log(event.target.value)
    setSearchField(event.target.value)
}


    return (
        <div>
            <Filter searchField={searchField} handleSearchFieldChange={handleSearchFieldChange}/>
            {showCountries()}
        </div>
    )

}

export default App
