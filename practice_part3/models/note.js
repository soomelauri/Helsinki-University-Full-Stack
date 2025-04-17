const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

// new way of defining the uri string: use it like this:
// MONGODB_URI="your_connection_string_here" npm run dev
const url = process.env.MONGODB_URI

console.log('Connecting to:', url)
mongoose.connect(url)
    .then(response => {
        console.log('connected succesfully to MongoDB')
    })
    .catch(error => {
        console.log('error', error.message)
    })

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
    })

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
    })

module.exports = mongoose.model('Note', noteSchema)
