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

module.exports = {
    dummy,
    totalLikes
}
