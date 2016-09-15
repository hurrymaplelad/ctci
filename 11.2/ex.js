/*
 Sort all anagrams together.
*/

function sortGrams(words) {
  // Group words with same letters
  let wordsByKey = new Map();
  for(let word of words) {
    let key = keyLetters(word);
    let list = wordsByKey.get(key);
    if(!list) {
      list = [];
      wordsByKey.set(key, list);
    }
    list.push(word);
  }

  // Covert map to list
  let results = [];
  for(let key of wordsByKey.keys()) {
    for(let word of wordsByKey.get(key)) {
      results.push(word);
    }
  }
  return results;
}

let alphabet = [];
let aCode = 'a'.charCodeAt(0);
for(let i=0; i<26; i++) {
  alphabet.push(String.fromCharCode(aCode + i));
}

function keyLetters(word) {
  let counts = new Map();
  let result = "";
  for(let char of word) {
    counts.set(char, (counts.get(char) || 0) + 1);
  }
  for(let char of alphabet) {
    if(counts.has(char)) {
      result += char + counts.get(char);
    }
  }
  return result;
}

console.log('sorting', sortGrams([
  'bbc',
  'call',
  'abc',
  'lcal',
  'bcb'
]));
