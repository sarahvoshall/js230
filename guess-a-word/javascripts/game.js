'use strict'

var Game = {
  message: document.getElementById('message'),
  playAgain: document.getElementById('replay'),
  lettersGuessed: [],
  correctGuesses: [],
  incorrectGuesses: 0,
  apples: 6,

  randomWord: (() => {
    const words = ['apple', 'orange', 'banana'];

    return function() {
      const randomIndex = Math.floor(Math.random() * words.length);
      return words.splice(randomIndex, 1)[0];
    }
  })(),

  displayNoMoreWords() {
    this.message.textContent = 'Sorry, I ran out of words!';
    document.removeEventListener('keypress', this.keypress);
  },

  clearGame() {
    const guessesDiv = document.getElementById('guesses');
    const spacesDiv = document.getElementById('spaces');
    const guesses = document.querySelectorAll('#guesses span');
    const spaces = document.querySelectorAll('#spaces span');

    [...guesses].forEach(span => guessesDiv.removeChild(span));
    [...spaces].forEach(span => spacesDiv.removeChild(span));
  },

  reset() {
    this.message.textContent = '';
    this.lettersGuessed = [];
    this.incorrectGuesses = 0;
    this.correctGuesses = [];
    this.clearGame();
    this.resetApples();
    this.playAgain.removeEventListener('click', this.click);
  },

  resetApples() {
    document.getElementById('apples').classList.remove('guess_1');
    document.getElementById('apples').classList.remove('guess_2');
    document.getElementById('apples').classList.remove('guess_3');
    document.getElementById('apples').classList.remove('guess_4');
    document.getElementById('apples').classList.remove('guess_5');
    document.getElementById('apples').classList.remove('guess_6');
  },

  drawSpaces() {
    const spacesDiv = document.getElementById('spaces');
    for (let i = 0; i < this.word.length; i += 1) {
      var space = document.createElement('span');
      spacesDiv.appendChild(space);
    }
  },

  updateGuesses(letter) {
    this.lettersGuessed.push(letter);

    // update guesses blanks
    const guessesDiv = document.getElementById('guesses');
    var space = document.createElement('span');
    space.textContent = this.lettersGuessed.slice(-1);
    guessesDiv.appendChild(space);
  },

  wordComplete() {
    return this.word.every(letter => {
      return this.correctGuesses.includes(letter);
    });
  },

  removeApple() {
    document.querySelector(`#apples`).classList.remove(`guess_${this.incorrectGuesses}`);
    this.incorrectGuesses += 1;
    document.querySelector(`#apples`).classList.add(`guess_${this.incorrectGuesses}`);
  },

  updateGame(letter) {
    this.updateGuesses(letter);
    if (this.word.includes(letter)) {
      // update blanks
      this.correctGuesses.push(letter);
      const spaces = document.querySelectorAll('#spaces span');
      [...spaces].forEach((space, index) => {
        if (letter === this.word[index]) {
          space.textContent = letter;
        }
      });
    } else {
      this.removeApple()
    }

    if (this.wordComplete()) {
      this.winGame();
    } else if (this.incorrectGuesses === this.apples) {
      this.loseGame();
    }
  },

  winGame() {
    this.message.textContent = 'You won!';
    document.removeEventListener('keypress', this.keypress);
    this.playAgain.style.display = 'block';
  },

  loseGame() {
    this.message.textContent = 'You lost...';
    document.removeEventListener('keypress', this.keypress);
    this.playAgain.style.display = 'block';
  },

  keypressHandler(e) {
    if (e.key.match(/[a-z]/) && !this.lettersGuessed.includes(e.key)) {
      this.updateGame(e.key);
    }
  },

  clickHandler(e) {
    e.preventDefault();
    this.playAgain.style.display = 'none';
    this.init();
  }, 

  init() {
    this.word = this.randomWord();
    console.log(this.word);

    if (!this.word) {
      this.displayNoMoreWords();
    } else {
      this.word = this.word.split('');
      this.reset();
      this.drawSpaces();
      this.keypress = this.keypressHandler.bind(this);
      this.click = this.clickHandler.bind(this);
      document.addEventListener('keypress', this.keypress);
      this.playAgain.addEventListener('click', this.click);
    }
  }
};

// var Game = {
//   randomWord: (() => {
//     const words = ['apple', 'orange', 'banana'];

//     return function() {
//       const randomIndex = Math.floor(Math.random() * words.length);
//       return words.splice(randomIndex, 1)[0];
//     }
//   })(),

//   createSpaces() {
//     const spacesDiv = document.getElementById('spaces');
//     for (let i = 0; i < this.targetWord.length; i += 1) {
//       var space = document.createElement('span');
//       spacesDiv.appendChild(space);
//     }
//   },

//   updateGame(letter) {
//     this.lettersGuessed.push(letter);

//     // update spaces
//     if (this.targetWord.includes(letter)) {
//       this.correctGuesses.push(letter);
//       const spaces = document.querySelectorAll('#spaces span');
//       [...spaces].forEach((space, index) => {
//         if (letter === this.targetWord[index]) {
//           space.textContent = letter;
//         }
//       });
//     } else {
//       this.removeApple();
//     }
//     // update guesses
//     const guessesDiv = document.getElementById('guesses');
//     var space = document.createElement('span');
//     space.textContent = this.lettersGuessed.slice(-1);
//     guessesDiv.appendChild(space);
//   },

//   loseGame() {
//     alert('game over');
//     Game.init();
//   },

//   winGame() {
//     alert('you won!')
//     Game.init();
//   },

//   wordComplete() {
//     return this.targetWord.every(letter => {
//       return this.correctGuesses.includes(letter);
//     });
//   },

//   removeApple() {
//     document.querySelector(`#apples`).classList.remove(`guess_${this.incorrectGuesses}`);
//     this.incorrectGuesses += 1;

//     if (this.incorrectGuesses === this.apples) {
//       this.loseGame();
//     }

//     document.querySelector(`#apples`).classList.add(`guess_${this.incorrectGuesses}`);
//   },

//   reset() {
//     document.removeEventListener('keyup', () => {});

//     const guessesDiv = document.getElementById('guesses');
//     const spacesDiv = document.getElementById('spaces');
//     const guesses = document.querySelectorAll('#guesses span');
//     const spaces = document.querySelectorAll('#spaces span');

//     [...guesses].forEach(span => guessesDiv.removeChild(span));
//     [...spaces].forEach(span => spacesDiv.removeChild(span));
//   },

//   init() {
//     this.targetWord = this.randomWord().split('');
//     this.correctGuesses = [];
//     this.incorrectGuesses = 0;
//     this.lettersGuessed = [];
//     this.apples = 6;

//     this.reset();
//     this.createSpaces();

//     document.addEventListener('keyup', (e) => {
//       if ((/[a-zA-Z]/).test(e.key) && !this.lettersGuessed.includes(e.key)) {
//         this.updateGame(e.key);

//         if (this.wordComplete()) {
//           this.winGame();
//         }
//       }
//     });
//   },
// }

Game.init();