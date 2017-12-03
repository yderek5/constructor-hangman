var Letter = require('./letter.js');

var Word = function(word) {
  this.lettersGuessed = [];
  this.word = word;
  this.wordArr = function() {
    word = word.split('');
  };
};

module.exports = Word;