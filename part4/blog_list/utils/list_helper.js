const _ = require('lodash')
const blog = require('../models/blog')
// Let's create a collection of helper functions that are best suited for working with the describe sections of the blog list. 
// Create the functions into a file called utils/list_helper.js.
//  Write your tests into an appropriately named test file under the tests directory.

const dummy = (blogs) => {
  return 1
}

// Define a new totalLikes function that receives a list of blog posts as a parameter. 
// The function returns the total sum of likes in all of the blog posts.
// Write appropriate tests for the function. 
// It's recommended to put the tests inside of a describe block so that the test report output gets grouped 
// nicely:

// I think this is a reducer function, you take a list, keep count, and then iterate

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

// Define a new favoriteBlog function that receives a list of blogs as a parameter. ----- 
// The function returns the blog with the most likes. If there are multiple favorites, 
// it is sufficient for the function to return any one of them.


const favoriteBlog = (blogs) => {
  const reducer = (current, favorite) => {
    if (current.likes > favorite.likes) {
      return current
    }
    return favorite
  }
  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, blogs[0])
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }

  const authorGroups = _.groupBy(blogs, 'author')
  const authorCounts = _.mapValues(authorGroups, group => group.length)

  const maxAuthor = _.maxBy(Object.keys(authorCounts), author => authorCounts[author])

  return {
    author: maxAuthor,
    blogs: authorCounts[maxAuthor]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }

  // Group each blog by their author
  const authorGroups = _.groupBy(blogs, 'author')

  // Get each like for each author and their blogs
  const authorLikes = _.mapValues(authorGroups, blogs => _.sumBy(blogs, 'likes'))

  const maxAuthor = _.maxBy(Object.keys(authorLikes), author => authorLikes[author])

  return {
    author: maxAuthor,
    likes: authorLikes[maxAuthor]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
