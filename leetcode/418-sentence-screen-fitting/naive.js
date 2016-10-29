/**
 * @param {string[]} sentence
 * @param {number} rows
 * @param {number} cols
 * @return {number}
 */
var wordsTyping = function(sentence, rows, cols) {
  // Any words that don't fit?
  for(let w of sentence) {
      if(w.length === 0) return NaN;
      if(w.length > cols) return 0;
  }

  let count = 0;
  let colsUsed = 0;
  let i = 0;
  let empty = true; // use a separate flag to support empty words
  while(rows) {
      let wordSpace = sentence[i].length + (empty ? 0 : 1);

      if(colsUsed + wordSpace <= cols) {
        // word fits
        colsUsed += wordSpace;
        i += 1;
        empty = false;
        if(i == sentence.length) {
          i = 0;
          count += 1;
        }
      } else {
        // word doesn't fit, new line
        rows -= 1;
        colsUsed = 0;
        empty = true;
      }
  }

  return count;
};
