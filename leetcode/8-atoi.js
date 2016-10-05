/**
 * @param {string} str
 * @return {number}
 * - Negative?
 * - Empty?
 * - Unicode?
 * - Overflow?
 * - Hex
 */

const MAX_VALUE = Math.pow(2,31) - 1;
var myAtoi = function(str) {
    let total = 0;
    let negative = false;
    let base = 10;

    // trim leading whitespace
    str = str.replace(/^\s+/, '');

    let i=0;
    if(str[0] === '-') {
        negative = true;
        i = 1;
    } else if(str[0] === '+') {
        i = 1;
    }
    if(str.slice(i,i+2) === '0x') {
        i += 2;
        base = 16;
    }

    for(; i<str.length; i++) {
        let c = str[i];
        value = cToI(c, base);
        if(isNaN(value)) break; // unrecognized char, return result so far
        total = total * base + value;
        // Detect overflow, relying on JS Number capacity exceeding MAX_VALUE
        if(total > MAX_VALUE) {
            return negative ? -MAX_VALUE-1 : MAX_VALUE;
        }
    }
    return negative ? -total : total;
};

const ZERO = '0'.charCodeAt(0);
const A = 'a'.charCodeAt(0)
function cToI(c, base) {
    if(/[0-9]/.test(c)) {
        return c.charCodeAt(0) - ZERO;
    }
    if(base <= 10) {
        return NaN;
    }
    c = c.toLowerCase();
    if(/[a-z]/.test(c)) {
        return c.charCodeAt(0) - A + 10;
    }
    return NaN;
}
