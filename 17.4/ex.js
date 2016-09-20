/* Find the max of two numbers without comparison */

function max(a, b) {
  let aIsNegative = isNegative(a);
  let bIsNegative = isNegative(b);
  let bMinusAIsNegative = isNegative(b-a);
  let differentSigns = (bIsNegative - aIsNegative) & 1;

  return (
    // if signB == signA, use sign of the difference
    (1-differentSigns) * (bMinusAIsNegative * a + (1-bMinusAIsNegative) * b)
    // if signB != signA, use signB
    // b < 0, a > 0, b-a < 0
    // b > 0, a < 0, b-a > 0
    + (differentSigns) * (bIsNegative * a + (aIsNegative) * b)
  );
}

function isNegative(x) {
  return (x >> 31) & 1;
}

console.log(max(3,4));
console.log(max(5,3));
console.log(max(-5,3));
console.log(max(-5,-3));
let maxInt32 = (1<<31) ^ -1;
console.log(max(maxInt32,-3));
