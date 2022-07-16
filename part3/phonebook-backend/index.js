const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
// morgan.token('res-body', (req, res) => JSON.stringify(res.body))
morgan.token('res-body', (req, res) => {
  // console.log(req.body)
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :res-body'))

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
  response.send(`<div>Phonebook has info for ${persons.length} people</div> </br> <div>${new Date()}</div>`)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)
  // console.log("GET specific person response: ", person)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(p => p.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const inputPerson = request.body

  if (!inputPerson.hasOwnProperty("name") || !inputPerson.hasOwnProperty("number")) {
    response.status(400).json({ error: 'malformed person: name or number is missing' })
    return
  }

  if (persons.find(p => p.name === inputPerson.name)) {
    response.status(400).json({ error: "name must be unique" })
    return
  }

  const acceptablePerson = inputPerson
  acceptablePerson.id = Math.floor(Math.random() * 100000000);
  persons = persons.concat(acceptablePerson)

  response.json(acceptablePerson)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})