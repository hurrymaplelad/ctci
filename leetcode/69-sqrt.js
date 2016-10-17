/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
    if(x < 2) return x;
    let lo = 0, hi = x, guess = Math.floor(x / 2);
    while(lo < hi) {
        if(guess * guess > x) {
            hi = guess - 1;
        } else {
            lo = guess + 1;
        }
        guess = lo + Math.floor((hi - lo) / 2);
    }
    if(guess * guess > x) guess -= 1;

    return guess;
};
