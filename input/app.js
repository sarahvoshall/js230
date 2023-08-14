document.addEventListener('DOMContentLoaded', event => {
  let content = document.querySelector('.content');
	let textField = document.querySelector('.text-field');
  let intervalId;

  document.addEventListener('click', event => {
    clearInterval(intervalId);
    intervalId = null;
    
    if (textField.classList.contains('focused')) {
      textField.classList.remove('focused');
      textField.classList.remove('cursor');
    }
  });

  textField.addEventListener('click', event => {
    event.stopPropagation();
    textField.classList.add('focused');

    if (!intervalId) {
        intervalId = setInterval(() => {
        textField.classList.toggle('cursor');
      }, 500); 
    }
  });

  document.addEventListener('keydown', event => {
    if (textField.classList.contains('focused')) {
      if (event.key === 'Backspace') {
        content.textContent = content.textContent.slice(0, -1);
      } else {
        content.textContent += event.key;
      }
    }
  });
});