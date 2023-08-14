let calculate = function(firstNumber, secondNumber, operator) {
	firstNumber = Number(firstNumber);
	secondNumber = Number(secondNumber);
	switch (operator) {
		case "+":
			return firstNumber + secondNumber;
			break;
		case "-":
			return firstNumber - secondNumber
			break;
		case "*":
			return firstNumber * secondNumber
			break;
		case "/": 
			return (firstNumber / secondNumber).toFixed(1);
			break;
	} 
}

// vanilla JS
// document.addEventListener('DOMContentLoaded', () => {
// 	let submit = document.querySelector('input[type=submit]');
// 	let firstNumber;
// 	let secondNumber;
// 	let operator;
// 	let result = document.querySelector('#result');

// 	submit.addEventListener('click', (e) => {
// 		e.preventDefault();
// 		firstNumber = document.querySelector('#first-number').value;
// 		secondNumber = document.querySelector('#second-number').value;
// 		operator = document.querySelector('#operator').value;

// 		result.textContent = calculate(firstNumber, secondNumber, operator);
// 	});
// });

// jQuery
$(() => {
	let $submit = $('input[type=submit]');
	let $result = $('#result');

	$submit.click((e) => {
		e.preventDefault();

		let $firstNumber = $('#first-number').val();
		let $secondNumber = $('#second-number').val();
		let $operator = $('#operator').val();

		$result.text(calculate($firstNumber, $secondNumber, $operator));
	});
});
