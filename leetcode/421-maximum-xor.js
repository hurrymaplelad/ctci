/**
 * @param {number[]} nums
 * @return {number}
 *
 * 0100110
 * 1001001
 * 1110111
 *
 * 32 16 8 4 2 1
 *
 * 5:  00000101
 * 25:   011001
 * ^:    011100
 *
 *   0101
 *   0110
 *   0010
 */
var findMaximumXOR = function(nums) {
    let maxSoFar = 0;
    // Idea:
    // For each bit, msb to lsb:
    //  is there a number with it set and one without?
    //  -- if so, one of the results must have the bit set, one must not.
    function dfs(groupA, groupB, i) {
        let aPrime, bPrime, recursed;
        if(i < 0) {
            maxSoFar = Math.max(maxSoFar, groupA[0] ^ groupB[0]);
            return;
        }

        // Try a=1, b=0
        aPrime = groupA.filter(hasBitAtI(1, i));
        bPrime = groupB.filter(hasBitAtI(0, i));
        if(aPrime.length && bPrime.length) {
            recursed = true;
            dfs(aPrime, bPrime, i-1);
        }

        // Try a=0, b=1
        aPrime = groupA.filter(hasBitAtI(0, i));
        bPrime = groupB.filter(hasBitAtI(1, i));
        if(aPrime.length && bPrime.length) {
            recursed = true;
            dfs(aPrime, bPrime, i-1);
        }

        // All 0 or all 1
        if(!recursed) {
            dfs(groupA, groupB, i-1);
        }
    }

    let i=31, groupA, groupB;
    do {
        groupA = nums.filter(hasBitAtI(1, i));
        groupB = nums.filter(hasBitAtI(0, i));
        i--;
    } while (i >=0 && (!groupA.length || !groupB.length));
    if(!groupA.length || !groupB.length) return 0;
    dfs(groupA, groupB, i);
    return maxSoFar;
}

function hasBitAtI(bit, i) {
    return function(n) {
        return ((n >>> i) & 1) ^ (bit ^ 1);
    }
}
