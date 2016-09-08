function canPermute(str1, str2) {
  if(str1.length != str2.length){
    return false;
  }
  let counts1 = countLetters(str1);
  let counts2 = countLetters(str2);
  let alpha1 = counts1.keys();
  let alpha2 = counts2.keys();

  if(alpha1.length != alpha2.length) {
    return false;
  }

  for(let char of alpha1) {
    if(counts1.get(char) != counts2.get(char)){
      return false;
    }
  }
  return true;
}

function countLetters(str) {
  let counts = new Map();
  for(let char of str) {
    if(counts.has(char)){
      counts.set(char, counts.get(char) + 1);
    } else {
      counts.set(char, 1);
    }
  }
  return counts;
}

console.log(canPermute("ab", "ba"));
console.log(canPermute("ab", "bb"));
console.log(canPermute("ab", "b"));
