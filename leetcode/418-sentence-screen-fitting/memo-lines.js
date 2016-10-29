const assert = require('assert');

/**
 * @param {string[]} sentence
 * @param {number} rows
 * @param {number} cols
 * @return {number}
 */
var wordsTyping = function(sentence, rows, cols) {
  let memo = {};

  // Any words that don't fit?
  for(let w of sentence) {
      if(w.length === 0) return NaN;
      if(w.length > cols) return 0;
  }

  // Consume one line's worth of words.
  // Memoize in case we find a cycle.
  function fillLine(i) {
      let iBefore = i;
      if(iBefore in memo) return memo[iBefore];
      let completed = 0;
      let colsUsed = 0;
      let empty = true; // use a separate flag to support empty words
      let wordSpace = () => sentence[i].length + (empty ? 0 : 1);

      while(colsUsed + wordSpace() <= cols) {
        colsUsed += wordSpace();
        i += 1;
        empty = false;
        if(i == sentence.length) {
          i = 0;
          completed += 1;
        }
      }

      let after = [completed, i];
      memo[iBefore] = after;
      return after;
  }

  let i = 0;
  let count = 0;
  while(rows) {
      let completedCount;
      [completedCount, i] = fillLine(i);
      count += completedCount;
      rows -= 1;
  }

  return count;
};

assert.equal(wordsTyping(["hello","world"], 2, 8), 1);
assert.equal(wordsTyping(["a", "bcd", "e"], 3, 6), 2);
assert.equal(wordsTyping(["a"], 20000, 20000), 200000000); 
