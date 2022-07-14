import { useState } from 'react'

const Form = ({ newName, setNewName, persons, setPersons }) => {
  const submitHandler = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName
    }

    setPersons(persons.concat(personObject))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={submitHandler}>
        <div>
          name: <input onChange={(event) => { setNewName(event.target.value) }} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Entry = ({ person }) => (
  <div>{person.name}</div>
)

const Numbers = ({ persons }) => (
  <div>
    <h2>Numbers</h2>
    {persons.map(person => <Entry key={person.name} person={person} />)}
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  return (
    <div>
      <Form newName={newName} setNewName={setNewName} persons={persons} setPersons={setPersons} />
      <Numbers persons={persons} />
    </div>
  )
}

export default App