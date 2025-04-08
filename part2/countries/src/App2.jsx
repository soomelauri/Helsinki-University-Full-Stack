import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryDetails = ({ country }) => {
    const [weather, setWeather] = useState()
    const api_key = import.meta.env.VITE_WEATHER_API_KEY

    useEffect(() => {
        const capital = country.capital[0]

        axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
        .then(response => {
            setWeather(response.data)
        })
        .catch(err => {
            console.log('Error with weather fetch:', err)
        })
    }, [country.capital, api_key])
    
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>
            <h2>Languages:</h2>
            <ul>
                {country.languages && Object.entries(country.languages).map(([code, language]) => (
                    <li key={code}>{language}</li>
                ))}
            </ul>
            <img src={country.flags.png}/>

            {/* Add Weather stuff here */}
            {weather && weather.current && (
                <div>
                    <h2>Weather in {country.capital}</h2>
                    <p>Temperature: {weather.current.temperature} °C</p>
                    <img src={weather.current.weather_icons[0]} />
                    <p>Wind: {weather.current.wind_speed} m/s</p>
                </div>
            )}
        </div>
    )
}

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
  const [selectedCountries, setSelectedCountries] = useState({})

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

const toggleCountryDetails = (countryCode) => {
    setSelectedCountries(prevSelected => ({
        ...prevSelected, [countryCode]: !prevSelected[countryCode]
    }))
}

const showCountries = () => {
    // Should this be used with conditional rendering? Like if search returns more than 10 countries, return message, 
    // if less than ten but more than 1, return the list, if 1 return the data
    if (filteredCountries.length >= 10) {
        return <p>Too many matches, specify another filter</p>
    } else if (filteredCountries.length > 1){
        return filteredCountries.map(country => (
            <div key={country.cca2}>
                {country.name.common}
                <button onClick={() => toggleCountryDetails(country.cca2)}>
                    show
                </button>
                {selectedCountries[country.cca2] && <CountryDetails country={country } />}
            </div>
        ))
    } else if (filteredCountries.length === 1){
        return (
            <CountryDetails country={filteredCountries[0]}/>
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
