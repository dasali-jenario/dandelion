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
      if (board[i][j] > 0) {
        cell.textContent = '🌼'; // Or use an image
      }
      cell.addEventListener('click', () => placeSeed(i, j));
      gameBoard.appendChild(cell);
    }
  }
}

function placeSeed(row, col) {
  // Place a seed at the specified location, if it's empty
  if (board[row][col] === 0) {
    board[row][col] = currentPlayer;
    spreadSeeds();
    renderBoard();
    if (checkWinCondition()) {
      alert(`Player ${currentPlayer} wins!`);
      createGameBoard();
    } else {
      switchPlayer();
    }
  }
}

function spreadSeeds() {
  // Spread seeds from all grown dandelions to adjacent cells
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]];
  let newBoard = JSON.parse(JSON.stringify(board)); // Clone the board
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (board[i][j] > 0) {
        for (let direction of directions) {
          let newRow = i + direction[0];
          let newCol = j + direction[1];
          if (newRow >= 0 && newRow < 5 && newCol >= 0 && newCol < 5) {
            newBoard[newRow][newCol] = currentPlayer;
          }
        }
      }
    }
  }
  board = newBoard;
}

function checkWinCondition() {
  // Check for a line of five grown dandelions in any direction
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]];
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (board[i][j] > 0) {
        for (let direction of directions) {
          let count = 0;
          for (let step = 0; step < 5; step++) {
            let row = i + direction[0] * step;
            let col = j + direction[1] * step;
            if (row >= 0 && row < 5 && col >= 0 && col < 5 && board[row][col] === currentPlayer) {
              count++;
            } else {
              break;
            }
          }
          if (count === 5) {
            return true;
          }
        }
      }
    }
  }
  return false;
}

function switchPlayer() {
  // Switch to the other player
  currentPlayer = currentPlayer === 1 ? 2 : 1;
}

// Call createGameBoard to start the game
createGameBoard();