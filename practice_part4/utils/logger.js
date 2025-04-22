const info = (...params) => {
  // don't print if we are running a test
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params)
  }
}

const error = (...params) => {
  // don't print if we are running a test
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params)
  }
}

module.exports = {
  info,
  error
}
