
const test = new Promise((resolve, reject) => {
  if (2 + 3 === 4) {
    resolve('Correct!');
  } else {
    reject(new Error('Incorrect...'));
  }
});

test.then(data => {
  console.log(data);
}).catch(error => {
  console.log(error.message);
}).finally(() => {
  console.log('This promise has been settled.');
});