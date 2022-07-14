import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ allCountries, setFilteredCountries }) => {

  const filterChangeHandler = (event) => {
    const filterString = event.target.value
    setFilteredCountries(
      allCountries.filter(country => country.name.common.toLowerCase().includes(filterString.toLowerCase()))
    )
  }

  return (
    <div>
      find countries
      <input onChange={filterChangeHandler}></input>
    </div>
  )
}

const SingleCountryView = ({ country, filteredCountries, setFilteredCountries }) => {
  const toggleShowHandler = () => {
    let filteredCountriesCopy = structuredClone(filteredCountries)
    // find the country within filteredCountries
    filteredCountriesCopy.find(foundCountry => country.flag === foundCountry.flag).isShown = !country.isShown
    setFilteredCountries(filteredCountriesCopy)
  }

  if (country.isShown) {
    return (
      <div>
        <h2>{country.name.common}</h2>
        <button onClick={toggleShowHandler}>hide</button>
        <div>capital {country.capital}</div>
        <div>area {country.area}</div>
        <h3>languages:</h3>
        <ul>
          {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
        </ul>
        <img alt='flag' src={country.flags.png} />
      </div>
    )
  } else {
    return (
      <div>
        {country.name.common}
        <button onClick={toggleShowHandler}>show</button>
      </div>)
  }
}

const MultiCountryView = ({ filteredCountries, setFilteredCountries }) => {
  if (filteredCountries.length > 10) {
    return (<div>Too many matches, specify another filter</div>)
  } else if (filteredCountries.length === 1) {
    let onlyCountry = structuredClone(filteredCountries[0])
    onlyCountry.isShown = true;
    return (<SingleCountryView country={onlyCountry} filteredCountries={filteredCountries} setFilteredCountries={setFilteredCountries} />)
  } else {
    return (filteredCountries.map(c =>
      <div key={c.flag}>
        <SingleCountryView country={c} filteredCountries={filteredCountries} setFilteredCountries={setFilteredCountries} />
      </div>))
  }
}

const App = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([])

  const hook = () => {
    console.log('effect for initial populating of countries')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled for initial populating of countries')
        // Add isShown attribute to every country
        const countriesWithShown = response.data.map(country => ({ ...country, isShown: false }))
        setAllCountries(countriesWithShown)
      })
  }
  useEffect(hook, [])

  return (
    <div>
      <Filter allCountries={allCountries} setFilteredCountries={setFilteredCountries} />
      <MultiCountryView filteredCountries={filteredCountries} setFilteredCountries={setFilteredCountries} />
    </div>
  )
}

export default App