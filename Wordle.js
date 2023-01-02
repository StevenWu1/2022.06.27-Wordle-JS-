// MISC GLOBAL VARIABLES ///////////////////////////////////

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const allowRepeatLetters = false;
let gameNumber;
let wordList;

// THE GAME STATE OBJECT ///////////////////////////////////

let gameState;

// SETUP ///////////////////////////////////////////////////
// You shouldn't need to modify this.

function setup() {
  // The words array is defined in words.js
  simpleWords = words.filter(isSimpleWord);
  console.log(
    `Hello, worldle!`,
    `${words.length} words loaded`,
    `(${simpleWords.length} are simple)`
  );
  wordList = allowRepeatLetters ? words : simpleWords;

  noCanvas();
  initGameState();

  // Focus the canvas, rather than the codebox, upon Run.
  // NOTE: Remove this if you prefer.
  this.focus();
}

function isSimpleWord(word) {
  for (let i = 0; i < word.length; i++) {
    if (word.slice(i + 1).indexOf(word[i]) !== -1) {
      return false;
    }
  }
  return true;
}

function initGameState() {
  if (gameNumber === undefined) {
    gameNumber = round(random(wordList.length - 1));
  }
  const goalWord = wordList[gameNumber];
  console.log(`gameNumber = ${gameNumber}, goalWord = ${goalWord}`);
  if (!allowRepeatLetters && !isSimpleWord(goalWord)) {
    console.log("ERROR: How did a non-simple word get chosen ?!?");
  }

  gameState = {
    goalWord: goalWord,
    gameOver: false,
    currentGuess: [],
    checkGuess: "",
    numberOfGuesses: 0,
  };

  displayMessage("Good luck!");
}

// EVENTS ////////////////////////////////////////////////////////////
// You shouldn't need to modify this.

function keyPressed() {
  keyOrButtonPressed(key);
}

// "MAIN" FUNCTION ///////////////////////////////////////////////////

function keyOrButtonPressed(theKey) {
  if (!gameState.gameOver) {
    theKey = theKey.toUpperCase();
    // TODO: You will probably add code here.

    if (alphabet.indexOf(theKey) !== -1) {
      let row =
        document.getElementsByClassName("row")[gameState.numberOfGuesses];
      let box = row.children[gameState.currentGuess.length];
      box.textContent = theKey;
      gameState.currentGuess.push(theKey);
      if (gameState.currentGuess.length > 5) {
        gameState.currentGuess.pop();
      }
    } else if (theKey === "BACKSPACE" || theKey === "DELETE") {
      // TODO: Fill this in.
      gameState.currentGuess.pop(theKey);
      let row =
        document.getElementsByClassName("row")[gameState.numberOfGuesses];
      let box = row.children[gameState.currentGuess.length];
      box.textContent = "";
    } else if (theKey === "ENTER") {
      if (gameState.currentGuess.length === 5) {
        checkAnswer();
        colorCurrentGuess();
        gameState.currentGuess = [];
        gameState.checkGuess = "";
        gameState.numberOfGuesses = gameState.numberOfGuesses + 1;
      }
      // TODO: Fill this in.
    }
  }
}

function checkAnswer() {
  gameState.checkGuess =
    gameState.checkGuess +
    gameState.currentGuess[0] +
    gameState.currentGuess[1] +
    gameState.currentGuess[2] +
    gameState.currentGuess[3] +
    gameState.currentGuess[4];
  gameState.checkGuess = gameState.checkGuess.toLowerCase();
  if (gameState.checkGuess === gameState.goalWord) {
    displayMessage("Correct");
    gameState.gameover = true;
  } else {
    displayMessage("Incorrect. Try again.");
  }
}

// HELPER FUNCTIONS ////////////////////////////////////////////////////

function displayMessage(str) {
  display = document.getElementById("message-panel");
  display.textContent = str;
}

function isCurrentGuessInWordList() {
  // TODO: Fill this in, return a boolean.
}

function commitCurrentGuess() {
  colorCurrentGuess();

  // TODO: Fill this in.
}

function colorCurrentGuess() {
  // TODO: Fill this in.
  let wOrd = gameState.goalWord.toUpperCase();
  let n1 = wOrd.slice(0, 1);
  let n2 = wOrd.slice(1, 2);
  let n3 = wOrd.slice(2, 3);
  let n4 = wOrd.slice(3, 4);
  let n5 = wOrd.slice(4, 5);
  const checkArray = [n1, n2, n3, n4, n5];
  let row = document.getElementsByClassName("row")[gameState.numberOfGuesses];
  for (i = 0; i < 5; i++) {
    let box = row.children[i];
    box.style.backgroundColor = "grey";
    if (gameState.currentGuess[i] === wOrd[i]) {
      box.style.backgroundColor = "green";
    } else if (gameState.currentGuess[i] !== wOrd[i]) {
      for (j = 0; j < 5; j++) {
        if (gameState.currentGuess[i] === wOrd[j]) {
          box.style.backgroundColor = "yellow";
        }
      }
    }
  }
}

function restartWordle(){
  if (gameNumber === undefined) {
    gameNumber = round(random(wordList.length - 1));
  }
  const goalWord = wordList[gameNumber];
  
  gameState = {
    goalWord: goalWord,
    gameOver: false,
    currentGuess: [],
    checkGuess: "",
    numberOfGuesses: 0,
  };
}
