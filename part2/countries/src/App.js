import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ allCountries, filteredCountries, setFilteredCountries }) => {

  const filterChangeHandler = (event) => {
    const filterString = event.target.value

    const filteredCountriesCopy = allCountries.filter(country => country.name.common.toLowerCase().includes(filterString.toLowerCase()))
    if (filteredCountries.length === 1 && filteredCountriesCopy.length === 1) {
      console.log("no need to re-render singular country")
      return
    }

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

  console.log("filteredCountries.length", filteredCountries.length)
  country.isShown = (filteredCountries.length === 1)

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
        <Weather country={country} filteredCountries={filteredCountries} setFilteredCountries={setFilteredCountries} />
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

const Weather = ({ country, filteredCountries, setFilteredCountries }) => {
  const api_key = process.env.REACT_APP_API_KEY
  const get_req = `https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${api_key}`

  const foundCountry = filteredCountries.find(c => country.flag === c.flag)

  const hook = () => {
    console.log(`effect for getting ${country.name.common} capital weather data with url: ${get_req}`)
    axios
      .get(get_req)
      .then(response => {
        console.log('promise fulfilled for getting country capital weather data')
        // Add weather attribute to this country
        let filteredCountriesCopy = structuredClone(filteredCountries)
        filteredCountriesCopy.find(c => country.flag === c.flag).openWeather = response.data
        setFilteredCountries(filteredCountriesCopy)
      })
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(hook, [])


  if (foundCountry.hasOwnProperty('openWeather')) {
    return (
      <div>
        <h3>Weather in {foundCountry.capital[0]}</h3>
        <div>temperature {foundCountry.openWeather.main.temp - 273.15} Celsius</div>
        <img alt="weather icon" src={`http://openweathermap.org/img/wn/${foundCountry.openWeather.weather[0].icon}.png`}></img>
        <div>wind {foundCountry.openWeather.wind.speed} m/s</div>
      </div>
    )
  } else {
    return (
      <div>
        <h3>Weather in {country.capital[0]}</h3>
      </div>
    )
  }
}

const MultiCountryView = ({ filteredCountries, setFilteredCountries }) => {
  if (filteredCountries.length > 10) {
    return (<div>Too many matches, specify another filter</div>)
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
      <Filter allCountries={allCountries} filteredCountries={filteredCountries} setFilteredCountries={setFilteredCountries} />
      <MultiCountryView filteredCountries={filteredCountries} setFilteredCountries={setFilteredCountries} />
    </div>
  )
}

export default App