/**
 * This is overkill. The double-tries version has
 * the same runtime complexity with much less space.
 * Kept for posterity. Suffix tries are interesting.
 * @param {string[]} words
 * @return {number[][]}
 */
var palindromePairs = function(words) {
  let results = [];
  // Build suffix tree, add all strings & suffixes
  let suffixTrie = new TrieNode();
  let prefixTrie = new TrieNode();
  words.forEach((w, i) => {
      suffixTrie.addWithAllSuffixes(w, i);
      prefixTrie.addWithAllSuffixes(reverse(w), i);
  });

  function check(i, j) {
      if(i == j) { return; }
      let first = words[i]; second = words[j];
      console.log('checking', first, second, isPalindrome(first+second));
      if(isPalindrome(first+second)) {
          results.push([i,j]);
      }
  }

  // For each string:
  words.forEach((w, i) => {
    let r = reverse(w);

    // walk prefixes
    let ends = suffixTrie.walk(r);
    // String consumed.
    // Any suffixes ending here are potential seconds, as long as their prefixes are palindromes.
    for(let end of ends) {
        check(i, end);
    }

    // walk suffixes
    ends = prefixTrie.walk(w);
    // String consumed.
    // Any prefixes ending here are potential firsts, as long as their suffixes are palindromes.
    for(let end of ends) {
        // skip pairs of equal length, we've already added them in the suffix pass
        if(words[i].length != words[end].length) {
            check(end, i);
        }
    }
  });
  return results;
};

function isPalindrome(s) {
    if(s.length < 2) {
        return true;
    }
    return (s[0] === s[s.length-1]) && isPalindrome(s.slice(1,-1));
}

function reverse(s) {
    return s.split('').reverse().join('');
}

class TrieNode {
    constructor() {
        this.edges = {};
        this.ends = [];
    }

    add(s, id) {
        if(!s.length) {
            this.ends.push(id);
            return;
        }
        let c = s[0];
        if(!this.edges[c]) {
            this.edges[c] = new TrieNode();
        }
        this.edges[c].add(s.slice(1), id);
    }

    addWithAllSuffixes(s, id) {
        for(let i=0; i<=s.length; i++) {
            this.add(s.slice(i), id);
        }
    }

    has(c) {
        return !!this.edges[c];
    }

    get(c) {
        return this.edges[c];
    }

    walk(s) {
        let node = this;
        for(let c of s){
            if(!node.has(c)) {
                return [];
            }
            node = node.get(c);
        }
        return node.ends;
    }
}
