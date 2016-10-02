/**
 * @param {number} n
 * @return {string}
 */
 /* Explanation:
    S   n
---------------
    A  1     = A + 0*26
    B  2     = B + 0*26
    C  3     = C + 0*26
    ⋮
    Z  26    = Z + 0*26
   AA  27    = A + A*26
   AB  28    = B + A*26
    ⋮
   ZY  701   = Y + Z*26
   ZZ  702   = Z + Z*26 + 0*26^2
  AAA  703   = A + A*26 + A*26^2
  AAB  704   = B + A*26 + A*26^2

         n   = d0 + d1*26 + d2*26^2

    We can find d0 by modding 26:
  (n-1)%26+1 = (d0-1)%26+1 = d0
    Note that for n = 26, d0 = 26

    Now we want to find d1:
    Divide by 26, then floor to eliminate d0, except when d0 == 26
    (n - d0)/26 = d1 + d2*26 + ... + di*26^(i-1)

    If we didn't subtract d0, we'd miscalculate when d0 = 26:
    Math.floor(n/26) = d0/26 + d1 + d2*26
                     =    1  + d1 + d2*26

    Note that we could also subtract 1 from the quotient after flooring when %26 = 0
    Or we could subtract 1 before dividing to acheive the same offset (only affects the floor when n%26 == 0).
 */
const A = 'A'.charCodeAt(0);
var convertToTitle = function(n) {
    let label = [];
    while(n > 0) {
        let char = (n - 1) % 26 + 1;
        label.push(char);
        n = Math.floor((n - char)/26);
    }
    return label.reverse().map(toLetter).join('');
};

function toLetter(n) {
    return String.fromCharCode(n - 1 + A);
}
