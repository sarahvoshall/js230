document.addEventListener('DOMContentLoaded', () => {
  let form = document.querySelector('form');
	let addButton = document.querySelector('input[type=submit]');
  let groceryList = document.querySelector('ul');
  
  addButton.addEventListener('click', (e) => {
    e.preventDefault();

    let item = document.querySelector('#name').value;
    let quantity = document.querySelector('#quantity').value;

    let li = document.createElement('li');
    li.textContent = `${quantity || 1} ${item}`

    groceryList.appendChild(li);
    form.reset();
  });
});