var inq = require('inquirer');
var Word = require('./word.js');

var words = ['abductions', 'abridgment', 'admixtures',
  'afterglows', 'aftershock', 'algorithms', 'amplitudes',
  'bankruptcy', 'bolstering', 'boasting', 'champion',
  'clustering', 'clampdowns', 'compatible'
];
// start by picking a random word to play the game with
var startGame = function() {
  var word = new Word(words[Math.floor(Math.random() * words.length)]);
  playGame(word);
};
// then play the game
var playGame = function(word) {
  word.printState();
  inq.prompt(getLetter).then(function(answers) {
    word.checkGuess(answers.guess);
    if (word.wordSolved()) {
      console.log("\n***********************");
      console.log("Congratulations! You win!");
      word.printState();
      keepPlaying();
    } else if (word.numGuesses === 0) {
      console.log("\n**********************");
      console.log("Better luck next time...");
      console.log(word.printState());
      keepPlaying();
    } else {
      playGame(word);
    }
  });
};
// ask if user would like to play again
var playAgain = [{
  type: 'list',
  name: 'choice',
  message: 'Would you like to play again?',
  choices: ['Yes', 'No']
}];
// if they hit yes, start over again
var keepPlaying = function() {
  inq.prompt(playAgain).then(function(answers) {
    if (answers.choice === "Yes") {
      startGame();
    } else {
      console.log("Thanks for playing, come back soon!");
    }
  });
};
// this gets user input and validates it as a letter
var getLetter = [{
  type: 'input',
  name: 'guess',
  message: 'Pick a Letter: ',
  validate: function(value) {
    var re = /[a-z]/gi;
    if (value.length !== 1) {
      return 'Please enter one letter at a time.';
    }
    if (value.match(re)) {
      return true;
    } else {
      return 'Please enter a letter';
    }
  }
}];

startGame();