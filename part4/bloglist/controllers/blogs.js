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

module.exports = blogsRouter