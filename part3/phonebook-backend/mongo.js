const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const username = "JBlakd"
const password = process.argv[2]

const url = `mongodb+srv://${username}:${password}@jblakdcluster.fti4a.mongodb.net/personApp?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
  mongoose
    .connect(url)
    .then(() => {
      console.log('connected. adding person.')

      const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
      })

      return person.save()
    })
    .then((result) => {
      console.log(`added ${result.name} number ${result.number} to phonebook`)
      return mongoose.connection.close()
    })
    .catch((err) => console.log(err))
} else if (process.argv.length === 3) {
  mongoose
    .connect(url)
    .then(() => {
      console.log('connected. fetching all persons.')
      return Person.find({})
    })
    .then((result) => {
      console.log('Phonebook:')
      result.map(p => console.log(`${p.name} ${p.number}`))
      return mongoose.connection.close()
    })
    .catch((err) => console.log(err))
}

