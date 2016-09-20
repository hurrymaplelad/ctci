/* Check if either player has won a tic tac toe board */
function findWinner(board) {
  let candidate;
  // check columns
  for(let col=0; col<board.length; col++) {
    candidate = board[col][0];
    if(candidate != '' &&
       candidate == board[col][1] &&
       candidate == board[col][2]) {
      return candidate;
    }
  }

  // check rows
  for(let row=0; row<board.size; row++) {
    candidate = board[0][row];
    if(candidate != '' &&
       candidate == board[1][row] &&
       candidate == board[2][row])
      return candidate;
  }

  // check diagonals
  candidate = board[0][0];
  if(candidate != null &&
     candidate == board[1][1] &&
     candidate == board[2][2]
  )
    return candidate;

  candidate = board[2][0];
  if(candidate != null &&
     candidate == board[1][1] &&
     candidate == board[0][2]
  )
    return candidate;

  // no winner
  return null;
}

// TODO: extract a function to decide if a tuple is a winning combo
