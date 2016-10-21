/**
 * @param {number} n
 * @return {number}
 *
 * 1: 1
 * 2: 2 or 1+1
 * 3: 2+1 or 1+1+1
 *
 */
var climbStairs = function(n) {
    let memo = [1, 1, 2];
    for(let i=3; i<=n; i++) {
        memo[i] = memo[i-1] + memo[i-2];
    }
    return memo[n];
};
