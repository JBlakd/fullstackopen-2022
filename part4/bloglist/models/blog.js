const config = require('../utils/config')
const logger = require('../utils/logger')
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const mongoUrl = config.MONGODB_URI
logger.info(mongoUrl)
mongoose.connect(mongoUrl)

module.exports = mongoose.model('Blog', blogSchema)