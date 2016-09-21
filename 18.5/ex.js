/* Given a big file 'o words, and two words, find min distance in words
   between two occurences*/

function* wordGenerator() {
  let words = ['moo', 'cow', 'dog', 'moo', 'dog', 'dog', 'cat'];
  for(let w of words) {
    yield w;
  }
}

function minDistance(w1, w2) {
  let wg = wordGenerator();
  let nextWord = wg.next.bind(wg);
  let min = Infinity;
  let i1 = i2 = -Infinity;
  let i = 0;
  let w = null;
  while(w = nextWord().value) {
    i += 1;
    if(w === w1) {
       i1 = i;
       min = Math.min(min, i1 - i2);
    }
    if(w === w2) {
      i2 = i;
      min = Math.min(min, i2 - i1);
    }
  }
  return min;
}

console.log(minDistance('moo', 'dog')); // 1
console.log(minDistance('moo', 'cat')); // 3
console.log(minDistance('moo', 'unicorn')); // Infinity
