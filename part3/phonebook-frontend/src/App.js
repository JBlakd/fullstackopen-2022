import { useState, useEffect } from 'react'
import personsService from './services/persons'


const Form = ({ newEntry, setNewEntry, persons, setPersons, setNotification }) => {
  const submitHandler = (event) => {
    event.preventDefault()

    const alreadyExistingPerson = persons.find(person => person.name === newEntry.name)

    if (alreadyExistingPerson !== undefined) {
      if (window.confirm(`${alreadyExistingPerson.name} is already added to the phonebook, replace old number with new one?`)) {
        personsService
          .update(alreadyExistingPerson.id, newEntry)
          .then(returnedPerson => {
            setPersons(persons.map(p => (p.id === returnedPerson.id) ? returnedPerson : p))
            setNewEntry({ name: '', number: '' })
            document.getElementById('nameInput').value = ''
            document.getElementById('numberInput').value = ''
          })
          .catch(error => {
            setNotification({ message: error.response.data.error, isError: true })
            setTimeout(() => {
              setNotification({ message: '', isError: false })
            }, 3000)
          })
      }

      return
    }

    personsService
      .create(newEntry)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewEntry({ name: '', number: '' })
        document.getElementById('nameInput').value = ''
        document.getElementById('numberInput').value = ''
        setNotification({ message: `Added ${returnedPerson.name}`, isError: false })
        setTimeout(() => {
          setNotification({ message: '', isError: false })
        }, 3000)
      })
      .catch(error => {
        setNotification({ message: error.response.data.error, isError: true })
        setTimeout(() => {
          setNotification({ message: '', isError: false })
        }, 3000)
      })

    // setPersons(persons.concat(newEntry))
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

const Entry = ({ id, persons, setPersons }) => {
  const person = persons.find(p => p.id === id)
  // console.log("id from Entry: ", id)
  // console.log("person from Entry: ", person)

  const deleteEntryHandler = () => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService
        .erase(id)
        .then(status => {
          console.log("delete request status: ", status)
          if (status === 204) {
            setPersons(persons.filter(p => p.id !== id))
          }
        })
    }
  }

  return (
    <div>
      {person.name} {person.number}
      <button onClick={deleteEntryHandler}>delete</button>
    </div>
  )
}

const Numbers = ({ persons, setPersons, filter }) => (
  <div>
    <h2>Numbers</h2>
    {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
      .map(person => <Entry key={person.id} id={person.id} persons={persons} setPersons={setPersons} />)}
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

const Notification = ({ notification }) => {
  const normalStyle = {
    color: 'green',
    background: 'lightgrey',
    fontsize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontsize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (notification.message === '') {
    return (<></>)
  } else {
    return (
      <div style={notification.isError ? errorStyle : normalStyle}>
        {notification.message}
      </div>
    )
  }
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newEntry, setNewEntry] = useState({ name: '', number: '' })
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({ message: '', isError: false })

  const hook = () => {
    console.log('effect for initial rendering of persons')
    personsService
      .getAll()
      .then(response => {
        console.log("getAll() response: ", response)
        setPersons(response)
      })
  }

  useEffect(hook, [])

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notification} />
      <Filter setFilter={setFilter} />
      <Form newEntry={newEntry} setNewEntry={setNewEntry} persons={persons} setPersons={setPersons} setNotification={setNotification} />
      <Numbers persons={persons} setPersons={setPersons} filter={filter} />
    </div>
  )
}

export default App