const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
  }

const password = process.argv[2]

const url = `mongodb+srv://laurisoome1996:${password}@cluster0.0ck4zk2.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
})

if (process.argv.length === 3) {
    Person.find({})
        .then(result => {
            result.forEach(person => {
                console.log(person)
            })
            mongoose.connection.close()
        })
} else if (process.argv.length === 5){
    person.save()
        .then(result => {
            console.log(`added ${result.name} to phonebook`)
            mongoose.connection.close()
        })
}
