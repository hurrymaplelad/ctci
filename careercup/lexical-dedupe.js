/*
Given a string which only contains lowercase. You need delete
the repeated letters only leave one, and try to make the lexicographical
order of new string  is smallest.
 Ex:
 bcabc=> abc
 cbacdcbc => acdb

 https://www.careercup.com/question?id=5758790009880576
 */

 /*
  Idea:
   - scan the string, collecting the positions of each letter
   - for each letter in the language, choose one position and add it to all the permutations
     of the remaining letters.
      - when we've exhausted the language, build a string from collected positions, collapse empty slots, and compare to the smallest we've seen yet.

   Same idea, better description:
     - scan the string, collecting the positions of each letter
     - consider the trie formed by choosing a position for each letter at each level
     - run a dfs of the tree, accumulating the path. When we reach a leaf, convert the path to a string and compare with the smallest weve seen.
  */


  function lexicographicalMinDedupe(str) {
    let min = null;
    let posByChar = [];
    for(let i=0; i<26; i++) {
      posByChar[i] = [];
    }

    // Collect postions of each character
    for(let i=0; i<str.length; i++) {
      posByChar[hashChar(str[i])].push(i);
    }

    let compare = (str) => {
      if(min === null || str < min) {
        min = str;
      }
    }

    // DFS through the tree
    // each letter in the alphabet corresponds to a level
    // each position for that letter is a branch
    // we record the current path as a list of [alpha index, string index] tuples
    let walk = (strBuf, ai) => {
      if(ai >= 26) {
        return compare(stringify(strBuf));
      }
      let positions = posByChar[ai];

      // Skip letters that don't appear in the input
      if(!positions.length) {
        walk(strBuf, ai+1);
      } else {
        for(pos of positions) {
          strBuf.push([ai, pos]);
          walk(strBuf, ai+1);
          strBuf.pop();
        }
      }
    };

    walk([], 0);
    return min;
  }

  function hashChar(c) {
    return c.charCodeAt(0) - 'a'.charCodeAt(0);
  }

  function unhashChar(ai) {
    return String.fromCharCode('a'.charCodeAt(0) + ai);
  }

  function stringify(strBuf) {
    let sparseBuf = [];
    for(let [ai, i] of strBuf) {
      sparseBuf[i] = unhashChar(ai);
    }
    let result = "";
    for(char of sparseBuf) {
      if(char != null) {
        result += char;
      }
    }
    return result;
  }

  console.log(lexicographicalMinDedupe("bcabc"));
  console.log(lexicographicalMinDedupe("cdacdcbc"));

  // Runtime:
  //  Tree depth L (size of language).
  //  At most n branches on any level (can probably tighten this, at most n positions total, so only one level could have all n)
  // O(n^L paths), time to traverse all paths
  // O(L) space for recursive stack and path accumulator
