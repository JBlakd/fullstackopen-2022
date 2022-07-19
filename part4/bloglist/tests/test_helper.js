const Blog = require('../models/blog')

const initialBlogs = [
  {
    'title': 'it be like that sometimes',
    'author': 'jaboukie',
    'url': 'https://twitter.com/jaboukie/status/1026509837239169024',
    'likes': 289400
  },
  {
    'title': 'She belong to the streets',
    'author': 'Future',
    'url': 'https://twitter.com/1future/status/1260668431210287109',
    'likes': 372600
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}