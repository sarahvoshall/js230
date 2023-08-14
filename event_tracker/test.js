'use strict'

// let tracker = {
//   events: [],

//   list() {
//     return this.events;
//   },

//   elements() {
//     return this.events.map(event => event.target);
//   },

//   clear() {
//     this.events = [];
//     return this.events.length;
//   }
// }

let tracker = (() => {
  const events = [];

  return {
    list() {
      return [...events];
    },

    elements() {
      return events.map(({target}) => target);
    },

    clear() {
      events = [];
      return events.length;
    },

    add(event) {
      events.push(event);
    },
  }
})();

function track(callback) {
  return function (event) {
    if (!tracker.list().some(({target}) => target === event.target)) {
      tracker.add(event);
    }

    callback(event);
  };
}

const divRed = document.getElementById('red');
const divBlue = document.getElementById('blue');
const divOrange = document.getElementById('orange');
const divGreen = document.getElementById('green');

divRed.addEventListener('click', track(event => {
  document.body.style.background = 'red';
}));

divBlue.addEventListener('click', track(event => {
  event.stopPropagation();
  document.body.style.background = 'blue';
}));

divOrange.addEventListener('click', track(event => {
  // event.stopPropagation();
  document.body.style.background = 'orange';
}));

divGreen.addEventListener('click', track(event => {
  // event.stopPropagation();
  document.body.style.background = 'green';
}));