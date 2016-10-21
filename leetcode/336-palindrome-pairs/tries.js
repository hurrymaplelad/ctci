/**
 * @param {string[]} words
 * @return {number[][]}
 * Evaluating runtime:
 *  M: # of input characters
 *  K: average word length
 *  W: # of words
 */
var palindromePairs = function(words) {
  let results = [];
  // Build a forward and reverse trie, add all strings
  let forwardTrie = new TrieNode();
  let reverseTrie = new TrieNode();
  words.forEach((w, i) => {     // O(M) # characters
      forwardTrie.add(w, i);
      reverseTrie.add(reverse(w), i);
  });

  function check(i, j) {       // O(K) # Average word length
      if(i == j) { return; }
      let first = words[i]; second = words[j];
      if(isPalindrome(first+second)) {
          results.push([i,j]);
      }
  }

  // Visitor is called once per completed word ids passed on the way down
  function walk(node, word, visitor) { // O(K + W)
    for(let end of node.ends) {
        visitor(end);
    }
    for(let c of word){
        if(!node.has(c)) { break; }
        node = node.get(c);
        for(let end of node.ends) {
            visitor(end);
        }
    }
  }

  // For each string:
  words.forEach((w, i) => {
    // Reversed words ending along w match a prefix of w, and may be a valid 2nd
    // if the remaining sufix is also a palindrome.
    walk(reverseTrie, w, (j) => check(i, j));

    // Words ending along reverse(w) match a suffix of the original w, and may be a valid 1st
    // if the remaining prefix is also a palindrome.
    walk(forwardTrie, reverse(w), (j) => {
        // Equal length words will match in both tries, only count them in the 1st one
        if(words[i].length != words[j].length) {
            check(j, i);
        }
    });
    // O(W(K+W)K) = O(KK + WW + WK + M) ~ quadratic
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

    has(c) {
        return !!this.edges[c];
    }

    get(c) {
        return this.edges[c];
    }
}
