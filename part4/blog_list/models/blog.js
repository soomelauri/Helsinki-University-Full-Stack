const mongoose = require('mongoose')

// create blogschema for mongoose without validation
const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

// initialize the Blog constructor function
module.exports = mongoose.model('Blog', blogSchema)
