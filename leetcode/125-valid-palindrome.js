/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    let lo = 0; hi = s.length - 1;
    while(lo < hi) {
        if(ignore(s[lo])) { lo++; }
        else if(ignore(s[hi])) { hi--; }
        else if(s[lo].toLowerCase() !== s[hi].toLowerCase()) { return false; }
        else {lo++; hi--}
    }
    return true;
};

function ignore(c) {
    return !/[A-Za-z0-9]/.test(c);
}
