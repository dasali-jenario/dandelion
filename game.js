let board; // 2D array to represent the game board
let currentPlayer = 'dandelion'; // Variable to keep track of the current player
let usedDirections = []; // Array to store used directions
let gridSize = 5; // Default grid size
let isExpertMode = false;
let currentRound = 1;

// Add event listener to the mode switch button
const modeSwitch = document.getElementById('modeSwitch');
modeSwitch.addEventListener('click', () => {
    isExpertMode = !isExpertMode;
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.className = isExpertMode ? 'expert' : 'normal';
    document.getElementById('gridSizeOptions').style.display = isExpertMode ? 'block' : 'none';
    modeSwitch.textContent = isExpertMode ? 'Switch to Normal Mode' : 'Switch to Expert Mode';
    document.getElementById('mode').textContent = isExpertMode ? 'Expert Mode' : 'Normal Mode';
    if (isExpertMode) {
        gridSize = 7; // Set grid size to 7x7 in expert mode
    } else {
        gridSize = 5; // Reset grid size to 5x5 in normal mode
    }
    createGameBoard();
});

// Add event listeners to the grid size options
const gridSizeOptions = document.getElementsByName('gridSize');
gridSizeOptions.forEach(option => {
    option.addEventListener('change', () => {
        gridSize = parseInt(option.value);
        createGameBoard();
    });
});

function createGameBoard() {
    board = new Array(gridSize).fill(0).map(() => new Array(gridSize).fill(0)); // Initialize the game board
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = ''; // Clear the game board
    gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`; // Set the number of columns based on the grid size
    gameBoard.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`; // Set the number of rows based on the grid size
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.addEventListener('click', () => placeDandelion(i, j));
            gameBoard.appendChild(cell);
        }
    }
    renderBoard();
}

function renderBoard() {
    // Update the user interface to reflect the current state of the game board
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = ''; // Clear the game board
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            if (board[i][j] === 1) {
                cell.textContent = '🌱'; // Or use an image for seed
            } else if (board[i][j] === 2) {
                cell.textContent = '🌼'; // Or use an image for flower
            }
            cell.addEventListener('click', () => {
                if (currentPlayer === 'dandelion') {
                    placeDandelion(i, j);
                }
            });
            gameBoard.appendChild(cell);
        }
    }
}

function placeDandelion(row, col) {
    // Player 'dandelion' places a flower at the specified location, if it's empty or has a seed, and only when it's 'dandelion's' turn
    if (currentPlayer === 'dandelion' && board[row][col] !== 2) {
      board[row][col] = 2;
      renderBoard();
      switchPlayer();
    }
  }

function chooseWindDirection(event) {
    // Player 'wind' chooses the wind direction
    const direction = event.target.dataset.dir.split(',').map(Number);
    if (usedDirections.includes(event.target.dataset.dir)) {
        alert('This direction has already been used!');
        return;
    }
    usedDirections.push(event.target.dataset.dir);
    event.target.style.backgroundColor = 'red'; // Mark the used direction in red
    spreadSeeds(direction);
    renderBoard();
    if (checkGameOver()) {
        alert(`Player ${currentPlayer} wins!`);
        createGameBoard();
    } else {
        switchPlayer();
    }
}

function spreadSeeds(direction) {
  let newBoard = JSON.parse(JSON.stringify(board)); // Clone the board
  for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
          if (board[i][j] === 2) {
              let newRow = i + direction[0];
              let newCol = j + direction[1];
              while (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize) {
                  if (newBoard[newRow][newCol] === 0) { // Only spread seeds to empty cells
                      newBoard[newRow][newCol] = 1;
                  }
                  newRow += direction[0];
                  newCol += direction[1];
              }
          }
      }
  }
  board = newBoard;
}

function checkGameOver() {
  for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
          if (board[i][j] === 0) {
              return false;
          }
      }
  }
  return true;
}

function switchPlayer() {
  currentPlayer = currentPlayer === 'dandelion' ? 'wind' : 'dandelion';
  updatePlayerTurn();
  toggleDirectionButtons();
  if (currentPlayer === 'dandelion') {
      currentRound++;
      updateCurrentRound();
      if (currentRound > 7) {
          let emptyCount = 0;
          for (let i = 0; i < gridSize; i++) {
              for (let j = 0; j < gridSize; j++) {
                  if (board[i][j] === 0) {
                      emptyCount++;
                  }
              }
          }
          if (emptyCount > 0) {
              alert('Game over! Dandelion wins!');
              createGameBoard();
          }
      }
  }
}

function updateCurrentRound() {
    // Update the displayed current round
    const currentRoundElement = document.getElementById('currentRound');
    currentRoundElement.textContent = `Round ${currentRound}/7`;
}

function updatePlayerTurn() {
    // Update the displayed player turn
    const playerTurn = document.getElementById('playerTurn');
    playerTurn.textContent = `Current Player: ${currentPlayer}`;
}

function toggleDirectionButtons() {
    // Enable the direction buttons when it's 'wind's' turn and disable them when it's 'dandelion's' turn
    const directionButtons = document.querySelectorAll('.direction');
    directionButtons.forEach(button => {
      button.disabled = currentPlayer === 'dandelion';
    });
  }

function resetDirectionButtons() {
    // Reset the background color and disabled state of the direction buttons
    const directionButtons = document.querySelectorAll('.direction');
    directionButtons.forEach(button => {
        button.style.backgroundColor = '';
        button.disabled = false;
    });
}

// Call createGameBoard to start the game
createGameBoard();

// Add event listeners to the direction buttons
const directionButtons = document.querySelectorAll('.direction');
directionButtons.forEach(button => {
    button.addEventListener('click', chooseWindDirection);
});

// Add event listener to the restart button
const restartButton = document.getElementById('restartButton');
restartButton.addEventListener('click', () => {
  createGameBoard();
});

// Set initial mode to Normal
document.getElementById('mode').textContent = 'Normal Mode';

// Set initial grid size to 5x5
gridSize = 5;
createGameBoard();