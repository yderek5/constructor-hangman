var fs = require('fs');
var Word = require('./word.js');
var inq = require('inquirer');

var wordList = ['hi', 'hello', 'world', 'test'];

function startGame() {
  inq.prompt([
    {
      type: 'confirm',
      message: 'Are you ready to play?',
      name: 'confirm',
      default: true
    }
  ]).then(function(inqResponse) {
    if(inqResponse.confirm) {
      playGame();
    } else {
      console.log("Okay, see ya later!");
    }
  });
} // end of startGame

function playGame() {
  var word = new Word(wordList[Math.floor(Math.random() * wordList.length)]);
  console.log(word);
}
startGame();