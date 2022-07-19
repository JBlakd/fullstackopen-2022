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

const newBlog = {
  'title': 'shout out to all my homophobic fans 🚫🌈🤍',
  'author': 'LilNasX',
  'url': 'https://twitter.com/LilNasX/status/1545582753609003008',
  'likes': 132600
}

const newBlogNoLikes = {
  'title': 'i\'m just a poor boy nobody likes me',
  'author': 'bunyim',
  'url': 'https://leetcode.com/bsok3112/',
}

const newBlogNoTitle = {
  'author': 'bunyim',
  'url': 'https://leetcode.com/bsok3112/',
  'likes': 2
}

const newBlogNoUrl = {
  'title': 'i\'m just a poor boy nobody likes me',
  'author': 'bunyim',
  'likes': 2
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb, newBlog, newBlogNoLikes, newBlogNoUrl, newBlogNoTitle
}