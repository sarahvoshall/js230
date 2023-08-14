const test = new Promise(function(resolve, reject) {
  if (2 + 2 === 4) {
    resolve('helo');
  } else {
    reject(new Error('Error'));
  }
});

test.then(data => {
  console.log(data);
}).catch(error => {
  console.log(error.message);
}).finally(() => {
  console.log('This promise has been settled.');
});

// (async () => {
//   try {
//     let message = await test;
//     console.log(message);
//   } catch {
//     console.log("E");
//   } finally {
//     console.log("B");
//   }
// })();