const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/User')
// const logger = require('../utils/logger')

describe('/api/blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
      .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('returned blogs use id instead of _id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach((blog) => {
      // logger.info('each blog: ', blog)
      expect(blog.id).toBeDefined()
      expect(blog._id).not.toBeDefined()
    })
  })

  test('post new blog', async () => {
    // logger.info('helper.newBlog: ', helper.newBlog)
    const response = await api
      .post('/api/blogs')
      .send(helper.newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    // logger.info('response: ', response.body)
    const resultBlogs = await helper.blogsInDb()
    // logger.info('resultBlogs: ', resultBlogs)
    expect(resultBlogs).toHaveLength(helper.initialBlogs.length + 1)
    // logger.info('response.body.id: ', response.body.id)
    const justAddedBlog = resultBlogs.find(b => response.body.id === b.id)
    expect(justAddedBlog.title).toBe(helper.newBlog.title)
    expect(justAddedBlog.author).toBe(helper.newBlog.author)
    expect(justAddedBlog.url).toBe(helper.newBlog.url)
    expect(justAddedBlog.likes).toBe(helper.newBlog.likes)
  })

  test('post new blog no likes', async () => {
    // logger.info('helper.newBlog: ', helper.newBlog)
    const response = await api
      .post('/api/blogs')
      .send(helper.newBlogNoLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    // logger.info('response: ', response.body)
    const resultBlogs = await helper.blogsInDb()
    // logger.info('resultBlogs: ', resultBlogs)
    expect(resultBlogs).toHaveLength(helper.initialBlogs.length + 1)
    // logger.info('response.body.id: ', response.body.id)
    const justAddedBlog = resultBlogs.find(b => response.body.id === b.id)
    expect(justAddedBlog.title).toBe(helper.newBlogNoLikes.title)
    expect(justAddedBlog.author).toBe(helper.newBlogNoLikes.author)
    expect(justAddedBlog.url).toBe(helper.newBlogNoLikes.url)
    expect(justAddedBlog.likes).toBe(0)
  })
})

describe('/api/users', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'jaboukie',
      name: 'Jaboukie Young-White',
      password: 'funnydude',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

afterAll(() => {
  mongoose.connection.close()
})