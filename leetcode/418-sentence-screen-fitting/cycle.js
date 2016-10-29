/**
 * This solution detects cycles and interpolates cycles,
 * accelerating queries with many cycle repetitions.
 *
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

  // Consume lines until we end up at a state we've seen before, or we run out
  let i = 0; // index into the sentence
  let count = 0;
  let cycleCandidates = [];
  while(cycleCandidates.length < rows && !(i in memo)) {
    let completedCount;
    [completedCount, i] = fillLine(i);
    cycleCandidates.push([completedCount, i]);
  }

  // Find the start of the cycle
  // We ignore the last entry in cycle count. It's either a one-row cycle or the very last row.
  // For cycles of length > 1, we exclude the first repeated candidate from the cycle.
  // Cycles starting at i=0 are treated specially, 'cause they'll only have one candidate entry.
  let j = 0; // index into cycleCandidates
  while(i !== 0 && j < cycleCandidates.length - 1) {
      rows -= 1;
      count += cycleCandidates[j][0];
      if(cycleCandidates[j++][1] == i) break;
  }

  // Short circuit before zero length cycle
  let cycleLength = cycleCandidates.length - j;
  if(!cycleLength) return count;

  let cycleSentenceCount = 0;
  for(; j < cycleCandidates.length; j++) {
    cycleSentenceCount += cycleCandidates[j][0];
  }

  count += Math.floor(rows / cycleLength) * cycleSentenceCount;
  rows = rows % cycleLength;

  // Consume remaining partial cycle
  while(rows) {
      let completedCount;
      [completedCount, i] = fillLine(i);
      count += completedCount;
      rows -= 1;
  }

  return count;
};
