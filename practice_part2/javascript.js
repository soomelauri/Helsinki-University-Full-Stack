// // use 'clg' to create the console.log snippet
// console.log()

// // Higher-order functions by Fun Fun Function

// // Create a function that multiplies the number by three:
// function timesThree(x) {
//     return x * 3
// }

// // Then create an anonymous function and assign it to a variable
// const anon = function(x) {
//     return x * 3
// }

// const newTriple = anon

// console.log(newTriple(5))

// In JS, functions are variable that can be assigned to other values
// Functions can also be passed to other functions, HIGHER ORDER functions

// Function composition

// filter function is an array and accepts another function as it's argument

// const animals = [
//     { name: 'Fluffykins', species: 'rabbit' },
//     { name: 'Caro', species: 'dog' },
//     { name: 'Hamilton', species: 'dog' },
//     { name: 'Harold', species: 'fish' },
//     { name: 'Ursula', species: 'cat' },
//     { name: 'Jimmy', species: 'fish' },
// ]


// Let's filter only dogs using a for loop:
// const dogs = []
// for ( i=0; i < animals.length; i++) {
//     if ( animals[i].species === 'dog' ) {
//         dogs.push(animals[i])
//     }
// }

// console.log(dogs)


// Same using a filter function
// functions that are sent to other functions are called callback functions
// const dogs = animals.filter(function(animal) {
//     return animal.species === 'dog'
// })
// console.log(dogs)


// Same using an arrow function:

// const dogs = animals.filter(animal => animal.species === 'dog')
// console.log(dogs)


// Map Function by Fun Fun Function:
// map function applies a function to an array, item by item

const animals = [
    { name: 'Fluffykins', species: 'rabbit' },
    { name: 'Caro', species: 'dog' },
    { name: 'Hamilton', species: 'dog' },
    { name: 'Harold', species: 'fish' },
    { name: 'Ursula', species: 'cat' },
    { name: 'Jimmy', species: 'fish' },
]

// Let's get all the names using a for loop

// const names = []
// for (i=0; i < animals.length; i++) {
//     names.push(animals[i].name)
// }
// console.log(names)

// Now the same using a map function

// const namesMapped = animals.map(animal => animal.name)

// console.log(namesMapped)

// Same thing, creating a an object rather than an array
// const namesAndSpeciesMapped = animals.map((animal) => {
//     return `${animal.name} is a ${animal.species}`
// })

// console.log(namesAndSpeciesMapped)


// Rewrite using an even better arrow function ECMA6

// const newArrow = animals.map((animal) => animal.name)
// console.log(newArrow)


// Reduce basics - Fun Fun Function

const orders = [
    { amount: 250 },
    { amount: 400 },
    { amount: 100 },
    { amount: 325 }
]

// For loop approach:
// let totalAmount = 0
// for (let i=0; i < orders.length; i++) {
//     totalAmount += orders[i].amount
// }


// Reduce approach:
// const totalAmount = orders.reduce(function(sum, order) {
//     console.log("hello", sum, order)
//     return sum + order.amount

// }, 0)

// Reduce arrow function
const totalArrow = orders.reduce((sum, order) => sum + order.amount, 0)

console.log(totalArrow)
