let currentPlayer = null;
let clickCount = 0;
const tiles = document.querySelectorAll(".tile");
const winner = document.getElementById("winner");
const errorMessage = document.querySelectorAll(".errorMessage");
const playerOneLabel = document.getElementById("playerOne");
const playerTwoLabel = document.getElementById("playerTwo");
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
      score: null,
      turn: true,
      placements: [],
    },
    two: {
      team: "O",
      name: null,
      score: null,
      turn: false,
      placements: [],
    },
  },
};

//Initial State
tiles.forEach((element, i) => {
    element.addEventListener("click", e => playerSelection(e))
    element.index = i;
    element.textContent = "";
    element.clicked = false;
    errorMessageVisibility(false);

});

function beginPlaying() {
    if (!board.player.one.name || !board.player.two.name) {
        alert("Please enter names for both players.");
        errorMessageVisibility(true);
    return; // <-- This return statement exits the function here
}
    gameBoard.hidden = false;
  multiPurposeBtn.textContent = gameBoard.hidden ? "Start Game" : "Restart Game"; 
  if (!gameBoard.hidden) {
    errorMessageVisibility(false);
    scoreBoardFormat();
    restartGame();
    displayMessage("It's " + (board.player.one.turn ? board.player.one.name : board.player.two.name) +"'s turn."
       );
    };
};

function playerPlacements(player, index) {
  player.placements.push(index);
  // console.log("player one placements: ", board.player.one.placements);
  // console.log("player two placements: ", board.player.two.placements);
};

function nextPlayerTurn() {
  board.player.one.turn = !board.player.one.turn;
  board.player.two.turn = !board.player.two.turn;
};

function displayMessage(message) {
    winner.textContent = message;
    winner.classList.add("message");
    if (!message.includes("turn")) {
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

// Function to reset game state
function resetGameState() {
  clickCount = 0;
  board.player.one.placements = [];
  board.player.two.placements = [];
  currentPlayer = board.player.one;
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

function errorMessageVisibility(visible) {
    errorMessage.forEach((p) => {
        p.style.visibility = visible ? "visible" : "hidden"
    })
}

function scoreBoardFormat() {
    playerOneLabel.textContent = board.player.one.name;
    playerTwoLabel.textContent = board.player.two.name;
    playerOneLabel.style.marginRight = "1em";
    playerTwoLabel.style.marginRight = "1em";
    playerOneName.style.display = "none";
    playerTwoName.style.display = "none";
};

function keepingScore() {

}

function playerSelection(event) {
    currentPlayer = board.player.one.turn ? board.player.one : board.player.two;  //Is this returning board.player.two to be true?
    const index = event.target.index;
    console.log("current player: ", currentPlayer)
    if (!event.target.clicked) {
        event.target.textContent = currentPlayer.team; //This makes it an X or an O
        event.target.clicked = true;
        playerPlacements(currentPlayer, index);
        clickCount++;
        const result = checkForVictory();
        if (clickCount >= 5 && result) {
            if (result === "tie") {
                displayMessage("Y'all tied");
            } else {
                displayMessage(currentPlayer.name + " wins!");
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
        if (condition.every(element => currentPlayer.placements.includes(element))) {
            console.log(currentPlayer.team + " wins!")
            return currentPlayer.team;
        }
    }
    if (clickCount === 9) {
        console.log("tie");
        return "tie";
    }
};