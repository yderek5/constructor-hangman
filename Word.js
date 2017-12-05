var Letter = require('./letter.js');

var Word = function(word){
  this.numGuesses = 15;
  this.guesses = [];
  this.LettersArr = this.setupWord(word);
};

Word.prototype.setupWord = function(word){
  var letters = word.split('');
  var letterArr = [];
  letters.forEach(function(letter, index, arr){
    var tempLetter = new Letter(letter);
    letterArr.push(tempLetter);
  });
  return letterArr;
};

Word.prototype.printWord = function(){
  var outputString = "";
  this.LettersArr.forEach(function(letter){
     outputString += letter.display + " ";
  });
  console.log(outputString);
};

Word.prototype.printGuesses = function(){
  var outputString = "";
  this.guesses = this.guesses.sort();
  this.guesses.forEach(function(guess){
    outputString += guess + " ";
  });
  console.log(outputString);
};

Word.prototype.checkGuess = function(guess){
  if (!this.guesses.includes(guess.toUpperCase())){
    this.guesses.push(guess.toUpperCase());
    this.numGuesses--;
    this.LettersArr.forEach(function(letter){
      letter.checkLetter(guess);
    });
  }
};

Word.prototype.wordSolved = function(){
  var solved = true;
  this.LettersArr.forEach(function(letter){
    if (!letter.guessed){
      solved = false;
    }
  });
  return solved;
};

Word.prototype.printState = function(){
  console.log("Word: ");
  this.printWord();
  console.log("Guesses: ");
  this.printGuesses();
  console.log ("Guesses Remaining: " + this.numGuesses);
};
module.exports = Word;