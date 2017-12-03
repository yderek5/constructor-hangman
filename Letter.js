var Letter = function(letter) {
  this.show = false;
  this.value = letter;
  this.display = function() {
    if(this.show) {
      return this.value;
    } else {
      return ('_');
    }
  };
};

module.exports = Letter;