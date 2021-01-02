var name = 'Mike';
let age = 29;               //  "let" is the newer alternative to "var"
const hasHobbies = true;    //  "const" means variable will not change

// age = 30;
// hasHobbies = false; //   this will not compile

console.log(name);

const summarizeUser = (userName, userAge, userHasHobby) => {
    return ('Name is ' + userName + ', age is ' + userAge + ' and the user has hobbies: ' + userHasHobby);
}

// when function is a single command
const add = (a, b) => a + b;

// when function has only one argument you can ommit the parenthesis around the argument
const addOne = a => a + 1;

// function summarizeUser(arg1, arg2) {
//     return ("Blabla " + arg1 + "...");
// }

console.log(summarizeUser(name, age, hasHobbies));