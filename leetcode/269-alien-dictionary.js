/**
 * @param {string[]} words
 * @return {string}
 */
var alienOrder = function(words) {
  if(!words) return "";
  let preceedersByChar = {};
  let invalid = false;

  function markPreceeds(c, d) {
      if(!(d in preceedersByChar)) {
          preceedersByChar[d] = new Set();
      }
      return preceedersByChar[d].add(c);
  }

  function encode(w1, w2) {
      for(var i=0; i<w2.length; i++) {
          if(w1[i] !== w2[i]) {
              if(w1[i]) markPreceeds(w1[i], w2[i]);
              return;
          }
      }
      // Found prefix sorted after full word
      if(i < w1.length) {
        invalid = true;
      }
  }

  for(let i=1; i<words.length; i++) {
      encode(words[i-1], words[i]);
  }

  let out = '';
  let unvisitedChars = new Set();
  for(let w of words) {
      for(let c of w) {
          unvisitedChars.add(c);
      }
  }

  let processingChars = new Set();
  function visit(c) {
      if(!unvisitedChars.has(c)) return;

      // Cycle detection
      if(processingChars.has(c)) {
          invalid = true;
          return;
      }
      processingChars.add(c);

      for(let c0 of preceedersByChar[c] || []) {
          visit(c0);
      }
      out += c;
      processingChars.delete(c);
      unvisitedChars.delete(c);
  }

  while(unvisitedChars.size) {
    visit(unvisitedChars.values().next().value);
  }
  return invalid ? '' : out;
}
