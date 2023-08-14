function callback1() {
  console.log('callback1');
}

function callback2() {
  console.log('callback2');
}

function callback3() {
  console.log('callback3');
}

function randomTimer(n) {
  return Math.floor(Math.random() * (n)) * 1000;
}

function randomizer(...callbacks) {
  let time = callbacks.length * 2;
  let secondsElapsed = 0;

  let timer = setInterval(() => {
    secondsElapsed += 1;
    console.log(secondsElapsed);

    if (secondsElapsed === time) {
      clearInterval(timer);
    }
  }, 1000);

  callbacks.forEach(callback => setTimeout(callback, randomTimer(time)));
}

randomizer(callback1, callback2, callback3);