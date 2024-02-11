This game has been inspired by Ben Orlin **https://mathwithbaddrawings.com/wp-content/uploads/2020/06/game-5-dandelions-1.pdf**
Visit all his great work on **https://mathwithbaddrawings.com/** 

# Dandelion vs Wind
Dandelion vs Wind is a simple, interactive game where two players, 'Dandelion' and 'Wind', take turns to fill a 5x5 grid.

**How to Play**
The game starts with the 'Dandelion' player's turn.
'Dandelion' can place a flower on any empty cell on the grid.
After 'Dandelion' places a flower, it's 'Wind's' turn.
'Wind' can choose a direction (up, down, left, or right) to spread seeds from each flower on the board to all empty cells in the chosen direction.
The game continues until all cells are filled with flowers or seeds, or until 7 rounds have been played.
If after 7 rounds not all fields of the grid are covered with flowers or seeds, the player 'Dandelion' wins.

**Normal Mode**: In this mode, the "Dandelion" player places a dandelion on an empty cell. The "Wind" player then chooses a direction (up, down, left, right, or any of the four diagonals) and all dandelions spread their seeds in that direction. The seeds can travel over other seeds or flowers, but they cannot travel over obstacles. The game ends when all cells contain a flower, or when there are no more possible moves for the "Wind" player. The "Dandelion" player wins if the game ends during their turn, otherwise the "Wind" player wins.

**Expert Mode**: This mode is similar to Normal mode with two additional rules: 
- A seed becomes a flower if it is hit by another seed. This adds an extra layer of complexity to the game as players need to strategize their moves to hit seeds and turn them into flowers.
- The grids available in Expert Mode also come with randomly generated obstacles that stop the spread of seeds.

**Obstacles**: These are elements on the grid that neither seeds nor dandelions can occupy or move through. When the "Wind" player chooses a direction, the seeds spread in that direction but stop when they encounter an obstacle. This means that the "Wind" player needs to choose the direction carefully, taking into account the positions of the obstacles, to maximize the spread of the seeds. The number of obstacles varies based on the grid size:

- 7x7 grid: 1 obstacle
- 10x10 grid: 2 obstacles
- 15x15 grid: 3 obstacles




# Code Structure
The code for Dandelion vs Wind is structured into three main parts:

**HTML**: The HTML code defines the structure of the game, including the game board, the direction buttons, and the player turn indicator.

**CSS**: The CSS code styles the game, including the game board, the cells, and the direction buttons. It also ensures that the game board and the information container always fit on one screen.

**JavaScript**: The JavaScript code controls the game logic, including placing flowers, spreading seeds, switching players, and checking if the game is over. It also updates the user interface to reflect the current state of the game.
