import { useState } from 'react'

const Form = ({ newEntry, setNewEntry, persons, setPersons }) => {
  const submitHandler = (event) => {
    event.preventDefault()

    document.getElementById('nameInput').value = ''
    document.getElementById('numberInput').value = ''

    if (persons.find(person => person.name === newEntry.name)) {
      alert(`${newEntry.name} is already added to phonebook`)
      return;
    }

    setPersons(persons.concat(newEntry))
  }

  const nameChangeHandler = (event) => {
    let newEntryCopy = structuredClone(newEntry)
    newEntryCopy.name = event.target.value
    setNewEntry(newEntryCopy)
    // console.log(newEntry)
  }

  const numberChangeHandler = (event) => {
    let newEntryCopy = structuredClone(newEntry)
    newEntryCopy.number = event.target.value
    setNewEntry(newEntryCopy)
    // console.log(newEntry)
  }

  return (
    <div>
      <h2>add a new</h2>
      <form onSubmit={submitHandler}>
        <div>
          name: <input id="nameInput" onChange={nameChangeHandler} />
        </div>
        <div>
          number: <input id="numberInput" onChange={numberChangeHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Entry = ({ person }) => (
  <div>{person.name} {person.number}</div>
)

const Numbers = ({ persons, filter }) => (
  <div>
    <h2>Numbers</h2>
    {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
      .map(person => <Entry key={person.name} person={person} />)}
  </div>
)

const Filter = ({ setFilter }) => {
  const filterChangeHandler = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      filter shown with <input onChange={filterChangeHandler}></input>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newEntry, setNewEntry] = useState({ name: '', number: '' })
  const [filter, setFilter] = useState('')

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter setFilter={setFilter} />
      <Form newEntry={newEntry} setNewEntry={setNewEntry} persons={persons} setPersons={setPersons} />
      <Numbers persons={persons} filter={filter} />
    </div>
  )
}

export default App