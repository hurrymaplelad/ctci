/**
 * @param {string} input
 * @return {number[]}
 */
 /*
 We're iterating all possible orders of operations.
 DF traversal?
 Can numbers be more than one digit?
 */

 /*
 Explore using a stack:
 2-1-1

 2
 21-
 21-1-
 211--

 2*3-4*5
 - - - -
 23*4-5*
 23*45-*
 234*-5*
 2345*-*


 2*3-4*5))) =
 2*3-4)*5)) =
 2*3)-4*5)) =
 2*3-4))*5) =
 2*3)-4)*5) =

 // after each rhs, we have the option to apply now or later
 2*3)-4*5)) = -14
 2*3-4*5

 2345*-*
 234*-5*

 2345*-*
 234*5-*
 234

 */

var diffWaysToCompute = function(input) {
    "use strict"
    let solutions = [];
    let tokens = input.split('');

    function apply(op, l, r) {
        switch(op) {
            case '+': return l + r;
            case '-': return l - r;
            case '*': return l * r;
        }
    }

    function walk (stack, ops tokenCursor) {
        console.log('w', stack, ops);
        if(tokenCursor === tokens.length) {
            while(ops.length > 0) {
                let r = stack.pop()
                let l = stack.pop()
                stack.push(apply(ops.pop(), l, r));
            }
            console.log('fin', stack[0])
            solutions.push(stack[0]);
            return;
        }

        let token = tokens[tokenCursor];
        if(!isDigit(token)) {
            ops.push(token);
            walk(stack.slice(), ops.slice(), tokenCursor+1);
        } else {

            stack.push(parseInt(token, 10));

            // apply any number of the operators we've seen but not used yet
            let s2 = stack.slice();
            walk(stack.slice(), ops.slice(), tokenCursor+1);
            while(ops.length > 0) {
                let r = s2.pop()
                let l = s2.pop()
                s2.push(apply(ops.pop(), l, r));
                walk(s2.slice(), ops.slice(), tokenCursor+1);
            }
        }
    }

    walk([parseInt(tokens[0], 10)], [], 1);
    return solutions;
};

function isDigit(c) {
    return '0' <= c && c <= '9';
}
