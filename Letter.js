var Letter = function(letter){
  this.display = '_';
  this.letter = letter;
  this.guessed = false;
};

Letter.prototype.checkLetter = function(guess){
  if (guess.toLowerCase() === this.letter.toLowerCase()){
    this.display = this.letter;
    this.guessed = true;
  }
  return this.guessed;
};

module.exports = Letter;