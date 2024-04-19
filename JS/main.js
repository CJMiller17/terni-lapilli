let currentPlayer = null;
let clickCount = 0;
//QuerySelector has to be looped over. Was able to do forEach
const tiles = document.querySelectorAll(".tile");
const winner = document.getElementById("winner");
const errorMessage = document.querySelectorAll(".errorMessage");
const playerOneLabel = document.getElementById("playerOne");
const playerTwoLabel = document.getElementById("playerTwo");
const playerOneScore = document.getElementById("playerOneScore");
const playerTwoScore = document.getElementById("playerTwoScore");
const multiPurposeBtn = document.getElementById("multiPurposeBtn");
    multiPurposeBtn.addEventListener("click", beginPlaying);
const playerOneName = document.getElementById("playerOneName");
    playerOneName.addEventListener("input", function () {
      board.player.one.name = playerOneName.value;
    });
const playerTwoName = document.getElementById("playerTwoName");
    playerTwoName.addEventListener("input", function () {
      board.player.two.name = playerTwoName.value;
    });

const board = {
  state: null,
  hidden: false,
  player: {
    one: {
      team: "X",
      name: null,
      score: 0,
      turn: true,
      placements: [],
    },
    two: {
      team: "O",
      name: null,
      score: 0,
      turn: false,
      placements: [],
    },
  },
};

//Initial State
tiles.forEach((element, i) => {
    element.addEventListener("click", e => playerSelection(e))
    element.index = i; //Gives each div an index to be referred to 
    element.textContent = "";
    element.clicked = false; //Flag that helps prevent clicking later
    errorMessageVisibility(false);

});

function beginPlaying() {
    //Requires name inputs for players
    if (!board.player.one.name || !board.player.two.name) {
        alert("Please enter names for both players.");
        errorMessageVisibility(true);
    return; 
}
    gameBoard.hidden = false;
    //changing button text
  multiPurposeBtn.textContent = gameBoard.hidden ? "Start Game" : "Restart Game"; 
    if (!gameBoard.hidden) {
    errorMessageVisibility(false); //Removes error messages
    scoreBoardFormat();
    restartGame();
    displayMessage("It's " + (board.player.one.turn ? board.player.one.name : board.player.two.name) +"'s turn."
       );
    };
};

function playerPlacements(player, index) { //Keeps track of where player moved
  player.placements.push(index);
};

function nextPlayerTurn() {
  board.player.one.turn = !board.player.one.turn;
  board.player.two.turn = !board.player.two.turn;
};

function displayMessage(message) {
    winner.textContent = message;
    winner.classList.add("message");
    if (!message.includes("turn")) { //Changed size of message
        winner.style.fontSize = "4rem";
        disableTiles();
    } else {
        winner.style.fontSize = "1.5rem";
    };
};

function restartGame() {
  clearTiles();
  resetGameState();
  enableTiles();
}

// Function to clear tiles
function clearTiles() {
  tiles.forEach((tile) => {
    tile.textContent = "";
    tile.clicked = false;
  });
}

// Function to reset game state by emptying arrays
function resetGameState() {
  clickCount = 0;
  board.player.one.placements = [];
  board.player.two.placements = [];
  currentPlayer = board.player.one; //Makes player one the starting player
};

// Function to enable tiles
function enableTiles() {
  tiles.forEach((tile) => {
    tile.clicked = false;
    tile.addEventListener("click", playerSelection);
  });
};

// Function to disable tiles
function disableTiles() {
  tiles.forEach((tile) => {
    tile.clicked = true;
    tile.removeEventListener("click", playerSelection);
  });
};

//
function errorMessageVisibility(visible) {
    errorMessage.forEach((p) => {
        p.style.visibility = visible ? "visible" : "hidden"
    })
}

//Removes input field and styles some things
function scoreBoardFormat() {
    playerOneLabel.textContent = board.player.one.name;
    playerTwoLabel.textContent = board.player.two.name;
    playerOneLabel.style.marginRight = "1em";
    playerTwoLabel.style.marginRight = "1em";
    playerOneName.style.display = "none";
    playerTwoName.style.display = "none";
};

//Pulls info from the player object
function keepingScore() {
    currentPlayer.score = currentPlayer.score + 1;
    playerOneScore.textContent = `Score: ${board.player.one.score}`;
    playerTwoScore.textContent = `Score: ${board.player.two.score}`;
}

function playerSelection(event) {
    currentPlayer = board.player.one.turn ? board.player.one : board.player.two;  //Is this returning board.player.two to be true?
    const index = event.target.index;
    if (!event.target.clicked) {
        event.target.textContent = currentPlayer.team; //This makes it an X or an O
        event.target.style.color = currentPlayer.team === "X" ? "red" : "blue" //Makes X and O colors
        event.target.clicked = true; //Helps prevent clicking
        playerPlacements(currentPlayer, index);
        clickCount++; //
        const result = checkForVictory();
        if (clickCount >= 5 && result) { //Saves processing power with 5th click
            if (result === "tie") {
                displayMessage("Y'all tied");
            } else {
                displayMessage(currentPlayer.name + " wins!");
                keepingScore();
            }
            disableTiles();
        } else {
            nextPlayerTurn();
            displayMessage("It's " + (board.player.one.turn ? board.player.one.name : board.player.two.name) + "'s turn.");
        };
    };
};

function checkForVictory() {
    const victoryCondition = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    
    for (const condition of victoryCondition) {
        //Player placement array is compared to winning conditions by loose placement array against strict winning condition
        if (condition.every(element => currentPlayer.placements.includes(element))) {
            return currentPlayer.team;
        }
    }
    if (clickCount === 9) { //The draw condition happens after the true check
        return "tie";
    }
};