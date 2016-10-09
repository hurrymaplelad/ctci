/**
 * Operates on an array of characters in O(N) time, O(1) space.
 * @param {string} str
 * @returns {string}
 */
function reverseWords(str) {
    return _reverseWords(str.split('')).join('');
}

function _reverseWords(chars) {
    // Reverse the whole string
    reverse(chars);

    let spaceCount = 0;
    let wordCount = 0;
    for(let i=0; i<chars.length; i++) {
        // Consume spaces
        if(chars[i] === ' ') {
            spaceCount++;
            continue;
        }

        // Re-reverse a word
        let j; // word end index
        for(j=i; j<chars.length && chars[j] !== ' '; j++) {}
        j -= 1;
        reverse(chars, i, j);
        wordCount += 1;

        // Shift the word left to collapse extra space
        shiftLeft(chars, i, j, spaceCount - wordCount + 1);

        // Advance through the word
        i=j;
    }

    // Remove trailing space
    while(spaceCount > wordCount - 1) {
      spaceCount--;
      chars.pop();
    }

    return chars;
}

// In place reverse, both indicies inclusive
function reverse(chars, lo, hi) {
    lo = lo || 0;
    if(typeof hi === 'undefined') hi = chars.length - 1;
    while(lo < hi){
        tmp = chars[lo];
        chars[lo] = chars[hi];
        chars[hi] = tmp;
        lo++; hi--;
    }
}

// In place shift, both indicies inclusive
function shiftLeft(chars, start, end, offset) {
    for(let k=start-offset; k<=end-offset; k++) {
        chars[k] = chars[k+offset];
    }
    // Add a trailing space
    if(offset) {
      chars[end - offset + 1] = ' ';
    }
}

console.log(`"${reverseWords("the sky is blue")}"`);
console.log(`"${reverseWords(" 1")}"`);
console.log(`"${reverseWords("   a   b ")}"`);
