<!-- ----1---- -->
var, let, and const are used to declare variables in JavaScript.
var is the old way to declare variables. It has function scope and can be re-declared and updated.
let has block scope. It can be updated but cannot be re-declared in the same scope.
const also has block scope but its value cannot be changed after declaration.
Example:
var a = 10;
let b = 20;
const c = 30;

<!-- ------2----- -->
The spread operator (...) is used to expand elements of an array or object.
It helps to copy or merge arrays and objects easily.
Example:
const arr1 = [1,2,3];
const arr2 = [...arr1,4,5];
console.log(arr2);
<!-- --------3-------- -->
These are array methods used to work with array data.
forEach() → Loops through the array but does not return a new array.
map() → Loops through the array and returns a new array after modifying each element.
filter() → Returns a new array with elements that match a specific condition.
Example:
const numbers = [1,2,3,4];
numbers.forEach(num => console.log(num));
const doubled = numbers.map(num => num * 2);
const even = numbers.filter(num => num % 2 === 0);

<!-- ----------4--------- -->
An arrow function is a shorter way to write functions in JavaScript.
Example:
const add = (a, b) => {
  return a + b;
};
It makes the code shorter and cleaner.

<!-- --------5------- -->
Template literals are used to create strings easily with variables.
The use backticks ( ) instead of quotes.
Example:
const name = "Imran";
console.log(`Hello ${name}`);
