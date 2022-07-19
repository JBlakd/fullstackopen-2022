const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
// const logger = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  if (request.body.title === undefined || request.body.url === undefined) {
    response.status(400).end()
  }

  // logger.info('incoming POST request body: ', request.body)
  const blog = new Blog(request.body)
  // logger.info('incoming POST blog: ', blog)

  const savedBlog = await blog.save()
  // logger.info(savedBlog.toJSON())
  response.status(201).json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
  if (request.params.id === undefined) {
    response.status(400).end()
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  if (request.params.id === undefined) {
    response.status(400).end()
  }

  // logger.info('PUT request body', request.body)
  // logger.info('keys in Blog.paths', Object.keys(Blog.schema.paths))

  Object.keys(request.body).forEach(attribute => {
    // logger.info('PUT attribute encountered: ', attribute)
    if (!(Object.keys(Blog.schema.paths).includes(attribute))) {
      // logger.info('PUT invalid attribute encountered: ', attribute)
      response.status(400).end()
    }
  })

  // logger.info('PUT all valid keys')

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body)
  response.status(200).json(updatedBlog.toJSON())
})

module.exports = blogsRouter