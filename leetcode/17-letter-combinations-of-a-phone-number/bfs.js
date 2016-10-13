/**
 * @param {string} digits
 * @return {string[]}
 */

const LETTERS_BY_DIGIT = {
  "1": "*",
  "2": "abc",
  "3": "def",
  "4": "ghi",
  "5": "jki",
  "6": "mno",
  "7": "pqrs",
  "8": "tuv",
  "9": "wxyz"
};
var letterCombinations = function(digits) {
    let prev;
    let current = [""];
    if(!digits.length) return [];

    for(let d of digits) {
        prev = current;
        current = [];
        for(let p of prev) {
            for(let c of LETTERS_BY_DIGIT[d] || []) {
                current.push(p+c);
            }
        }
    }
    return prev;
};
