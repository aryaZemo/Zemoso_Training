
/* 
    Q1. Write a program to demonstrate how a function can be passed as a parameter to another function.
    
*/

function add (x, y){
    return (x+y)
}

function sub (x,y){
    return (x-y)
}

function Calculate (x, y, opearation){
    return opearation(x,y)
}

console.log(Calculate(3,4, add)) // ans :- 7
console.log(Calculate(6,3, sub)) // ans :- 3


/* 

   Q2. An arrow function takes two arguments firstName and lastName and returns a 2 letter string that 
       represents the first letter of both the arguments. For the arguments Roger and Waters, the function returns ‘RW’. Write this function.
       Submit the github link to the code

*/

const getLetters =(firstName, lastName) => 
    
`${firstName.charAt(0)}${lastName.charAt(0)}`     // two expressions are concatenated together using the ${} syntax to create a new string 

console.log(getLetters("Roger", "Waters")) // ans: - 'RW'


