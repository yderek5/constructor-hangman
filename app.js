var fs = require('fs');
var Word = require('./word.js');
var inq = require('inquirer');
var Letter = require('./letter.js');

var wordList = ['hi', 'hello', 'world', 'test'];
// Pick a random word

function startGame() {
  // Ask user if they want to start the game
  inq.prompt([{
      type: 'confirm',
      message: '\nAre you ready to play?',
      name: 'confirm',
      default: true
    }]) // If 'yes' then play game
    .then(function(inqResponse) {
      if (inqResponse.confirm) {
        // Then play the game
        playGame();
      } // Otherwise say see ya
      else {
        console.log("Okay, see ya later!");
      }
    });
} // end of startGame

function playGame() {
  function startGuessing(word) {
    var currentWord = word;
    console.log(currentWord.word);
    console.log("Number of guesses: " + currentWord.numOfGuesses);
    console.log("Letters Guessed: " + currentWord.guesses);
    // Get input from user
    inq.prompt([{
      type: 'input',
      message: 'Pick a letter',
      name: 'guess'
    }]).then(function(input) {
      // If the guess matches the word letters
      if (currentWord.word.includes(input.guess)) {
        currentWord.guesses.push(input.guess);
        console.log("correct!");
        if (currentWord.guesses.join('') == currentWord.word) {
          console.log("You win!");
          startGame();
        } else {
          startGuessing(word);
        }
      } else {
        // If the guess doesn't match the word letters
        if (currentWord.guesses.includes(input.guess)) {
          console.log('You already guessed this!');
        } else {
          console.log("sorry!");
          currentWord.guesses.push(input.guess);
          // subtract 1 from numOfGuesses
          word.numOfGuesses -= 1;
        }
        // if you run out of guesses...
        if (word.numOfGuesses === 0) {
          console.log("You Lose!");
          startGame();
        } else {
          startGuessing(word);
        }
      }
    });
  }
  // First pick a random word
  startGuessing(new Word(wordList[Math.floor(Math.random() * wordList.length)]));
} // End of playGame
// start game by asking them if they would like to start
startGame();