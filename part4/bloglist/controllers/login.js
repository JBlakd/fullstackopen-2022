const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const logger = require('../utils/logger')

loginRouter.post('/', async (request, response) => {
  logger.info('incoming login request body: ', request.body)
  const { username, password } = request.body

  // Find the supposedly self-identifying user from the userbase
  const user = await User.findOne({ username })
  // Put the provided password through the hash function. Compare the output with the stored passwordHash
  const passwordCorrect = (user === null)
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  logger.info('password correct: ', passwordCorrect)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  logger.info('/api/login token:', token)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter