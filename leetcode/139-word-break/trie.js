/**
 * Uses:
 * - a trie to minimize split attempts,
 * - a memoization table (increasing suffixes) to reduce duplicate work,
 * - a slice data structure to encapsulate constant time read only substrings.
 * @param {string} s
 * @param {set<string>} wordDict
 *   Note: wordDict is a Set object, see:
 *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
 * @return {boolean}
 * Ideas:
 *   - for every subset of split indicies, check if the resulting splits are valid words.
 *   - Build a trie of words?
 *   - use a trie to optimize splits?
 *   - use DP from the end to build up answers from shorter strings?
 */
var wordBreak = function(s, wordDict) {
    let wordBreakN = []; // Table that answers, is there a word-break for the length=n suffix;
    let str = new Slice(s); // slice read-only substring in constant time
    let rootTrie = new Trie();
    for (let w of wordDict.values()) {
        rootTrie.add(w);
    }

    function walk(slice, t) {
        // End of the string
        if(slice.isEmpty()) {
            return t.hasEnd();
        }
        let c = slice.get(0);

        // Start a new word
        if(t.hasEnd() && wordBreakN[s.length - slice.size()]) { return true; }

        // Continue this word
        if(t.has(c) && walk(slice.slice(1), t.get(c))) { return true; }

        // No matching words down this path
        return false;
    }

    for(let i=str.size()-1; i>=0; i--){
        wordBreakN[i] = walk(str.slice(i), rootTrie);
    }
    return wordBreakN[0];
};

class Trie {
    constructor() {
        this.edges = {};
        this.end = false;
    }

    add(s) {
        if(!s.length) {
            this.end = true;
            return;
        }
        let c = s[0];
        if(!this.edges[c]) {
            this.edges[c] = new Trie();
        }
        this.edges[c].add(s.slice(1));
    }

    has(c) {
        return !!this.edges[c];
    }

    hasEnd() {
        return this.end;
    }

    get(c) {
        return this.edges[c];
    }
}

class Slice {
    constructor(s, lo, hi)  {
        this.s = s;
        this.lo = lo || 0;
        this.hi = hi || s.length;
    }

    isEmpty() {
        return !this.size();
    }

    get(n) {
        return this.s[this.lo + n];
    }

    size() {
        return this.hi - this.lo;
    }

    slice(lo, hi) {
        if(hi == null) {
            hi = this.hi;
        } else {
            hi += this.lo;
        }
        lo += this.lo;
        return new Slice(this.s, lo, hi);
    }
}
