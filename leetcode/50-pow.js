/**
 * Supports negative exponents, but not fractional exponents.
 * O(log(n)) runtime and space.
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function(x, n) {
    if(n < 0) return 1/myPow(x, -n);
    if(n === 0) return 1;
    if(n === 1) return x;
    if(n === 2) return x * x;
    return myPow(
        myPow(x, Math.floor(n/2)),
        2
    ) * (((n % 2) * x) || 1);
};
