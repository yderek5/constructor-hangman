var fs = require('fs');
var Word = require('./word.js');
var inq = require('inquirer');

var wordList = ['hi', 'hello', 'world', 'test'];
// Pick a random word
var word = new Word(wordList[Math.floor(Math.random() * wordList.length)]);

function startGame() {
  // Ask user if they want to start the game
  inq.prompt([
    {
      type: 'confirm',
      message: 'Are you ready to play?',
      name: 'confirm',
      default: true
    }
  ]) // If 'yes' then play game
  .then(function(inqResponse) {
    if(inqResponse.confirm) {
      playGame();
    } // Otherwise say see ya
    else {
      console.log("Okay, see ya later!");
    }
  });
} // end of startGame

function playGame() {
  function pickRandomWord(word) {
    new Word(wordList[Math.floor(Math.random() * wordList.length)]);
    startGuessing();
  }
  function startGuessing() {
    var currentWord = word;
    console.log(currentWord);
    // Get input from user
    inq.prompt([
      {
        type: 'input',
        message: 'Pick a letter',
        name: 'guess'
      }
    ]).then(function(input) {
      if(currentWord.word.includes(input.guess)) {
        currentWord.guesses.push(input.guess);
        console.log("correct!");
          playGame();
        } else {
        console.log("sorry!");
        currentWord.guesses.push(input.guess);
        word.numOfGuesses -= 1;
        if(word.numOfGuesses === 0) {
          console.log("You Lose!");
          startGame();
        }
        playGame();
      }
    });
  }
  pickRandomWord();
} // End of playGame
startGame();