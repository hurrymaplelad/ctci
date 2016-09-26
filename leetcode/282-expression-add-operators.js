/**
 * Second pass, interate combinations in constant space.
 *
 * @param {string} num
 * @param {number} target
 * @return {string[]}
 */
const OPERATORS = ["*", "+", "-"];

 function initialInsertions(numInsertions) {
     var result = new Array(numInsertions);
     for (var i=0; i<numInsertions; i++) {
         result[i] = {
             operator: 0,
             index: i + 1
         }
     }
     return result;
 }

 function next(tokens, insertions) {
     var insertion;
     for(var i=0; i<insertions.length; i++) {
         insertion = insertions[i];
         // Advance an operator
         if(insertion.operator < OPERATORS.length - 1) {
             insertion.operator += 1;
             return insertions;
         }
         insertion.operator = 0;
     }

     for(i=0; i<insertions.length; i++) {
         insertion = insertions[i];
         // Advance an index
         if (
             (i < insertions.length -1 && insertion.index < insertions[i+1].index - 1) ||
             (i === insertions.length -1 && insertion.index < tokens.length - 1)
         ) {
             insertion.index += 1;
             return insertions;
         }
         insertions[i].index = i+1;
     }
     return null;
 }

 function applyInsertions(tokens, insertions) {
     for(var i=0; i<insertions.length; i++) {
         var insertion = insertions[i];
         tokens.splice(
             insertion.index + i,
             0,
             OPERATORS[insertion.operator]
        );
     }
     return tokens;
 }

 function addOperators(num, target) {
    const solutions = [];
    var insertions = [];
    var tokens = num;
    for (var numInsertions = 0; numInsertions < tokens.length; numInsertions++) {
        insertions = initialInsertions(numInsertions);
        while(insertions != null) {
            var expression = applyInsertions(tokens.split(''), insertions);
            if(evaluate(parse(expression.slice())) === target) {
                solutions.push(expression.join(''));
            }
            insertions = next(tokens, insertions);
        }
    }
    return solutions;
}

// (1 + (1+3))
// (2 * (3+4))
const times = {
  re: /(\d+)\*(\d+)/,
  replacer: function(_, lhs, rhs) {
    return parseInt(lhs, 10) * parseInt(rhs, 10);
  }
};
const arith = {
  re: /(\d+)([-+])(\d+)/,
  replacer: function(_, lhs, operator, rhs) {
    var left = parseInt(lhs, 10);
    var right = parseInt(rhs, 10);
    return operator === '+' ? left + right : left - right;
  }
};

// 1-2*3
// 1*2-3
function parse(tokens) {
    if(!(tokens && tokens.length)) {
        return expression;
    }
    var expression = parseIntTokens(tokens);

    while(t = tokens.shift()) {
      switch(t) {
        case '+':
        case '-':
            e = parseSum(t, tokens);
            e.left = expression;
            expression = e;
            continue;

        case '*':
            e = parseTimes(tokens);
            e.left = expression;
            expression = e;
            continue;
      }
    }
    return expression;
}

function isInt(t) {
    return t >= '0' && t <= '9';
}

function parseIntTokens (tokens) {
    result = 0;
    // Never match leading zeros
    if(tokens[0] === '0' && isInt(tokens[1])) {
        return {value: NaN}
    }
    while(isInt(tokens[0])) {
        var d = parseInt(tokens.shift(), 10);
        result *= 10;
        result += d;
    }
    return {value: result};
}

function parseSum (t, tokens) {
      return {
        operator: t,
        right: parseSumRight(tokens),
        left: null
    }
}

function parseSumRight (tokens) {
    var expression = parseIntTokens(tokens);
    while(t = tokens.shift()) {
      switch(t) {
        case '+':
        case '-':
            tokens.unshift(t);
            return expression;
        case '*':
            e = parseTimes(tokens);
            e.left = expression;
            expression = e;
      }
    }
    return expression;
}

function parseTimes(tokens) {
    return {
        operator: '*',
        right: parseIntTokens(tokens),
        left: null
    }
}

function evaluate(root) {
    if(root.value !== undefined) {
        return root.value;
    }

    var lv = evaluate(root.left),
        rv = evaluate(root.right);

    switch(root.operator) {
        case '+':
            return lv + rv;
        case '-':
            return lv - rv;
        case '*':
            return lv * rv;
    }
}
