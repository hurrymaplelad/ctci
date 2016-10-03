/**
 * @param {string} s
 * @return {number}
 *  I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, M = 1,000
 * Ex:
 *  III = 3
 *  IV = 4
 *  VI = 5
 *  XIV = 14
 *  XCIX = 99
 */
const VALUES = {
    'M': 1000,
    'D': 500,
    'C': 100,
    'L': 50,
    'X': 10,
    'V': 5,
    'I': 1
}

/* Read right to left */
var romanToIntRTL = function(s) {
    if(!s || s.length < 1) {
        return 0;
    }
    let values = s.split('').map((c) => VALUES[c]);
    let term = values[values.length-1];
    let total = term;
    for(let i=values.length-2; i>=0; i--) {
        if(values[i] < term) {
            total -= values[i];
        } else {
            total += values[i];
        }
        term = values[i];
    }
    return total;
};

/* Read left to right, with 1 lookback */
var romanToInt = function(s) {
    if(!s || s.length < 1) {
        return 0;
    }
    let total = 0;
    let prev = Number.POSITIVE_INFINITY;
    for(let l of s) {
        let v = VALUES[l];
        if(v > prev) {
            total += v - prev;
            prev = Number.POSITIVE_INFINITY;
        } else {
            if(prev != Number.POSITIVE_INFINITY) {
                total += prev;
            }
            prev = v;
        }
    }
    if(prev != Number.POSITIVE_INFINITY) {
        total += prev;
    }

    return total;
};
