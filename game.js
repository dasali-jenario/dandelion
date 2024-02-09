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
    renderBoard();
    switchPlayer();
  }
}

function switchPlayer() {
  // Switch to the other player
  currentPlayer = currentPlayer === 1 ? 2 : 1;
}

// Call createGameBoard to start the game
createGameBoard();