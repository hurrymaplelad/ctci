/*
 Replace all spaces with %20
*/

function escapeSpaces(str, len) {
  // Count spaces
  let spaceCount = 0;
  for(let char of str.slice(0, len)) {
    if(char === ' ') {
      spaceCount++;
    }
  }

  // Work back from the end of the string, shifting when we
  // encounter a space.
  for(let k = len - 1; k >= 0; k--) {
    let destI = spaceCount * 2 + k;
    if(str[k] === ' ') {
      str[destI] = '0';
      str[destI-1] = '2';
      str[destI-2] = '%';
      spaceCount--;
    } else {
      str[destI] = str[k];
    }
  }
}

// Less space efficient, much simpler.
function escapeSpacesAlt(str, len) {
  let escaped =  str.slice(0, len)
    .join('')
    .split(' ')
    .join('%20')
    .split('');

  str.splice(0, escaped.length, ...escaped);
}

let str = ''.split('');
console.log(str);
escapeSpaces(str, 0);
console.log(str);

str = 'a'.split('');
console.log(str);
escapeSpaces(str, 1);
console.log(str);

str = '   '.split('');
console.log(str);
escapeSpaces(str, 2);
console.log(str);

str = 'Mr John Smith    '.split('');
console.log(str);
escapeSpaces(str, 13);
console.log(str);
