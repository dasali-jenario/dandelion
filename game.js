let board; // 2D array to represent the game board
let currentPlayer = 'dandelion'; // Variable to keep track of the current player
let usedDirections = []; // Array to store used directions
let gridSize = 5; // Default grid size
let isExpertMode = false;
let currentRound = 1;

window.onload = function() {
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
};

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
    currentPlayer = 'dandelion'; // Reset current player
    usedDirections = []; // Reset used directions
    currentRound = 1; // Reset current round
    resetDirectionButtons(); // Reset the direction buttons
    createGameBoard(); // Reset the game board
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
    board = new Array(gridSize).fill(0).map(() => new Array(gridSize).fill({state: 0, hits: 0}));
    usedDirections = []; // Reset used directions
    currentRound = 1; // Reset current round
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
    if (isExpertMode) {
        placeRandomObstacles();
    }
    renderBoard();
    updatePlayerTurn();
    updateCurrentRound();
    resetDirectionButtons();
}

function placeRandomObstacles() {
    let numObstacles;
    switch (gridSize) {
        case 7:
            numObstacles = 1;
            break;
        case 10:
            numObstacles = 2;
            break;
        case 15:
            numObstacles = 3;
            break;
        default:
            numObstacles = 0;
    }

    for (let i = 0; i < numObstacles; i++) {
        let row, col;
        do {
            row = Math.floor(Math.random() * gridSize);
            col = Math.floor(Math.random() * gridSize);
        } while (board[row][col].state !== 0);
        board[row][col] = {state: 3, hits: 0}; // state 3 represents an obstacle
    }
}

function renderBoard() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = ''; // Clear the game board
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            if (board[i][j].state === 1) {
                cell.textContent = '🌱'; // Or use an image for seed
            } else if (board[i][j].state === 2) {
                cell.textContent = '🌼'; // Or use an image for flower
            } else if (board[i][j].state === 3) {
                cell.textContent = '🌳'; // Or use an image for obstacle
            }
            cell.addEventListener('click', () => placeDandelion(i, j));
            gameBoard.appendChild(cell);
        }
    }
}

    // Update the user interface to reflect the current state of the game board
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = ''; // Clear the game board
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            if (board[i][j].state === 1) {
                cell.textContent = '🌱'; // Or use an image for seed
            } else if (board[i][j].state === 2) {
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


    function placeDandelion(row, col) {
        if (currentPlayer === 'dandelion' && board[row][col].state === 0) {
            board[row][col] = {state: 2, hits: 0};
            renderBoard();
            switchPlayer();
        }
    }

    function chooseWindDirection(event) {
        // Player 'wind' chooses the wind direction
        const direction = event.target.dataset.dir.split(',').map(Number);
        const directionString = direction.toString(); // Convert the direction array to a string for comparison
        if (usedDirections.includes(directionString)) {
            alert('This direction has already been used!');
            return;
        }
        usedDirections.push(directionString);
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
                if (board[i][j].state === 2) { // If the cell contains a dandelion
                    let newRow = i + direction[0];
                    let newCol = j + direction[1];
                    while (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize && newBoard[newRow][newCol].state !== 3) {
                        if (newBoard[newRow][newCol].state === 0 || newBoard[newRow][newCol].state === 1) { // If the cell is empty or contains a seed
                            newBoard[newRow][newCol] = {state: 1, hits: newBoard[newRow][newCol].hits + 1}; // Spread a seed to the cell
                            if (isExpertMode && newBoard[newRow][newCol].hits === 2) { // If the seed is hit for the second time and the game is in Expert mode
                                newBoard[newRow][newCol].state = 2; // Turn it into a flower
                            }
                        }
                        newRow += direction[0];
                        newCol += direction[1];
                    }
                }
            }
        }
        board = newBoard; // Update the board
    }

function checkGameOver() {
    // Check if all cells contain a flower
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (board[i][j].state !== 2) {
                return false;
            }
        }
    }

    // Check if there are any more possible moves for the 'wind' player
    const directions = [
        [-1, 0], [1, 0], [0, -1], [0, 1],
        [-1, -1], [-1, 1], [1, -1], [1, 1]
    ];
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (board[i][j].state === 2) {
                for (let direction of directions) {
                    let newRow = i + direction[0];
                    let newCol = j + direction[1];
                    while (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize) {
                        if (board[newRow][newCol].state === 0 || board[newRow][newCol].state === 1) {
                            return false;
                        }
                        newRow += direction[0];
                        newCol += direction[1];
                    }
                }
            }
        }
    }

    return true;
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'dandelion' ? 'wind' : 'dandelion';
    document.getElementById('playerTurn').textContent = `Current Player: ${currentPlayer}`;
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
    document.getElementById('currentRound').textContent = `Current Round: ${currentRound}`;
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
    // Set the data-dir attribute based on the button's id
    switch (button.id) {
        case 'up':
            button.dataset.dir = '-1,0';
            break;
        case 'down':
            button.dataset.dir = '1,0';
            break;
        case 'left':
            button.dataset.dir = '0,-1';
            break;
        case 'right':
            button.dataset.dir = '0,1';
            break;
        // Add cases for diagonal directions if needed
    }
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