'use strict' 

const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}

const App = {
  handleMouseOver(e) {
    this.timer = setTimeout(() => {
      if (e.target.tagName === 'IMG') { 
        this.showToolTip(e)
      } 
    }, 2000);
  },

  showToolTip(e) {
    let figcap = e.target.nextElementSibling;
    figcap.style.display = 'block';
    figcap.style.position = 'absolute';
  },

  handleMouseOut(e) {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    
    if (e.target.tagName === 'IMG') { 
      let figcap = e.target.nextElementSibling;
      figcap.style.display = 'none';
    }
  },

  init() {
    const main = document.querySelector('main');
    main.addEventListener('mouseover', this.handleMouseOver.bind(this));
    main.addEventListener('mouseout', this.handleMouseOut.bind(this));
  },
}

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

// document.addEventListener('DOMContentLoaded', () => {
//   const main = document.querySelector('main');

//   // const handleMouseOver = debounce((e) => {
//   //   if (e.target.tagName === 'IMG') { 
//   //     let figcap = e.target.nextElementSibling;
//   //     figcap.style.display = 'block';
//   //     figcap.style.position = 'absolute';
//   //   }
//   // }, 2000);

//   main.addEventListener('mouseover', handleMouseOver);

//   main.addEventListener('mouseout', (e) => {
//     if (e.target.tagName === 'IMG') { 
//       let figcap = e.target.nextElementSibling;
//       figcap.style.display = 'none';
//     }
//   });
// });