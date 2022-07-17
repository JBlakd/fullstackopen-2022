const mongoose = require('mongoose')

const url = process.env.DB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const numberValidator = (number) => {
  console.log("Entered numberValidator")
  if (number.length < 8) {
    return false
  }

  if (number.includes('-')) {
    const array = number.split('-')
    if (array.length > 2) {
      console.log(`too many sections. should be 1 or 2. Got: ${array.length}`)
      return false
    }

    if (array[0].length < 2 || array[0].length > 3) {
      console.log(`section 0 length should be 2 or 3. Got: ${array[0].length}`)
      return false
    }

    for (const section in array) {
      if (section.match(/^[0-9]+$/) == null) {
        console.log(`section ${section} malformed`)
        return false
      }
    }
  }

  return true
}
const numberValidatorWithMessage = [numberValidator, "malformed number"]

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
    unique: true
  },
  number: {
    type: String,
    validate: numberValidatorWithMessage,
    required: true
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)