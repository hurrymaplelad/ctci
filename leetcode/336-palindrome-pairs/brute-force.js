/**
 * @param {string[]} words
 * @return {number[][]}
 * evaluating runtime:
 */
var palindromePairs = function(words) {
  let results = [];
  for(let i=0; i<words.length; i++) {
    for(let j=0; j<words.length; j++) {
        if(i===j) continue;
        if(isPalindrome(words[i] + words[j])) results.push([i,j]);
    }
  }
  return results;
}


function isPalindrome(s) {
    if(s.length < 2) {
        return true;
    }
    for(let i=0; i<s.length/2; i++) {
        if(s[i] !== s[s.length - 1 - i]) return false;
    }
    return true;
}
