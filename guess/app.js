document.addEventListener('DOMContentLoaded', () => {
	let answer;
  let guesses = 0;

  let form = document.querySelector('form');
  let input = document.querySelector('#guess');
  let link = document.querySelector('a');
  let paragraph = document.querySelector('p');

  function newGame() {
    answer = Math.ceil(Math.random() * 100);
    guesses = 0;
    paragraph.textContent = `Guess a number between 1 and 100.`;
  }

  form.addEventListener('submit', event => {
    event.preventDefault(); 

    let guess = parseInt(input.value, 10);
    let message;

    guesses += 1;

    if (guess === answer) {
      message = `You guessed it! It took ${guesses} guesses.`;
    } else if (guess > answer) {
      message = `My number is lower than ${guess}.`;
    } else if (guess < answer) {
      message = `My number is higher than ${guess}.`;
    }

    paragraph.textContent = message;
  });

  link.addEventListener('click', event => {
    event.preventDefault(); 
    newGame();
  });

  newGame();
});