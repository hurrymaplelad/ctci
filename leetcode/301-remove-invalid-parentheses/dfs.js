/**
 * @param {string} s
 * @return {string[]}
 */

function removeInvalidParentheses (s) {
    let results = new Set();
    let closes = []; // candidates for deletion
    let opens = new Set();

    function search(i, deletes, closes, opens) {
        opens = new Set(opens);
        closes = closes.slice();

        if(i >= s.length) {
            // remove straggling opens
            results.add(del(s, deletes.concat(Array.from(opens))));
            return;
        }

        let c = s[i];
        if(c === '(') {
            opens.add(i);
            search(i+1, deletes, closes, opens);
        } else if (c === ')') {
            closes.push(i);
            if(!opens.size) {
                // unbalanced close
                // remove one of the preceeding closes
                while(closes.length) {
                    let close = closes.pop();
                    deletes.push(close);
                    search(i+1, deletes, closes, opens);
                    deletes.pop();
                }
            } else {
                // balance a preceeding open
                for(let open of new Set(opens)) {
                    opens.delete(open);
                    search(i+1, deletes, closes, opens);
                    opens.add(open);
                }
            }
        } else {
            search(i+1, deletes, closes, opens);
        }
    }

    search(0, [], closes, opens, opens);
    return Array.from(results);
}

/**
 * Returns a iterator over all `count` element subsets of s
 */
function* choose(s, count) {
    let path = [];

    function* walk(s, i) {
        if(path.length === count) {
            yield path.slice();
            return;
        }
        if(count - path.length > s.length - i) {
          return;
        }

        let el = s[i];
        path.push(el);
        yield* walk(s, i+1); // include
        path.pop();
        yield* walk(s, i+1); // don't include
    }

    yield* walk(s, 0);
}

/**
 * Apply a list of delete indicies to a string
 */
function del(s, deletes) {
    let deleted = s.split('');
    deletes = new Set(deletes);
    for(let i=s.length-1; i>=0; i--) {
        if(deletes.has(i)) {
            deleted[i] = '';
        }
    }
    return deleted.join('');
}
