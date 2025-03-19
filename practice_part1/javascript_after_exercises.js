// const arto = {
//     name: 'Arto Hellas',
//     age: 35,
//     education: 'PhD',
  
//     greet: function() {
//       console.log('hello, my name is ' + this.name)
//     },
//   }
  
// //   arto.greet()  // "hello, my name is Arto Hellas" gets printed


// const arto = {
//     name: 'Arto Hellas',
//     age: 35,
//     education: 'PhD',
//     greet: function() {
//       console.log('hello, my name is ' + this.name)
//     },
//   }
  
//   arto.growOlder = function() {
//     this.age += 1
//   }
  
//   console.log(arto.age)   // 35 is printed
//   arto.growOlder()
//   console.log(arto.age)   // 36 is printed


// const arto = {
//     name: 'Arto Hellas',
//     age: 35,
//     education: 'PhD',
//     greet: function() {
//       console.log('hello, my name is ' + this.name)
//     },
  
//     doAddition: function(a, b) {
//       console.log(a + b)
//     },
//   }
  
// arto.doAddition(1, 4)        // 5 is printed

// const referenceToAddition = arto.doAddition
// referenceToAddition(10, 15)   // 25 is printed

// arto.greet()       // "hello, my name is Arto Hellas" gets printed

// const referenceToGreet = arto.greet
// referenceToGreet() // prints "hello, my name is undefined"


const arto = {
    name: 'Arto Hellas',
    greet: function() {
      console.log('hello, my name is ' + this.name)
    },
  }
  
  
//   setTimeout(arto.greet.bind(arto), 1000)



// class Person {
//     constructor(name, age) {
//       this.name = name
//       this.age = age
//     }
//     greet() {
//       console.log('hello, my name is ' + this.name)
//     }
//   }
  
//   const adam = new Person('Adam Ondra', 29)
//   adam.greet()
  
//   const janja = new Person('Janja Garnbret', 23)
//   janja.greet()


// function foo(x, condition) {
//     if (condition) {
//       //console.log(x); -- This throws an error because x is not yet defined (next line)
//       const x = 2;
//       console.log(x);
//     }
//   }
  
//   foo(1, true);
  


//Decrementing and incrementing
for(let x = 5; x > 1; x--) {
    console.log(x)
}
