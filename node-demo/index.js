// this is a comment
console.log("Hello, Pactflow!");

// Variables declrations
let a = 5;
let b = 6;

b = 7;

// constants
const PI = 3.14;
// PI = 2.34;


// Mathematical operations
console.log("Sum is:", a + b);
console.log("Product is:", a * b);
console.log("Difference is:", b - a);
console.log("Quotient is:", b / a);

// Functions
function greet(name) {
  return `Hello, ${name}! Welcome to Pactflow.`;
}

console.log(greet("Aaryan"));
console.log(greet("Arush"));
console.log(greet("Kirti"));

// conditional statements
if (a < b) {
  console.log(`${a} is less than ${b}`);
} else if (a > b) {
  console.log(`${a} is greater than ${b}`);
} else {
  console.log(`${a} is equal to ${b}`);
}

// loops 
// start value = 0, end value = 2 [0, 1, 2] -> 3 times
for (let i = 0; i < 3; i++) {
  console.log(`Iteration number: ${i + 1}`);
}

// print the table
function printTable(num) {
    console.log(`Table of ${num}:`);
    for(let i = 1; i <= 10; i++) { // [1-10]
        console.log(`${num} x ${i} = ${num * i}`);
    }
}
//printTable(23);

// let vs var --> let - block scope, var - function scope

// {
//     var x = 10;
//     console.log(x);
// }
// console.log("Outside block:", x);

// Arrays
let fruits = ["Apple", "Banana", "Mango", "Mapple"];
fruits.push("Orange");

fruits.forEach((fruit, index) => {
    console.log(`Fruit ${index + 1}: ${fruit}`);
});

fruits.filter(fruits => fruits.length > 5)
    .forEach(fruit => console.log("Filtered Fruit:", fruit));

fruits.pop();

fruits.map(fruit => fruit.toUpperCase())
    .forEach(fruit => console.log("Uppercase Fruit:", fruit));

fruits.filter(fruit => fruit.startsWith("M"))
    .map(fruit => fruit.toUpperCase())
    .forEach(fruit => console.log(fruit));

console.log(fruits.length);
console.log("Fruits:", fruits);

