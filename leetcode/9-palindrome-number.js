/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    if(x < 0) {
        return false;
    }
    let len = length(x);
    for(let i=0; i < Math.floor(len/2); i++) {
        if(getDigit(x, i) !== getDigit(x, len-i-1)) {
            return false;
        }
    }
    return true;
};

function length(n) {
    let count = 0;
    while(n > 0) {
        n = Math.floor(n/10);
        count += 1;
    }
    return count;
}

// i is index from the LSD, 0 is LSD
function getDigit(n, i) {
    while(i > 0) {
        n = Math.floor(n/10);
        i--;
    }
    return n % 10;
}
