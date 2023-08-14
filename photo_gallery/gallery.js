document.addEventListener('DOMContentLoaded', () => {
  // add large photos: from the li nodes, copy the img to the figure node and append 
  let main = document.querySelector('main');
  let currentMain = document.querySelector('img');
  let ul = document.querySelector('ul');
  let thumbnails = document.querySelectorAll('ul li');

  let currentActive = main.querySelector("ul li");
  currentActive.classList.add('active')

  function createFigure(li) {
    let figure = document.createElement('figure');
    let img = li.querySelector('img').cloneNode();
    let figcaption = document.createElement('figcaption');
    let figcaptionText = document.createTextNode('Example Photo');

    figcaption.appendChild(figcaptionText);

    figure.appendChild(img);
    figure.appendChild(figcaption);

    figure.style = "display: none;";

    return figure;
  }

  for (let i = 1; i < thumbnails.length; i += 1) {
    main.insertBefore(createFigure(thumbnails[i]), ul);
  }

  // add event listener for click on thumbnails, when clicked, add class 'active' to the li and change display of corresponding figure to block
  ul.addEventListener('click', e => {
    currentActive.classList.toggle('active');
    currentActive = e.target;
    currentActive.classList.toggle('active');

    let src = e.target.getAttribute('src');
    let largePhoto = main.querySelector(`img[src='${src}']`);

    currentMain.parentNode.style = "display: none;";

    currentMain = largePhoto;
    currentMain.parentNode.style = "display: block;";
  });
});