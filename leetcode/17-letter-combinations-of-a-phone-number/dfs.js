/**
 * @param {string} digits
 * @return {string[]}
 */

const LETTERS_BY_DIGIT = {
  "1": "*",
  "2": "abc",
  "3": "def",
  "4": "ghi",
  "5": "jkl",
  "6": "mno",
  "7": "pqrs",
  "8": "tuv",
  "9": "wxyz"
};
var letterCombinations = function(digits) {
    let results = [];

    function walk(i, str) {
        if(i === digits.length) {
            results.push(str);
            return;
        }
        for(let c of LETTERS_BY_DIGIT[digits[i]] || []) {
            walk(i+1, str+c);
        }
    }

    if(digits.length) walk(0, "");
    return results;
};
