const mongoose = require('mongoose')

// first things first: create a user schema with username, password, name

const userSchema = mongoose.Schema(
  {
    name: String,
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 3
    },
    passwordHash: String,
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
      },
    ],
  }
)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
