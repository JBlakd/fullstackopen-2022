const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();

const app = express()

app.use(express.json())
// morgan.token('res-body', (req, res) => JSON.stringify(res.body))
morgan.token('res-body', (req, res) => {
  // console.log(req.body)
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :res-body'))
app.use(cors())
app.use(express.static('build'))

// MongoDB
const Person = require('./models/person')

// API functions
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
  Person.count({}).then(count => {
    response.send(`<div>Phonebook has info for ${count} people</div> </br> <div>${new Date()}</div>`)
  })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(p => {
    response.json(p)
  })
})

app.get('/api/persons/:id', (request, response) => {
  // console.log("request.params.id", request.params.id)
  Person.findById(request.params.id).then(p => {
    response.json(p)
  })
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

  let numDuplicates = 0

  Person.count({ name: inputPerson.name })
    .then(c => {
      if (c > 0) {
        response.status(400).json({ error: 'name must be unique' })
        return
      }

      const acceptablePerson = new Person(inputPerson)

      acceptablePerson.save().then(savedPerson => {
        response.json(savedPerson)
      })
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})