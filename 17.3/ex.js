/* Count the number of trailing zeros in n! */

function countTrailingZeros(n) {
  let numZeros = 0;
  for(let i=5; i<=n; i=i*5) {
    numZeros += Math.floor(n/i);
  }
  return numZeros;
}

console.log(countTrailingZeros(26));
