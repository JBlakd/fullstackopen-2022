const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

app.use(express.json())
// morgan.token('res-body', (req, res) => JSON.stringify(res.body))
morgan.token('res-body', (req) => {
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

app.get('/api/persons/:id', (request, response, next) => {
  // console.log("request.params.id", request.params.id)
  Person.findById(request.params.id)
    .then(p => {
      if (p) {
        response.json(p)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const acceptablePerson = new Person(request.body)

  acceptablePerson.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const inputPerson = request.body
  // console.log(inputPerson)

  Person.findByIdAndUpdate(request.params.id, inputPerson, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

// error handler
const errorHandler = (error, request, response) => {
  console.error(error.message)

  return response.status(400).json({ error: error.message })

}

// this has to be the last loaded middleware.
app.use(errorHandler)

// start server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})