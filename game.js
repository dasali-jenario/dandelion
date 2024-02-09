let board; // 2D array to represent the game board
let currentPlayer; // Variable to keep track of the current player

function createGameBoard() {
  // Initialize the game board and the current player
  board = Array(5).fill().map(() => Array(5).fill(0));
  currentPlayer = 1;
  renderBoard();
}

function renderBoard() {
  // Update the user interface to reflect the current state of the game board
  const gameBoard = document.getElementById('gameBoard');
  gameBoard.innerHTML = ''; // Clear the game board
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      if (board[i][j] === 1) {
        cell.textContent = '🌼'; // Or use an image
      }
      cell.addEventListener('click', () => {
        if (currentPlayer === 1) {
          placeDandelion(i, j);
        } else {
          chooseWindDirection(i, j);
        }
      });
      gameBoard.appendChild(cell);
    }
  }
}

function placeDandelion(row, col) {
  // Player 1 places a dandelion at the specified location, if it's empty
  if (board[row][col] === 0) {
    board[row][col] = 1;
    renderBoard();
    switchPlayer();
  }
}

function chooseWindDirection(row, col) {
  // Player 2 chooses the wind direction
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]];
  for (let direction of directions) {
    let newRow = row + direction[0];
    let newCol = col + direction[1];
    if (newRow >= 0 && newRow < 5 && newCol >= 0 && newCol < 5 && board[newRow][newCol] === 1) {
      spreadSeeds(direction);
      break;
    }
  }
  renderBoard();
  if (checkGameOver()) {
    alert(`Player ${currentPlayer} wins!`);
    createGameBoard();
  } else {
    switchPlayer();
  }
}

function spreadSeeds(direction) {
  // Spread seeds from all dandelions to adjacent cells in the chosen direction
  let newBoard = JSON.parse(JSON.stringify(board)); // Clone the board
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (board[i][j] === 1) {
        let newRow = i + direction[0];
        let newCol = j + direction[1];
        if (newRow >= 0 && newRow < 5 && newCol >= 0 && newCol < 5) {
          newBoard[newRow][newCol] = 1;
        }
      }
    }
  }
  board = newBoard;
}

function checkGameOver() {
  // Check if the game is over (i.e., the board is filled)
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (board[i][j] === 0) {
        return false;
      }
    }
  }
  return true;
}

function switchPlayer() {
  // Switch to the other player
  currentPlayer = currentPlayer === 1 ? 2 : 1;
}

// Call createGameBoard to start the game
createGameBoard();