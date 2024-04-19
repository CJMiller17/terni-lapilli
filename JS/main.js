/* 
--- Must Have ---
Create game times that are clickable only once.
Display winner or if there was a tie.
Alternate turns, placing an O or an X.
*/
let currentPlayer = null;
let clickCount = 0;
const tiles = document.querySelectorAll(".tile");
const winner = document.getElementById("winner");
const multiPurposeBtn = document.getElementById("multiPurposeBtn");
    multiPurposeBtn.addEventListener("click", beginPlaying);
const board = {
  state: null,
  hidden: false, /////////////////////////////////////////////////////
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
});

function beginPlaying() {
    gameBoard.hidden = false;  /////////////////////////////////////////////////////
  multiPurposeBtn.textContent = gameBoard.hidden ? "Start Game" : "Restart Game"; 
  if (!gameBoard.hidden) {
    restartGame();
    displayMessage("It's " + (board.player.one.turn ? board.player.one.team : board.player.two.team) +"'s turn."
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
                displayMessage(currentPlayer.team + " wins!");
            }
            disableTiles();
        } else {
            nextPlayerTurn();
            displayMessage("It's " + (board.player.one.turn ? board.player.one.team : board.player.two.team) + "'s turn.");
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

//Here is how I plan on 

// const isSubset = (array1, array2) =>
//   array2.every((element) => array1.includes(element));

// console.log(isSubset([1, 2, 3, 4, 5, 6, 7], [5, 7, 6])); // true
// console.log(isSubset([1, 2, 3, 4, 5, 6, 7], [5, 8, 7])); // false




// gameBoard.attributeStyleMap(hidden, gameBoard.hidden)
/*

/*
Place a piece on a time.
Enter a name.
Update the score.
Restart the game.
Winner message.
*/

/* 
--- Should Have ---
Display players turn.
Restart button that doesn't refresh the page.
*/

/*
--- Could Have ---
Allow players to enter their names.
Keep track of the number os games won by X and won by O.
Save the information into local storage.
Add a link to the rules.
Selectable themes.
Randomize who goes first.
Drag and Drop.
One player mode.
    -- Loader that simulates thinking.
Comment Bubble the generates trask talk or encouraging.
*/

/*
--- Wish List ---
Turn the game into Connect Four.
Recreate Go.
*/
