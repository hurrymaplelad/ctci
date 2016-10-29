/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function(num1, num2) {
    if(num2.length > num1.length) {
        let tmp = num2;
        num2 = num1;
        num1 = tmp;
    }
    let i=num1.length-1;
    let j=num2.length-1;
    let result = '';
    let carry = 0;
    while(j >= 0) {
        let digit = aToI(num1[i]) + aToI(num2[j]) + carry;
        carry = digit > 9 ? 1 : 0;
        digit = digit % 10;
        result = digit.toString() + result;
        i--; j--;
    }

    while(i >= 0) {
        let digit = aToI(num1[i]) + carry;
        carry = digit > 9 ? 1 : 0;
        digit = digit % 10;
        result = digit.toString() + result;
        i--;
    }

    if(carry) {
        result = carry + result;
    }

    return result;
};

const ZERO = '0'.charCodeAt('0');
function aToI(c) {
    return c.charCodeAt(0) - ZERO;
}
