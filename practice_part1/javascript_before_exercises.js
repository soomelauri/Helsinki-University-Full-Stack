//Variables
const x = 1
let y = 5

// console.log(x, y)   // 1 5 are printed
y += 10
// console.log(x, y)   // 1 15 are printed
y = 'sometext'
// console.log(x, y)   // 1 sometext are printed

//Arrays
const t = [1, -1, 3]
// Push appends the value to the end of the array
t.push(5)

// console.log(t.length)
// console.log(t[1])

t.forEach(value => {
    // console.log(value)
})


// Use concat method over .push in order to create a new array, keeping the original unchanged
const t1 = [1, -1, 3]
const t2 = t1.concat(5)

// Map function creates a new array by using a function on each item of the old array
const t3 = t1.map(value => value * 2)
// console.log(t3)

// Using map can also allow us to transform the old array into something completely different:
const m2 = t1.map(value => '<li>' + value + '</li>')
// console.log(m2)


//Destructuring Assignment
const q = [1, 2, 3, 4, 5]
const [first, second, ...remainder] = q
// console.log(first, second)
// console.log(remainder)

//Object creation
const object1 = {
    name: "Lauri Soome",
    age: 28,
    education: "MSc"
}

const object3 = {
    name: {
        first: "Lauri",
        last: "Soome"
    },
    grades: [4, 5, 5],
    university: "Lehigh University"
}

//Accessing objects:
// console.log(object1.name)
const fieldName = 'age'
// console.log(object1[fieldName])

// Adding properties to an object on the fly
object1.city = 'Helsinki'
// console.log(object1)
object1['secret key'] = 12345
// console.log(object1)

// Complete structure of an arrow function:

const sum = (p1, p2) => {
    console.log(p1)
    console.log(p2)
    return p1 + p2;
}
// const result = sum(1, 5)
// console.log(result)

// Using only one parameter, we don't need the parentheses:
const square = p => {
    console.log(p)
    return p * p
}
// const result2 = square(6)
// console.log(result2)

// Using only one expression:
const square2 = p => p * p
const result3 = square2(10)
// console.log(result3)

// This is great for manipulating arrays:
const t4 = [1, 3, 9]
const t4Squared = t4.map(p => p * p)
// console.log(t4Squared)

// Other ways of defining functions:
function product(a, b) {
    return a * b
}
const result4 = product(2, 9)
// console.log(result4)

const average = function(c, d) {
    return (c + d) / 2
}

const result5 = average(15, 30)
console.log(result5)
