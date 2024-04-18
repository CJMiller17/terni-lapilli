/* 
--- Must Have ---
Create game times that are clickable only once.
Display winner or if there was a tie.
Alternate turns, placing an O or an X.
*/
const tiles = document.querySelectorAll(".tile");
const winner = document.getElementById("winner");
const multiPurposeBtn = document.getElementById("multiPurposeBtn");
const gameBoard = document.getElementById("gameBoard");
//gameBoard.classList.toggle("d-none")


tiles.forEach((element, i) => {
    element.addEventListener("click", e => playerSelection(e))
    element.index = i;
    element.textContent = "";
});

function playerSelection(event) {
    console.log(event.target.index);
    const currentPlayer = board.player.one.turn ? board.player.one : board.player.two;
    const index = event.target.index;
    console.log("current player: ", currentPlayer)
    event.target.textContent = currentPlayer.team;
    playerPlacements(currentPlayer, index);
    nextPlayerTurn();
};

function playerPlacements(player, index) {
    player.placements.push(index);
    console.log("player one placements: ", board.player.one.placements);
    console.log("player two placements: ", board.player.two.placements);
}

function nextPlayerTurn() {
    board.player.one.turn = !board.player.one.turn;
    board.player.two.turn = !board.player.two.turn;
}

console.log(tiles);

const victory = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

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

//Here is how I plan on 

// const isSubset = (array1, array2) =>
//   array2.every((element) => array1.includes(element));

// console.log(isSubset([1, 2, 3, 4, 5, 6, 7], [5, 7, 6])); // true
// console.log(isSubset([1, 2, 3, 4, 5, 6, 7], [5, 8, 7])); // false




// gameBoard.attributeStyleMap(hideen, gameBoard.hidden)
/*
-- Functions --
Start the game - Generate the board.
*/
// function initialize() {
//     tiles.forEach(tiles => tiles.textContent = "");
//     multiPurposeBtn.textContent("Start Game");
//     gameBoard.setAttribute(hidden, true);
//  }

// function startGame() {

// }


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
//initialize();

// console.log("test: ", gameBoard.children[0].children[0].textContent = "X");
// gameBoard.state = null;

// fn() => gameBoard.state = "one"

// gameBoard.something[0].true;

// console.log(gameBoard.children.array.forEach(element => {
//     console.log(element)
    
// }
// ))
// console.log("game board: ", gameBoard.children.forEach(x => {
//     x.children.forEach(gC => {
//         console.log(gC)
//         gC.xOrYValue = 0;
//         coordinates.push(gC);
//     })
// }))