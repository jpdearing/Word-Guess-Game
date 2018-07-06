//Add words to your word bank array for the user to guess.
var wordBank = [
    "mario",
    "sephiroth",
    "sonic",
    "alucard",
    "aloy",
    "kratos",
    "scorpion",
    "snake",
];

//Create variables and whatnot.
var chosenWord = "";
var letterBank = [];
var numBlanks = 0;
var underScore = [];
var wrongGuesses = [];
var winCount = 0;
var loseCount = 0;
var guessesLeft = 9;

//Create functions to call on as needed for actions.
function startGame() {

    guessesLeft = 9;
    chosenWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    letterBank = chosenWord.split("");
    numBlanks = letterBank.length;
    underScore = [];
    wrongGuesses = [];

    //Create the underscores for each letter in the chosenWord variable.
    for (var i = 0; i < numBlanks; i++) {
        underScore.push("_");
    }

    //Update scores
    document.getElementById("guesses-left").innerHTML = guessesLeft;
    document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");
    document.getElementById("word-blanks").innerHTML = underScore.join(" ");
}

//Determine whether or not the chosen letter is correct.
function letterCheck(letter) {
    var letterCorrect = false;

    //Check the chosenWord for the chosen letter.
    for (var i = 0; i < numBlanks; i++) {
        if (chosenWord[i] === letter) {
            letterCorrect = true;
        }
    }

    //Replace underScore with the correct letter at the corresponding [i] within chosenWord.
    if (letterCorrect) {
        for (i = 0; i < numBlanks; i++) {
            if (chosenWord[i] === letter) {
                underScore[i] = letter;
            }
        }
    } else {
        wrongGuesses.push(letter);
        guessesLeft--;
    }
}

//Create a new function to run for each letter chosen, and to update scores and whatnot.
function userLetterInput() {
    document.getElementById("guesses-left").innerHTML = guessesLeft;
    document.getElementById("word-blanks").innerHTML = underScore.join(" ");
    document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");

    if (letterBank.toString() === underScore.toString()) {
        winCount++;
        alert("Congratulations! You win!");
        document.getElementById("win-count").innerHTML = winCount;
        startGame();
    } else if (guessesLeft === 0) {
        loseCount++;
        alert("Booooooo! You lose!");
        document.getElementById("lose-count").innerHTML = loseCount;
        startGame();
    }
}

//Add a function to start the game.
startGame();

//Add a function for the user input.
document.onkeypress = function (event) {
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    letterCheck(letterGuessed);
    userLetterInput();
};