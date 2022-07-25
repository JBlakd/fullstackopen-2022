const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
// const { usersInDb } = require('../tests/test_helper')
const logger = require('../utils/logger')

// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   logger.info('authorization: ', authorization)
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     return authorization.substring(7)
//   }
//   return null
// }

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  if (request.body.title === undefined || request.body.url === undefined) {
    response.status(400).end()
  }

  // const token = getTokenFrom(request)
  logger.info('request.token, ', request.token)
  if (!request.token) {
    return response.status(401).json({ error: 'missing token' }).end()
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  logger.info('decoded token: ', decodedToken)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'invalid token' }).end()
  }

  const user = await User.findById(decodedToken.id)
  console.log('user identified from token: ', user)
  if (user === null) {
    response.status(400).json({ error: 'invalid user' }).end()
  }

  // logger.info('incoming POST request body: ', request.body)
  const blog = new Blog({ ...request.body, user: user._id })
  // logger.info('incoming POST blog: ', blog)

  const savedBlog = await blog.save()
  logger.info('savedBlog: ', savedBlog)

  // save the newly added blog to the user document as well
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  const finalBlog = await Blog.findById(savedBlog.id).populate('user')
  logger.info('finalBlog: ', finalBlog)

  response.status(201).json(finalBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
  if (request.params.id === undefined) {
    response.status(400).end()
  }

  if (!request.token) {
    return response.status(401).json({ error: 'missing token' }).end()
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  logger.info('decoded token: ', decodedToken)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'invalid token' }).end()
  }

  // Check if the token is legit
  const blogToRemove = await Blog.findById(request.params.id)
  logger.info('blogToRemove: ', blogToRemove)
  if (blogToRemove.user.toString() !== decodedToken.id.toString()) {
    return response.status(401).json({ error: 'unauthorised token' })
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  if (request.params.id === undefined) {
    response.status(400).end()
  }

  logger.info('PUT request body', request.body)
  // logger.info('keys in Blog.paths', Object.keys(Blog.schema.paths))

  Object.keys(request.body).forEach(attribute => {
    // logger.info('PUT attribute encountered: ', attribute)
    if (!(Object.keys(Blog.schema.paths).includes(attribute))) {
      // logger.info('PUT invalid attribute encountered: ', attribute)
      response.status(400).end()
    }
  })

  const existingBlog = await Blog.findById(request.params.id)
  logger.info('PUT request existingBlog', existingBlog)
  if (existingBlog === null) {
    logger.info('PUT blog not found')
    response.status(404).end()
  }
  if (existingBlog.user.toString() !== request.body.user) {
    logger.info('PUT user field does not match existing blog user field')
    logger.info('existingBlog.user: ', existingBlog.user, 'request.body.user: ', request.body.user)
    response.status(400).end()
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
  logger.info('PUT request updatedBlog: ', updatedBlog)
  response.status(200).json(updatedBlog.toJSON())
})

module.exports = blogsRouter