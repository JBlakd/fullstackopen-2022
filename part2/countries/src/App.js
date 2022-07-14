import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ allCountries, setFilteredCountries }) => {

  const filterChangeHandler = (event) => {
    const filterString = event.target.value
    setFilteredCountries(
      allCountries
        .filter(
          country => country.name.common.toLowerCase()
            .includes(filterString.toLowerCase())
        )
    )
  }

  return (
    <div>
      find countries
      <input onChange={filterChangeHandler}></input>
    </div>
  )
}

const SingleCountryView = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <img alt='flag' src={country.flags.png} />
    </div>
  )
}

const MultiCountryView = ({ filteredCountries }) => {
  if (filteredCountries.length > 10) {
    return (<div>Too many matches, specify another filter</div>)
  } else if (filteredCountries.length == 1) {
    return (<SingleCountryView country={filteredCountries[0]} />)
  } else {
    return (filteredCountries.map(c => <div key={c.flag}>{c.name.common}</div>))
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
        setAllCountries(response.data)
      })
    console.log(allCountries)
  }
  useEffect(hook, [])

  return (
    <div>
      <Filter allCountries={allCountries} setFilteredCountries={setFilteredCountries} />
      <MultiCountryView filteredCountries={filteredCountries} />
    </div>
  )
}

export default App