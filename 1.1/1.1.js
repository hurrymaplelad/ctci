/*
* Determine if a string has all unique characters.
* Can you do it without additional data structures?
*/

let input1 = "acb".split('');
let input2 = "abcb".split('');

function hasUniqueCharacters(input) {
  input.sort();
  let last = null;
  for(let char of input) {
    if(char === last) {
      return false;
    }
    last = char;
  }
  return true;
}

console.log(hasUniqueCharacters(input1))
console.log(hasUniqueCharacters(input2))
