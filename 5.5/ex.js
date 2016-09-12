/*
 Count the number of bit flips to convert int A to int B
*/

function countBitFlips(a, b) {
  let count = 0;
  let diff = a ^ b;
  for(let i=0; i<32; i++) {
    count += diff & 1;
    diff = diff >> 1;
  }
  return count;
}

function countBitFlipsV2(a,b) {
  let count = 0;
  let diff = a ^ b;
  while(diff) {
    diff = diff & (diff - 1);
    count += 1;
  }
  return count;
}

console.log(countBitFlips(29, 15));
console.log(countBitFlipsV2(-29, 15));

function printBinary(word) {
  result = "";
  for(let i = 0; i < 32; i++) {
    result += ((word >> i) & 1).toString();
  }
  return result.split('').reverse().join('');
}

console.log(printBinary(-29));
console.log(printBinary(15));
console.log(printBinary(0));
console.log(printBinary(-1)); //  Two's complement!
console.log(printBinary(1));
