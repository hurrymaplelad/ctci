/*
  String compression
  ex: aaaabb -> a4b2
*/

function countCompress(str) {
  let compressed = "";
  let lastChar = null;
  let runLength = 0;

  for(let i=0; i<=str.length; i++) {
    let isTailChar = (i == str.length);
    let char = isTailChar ? null : str[i];
    if(i > 0 && char != lastChar) {
      compressed += lastChar + runLength;
      runLength = 0;
    }
    runLength++;
    lastChar = char;
  }

  return (compressed.length < str.length) ? compressed : str;
}

console.log(countCompress('aab'));
console.log(countCompress('aaaabb'));
console.log(countCompress('cdaaaabbb'));
