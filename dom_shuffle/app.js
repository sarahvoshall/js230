let header = document.querySelector('header');
let main = document.querySelector('main');
let nav = document.querySelector('nav');

let newHeader = header.cloneNode(true);

let title = main.firstElementChild;

let mainChild1 = newHeader.children[0];
let mainChild2 = newHeader.children[1];

document.body.insertBefore(newHeader, main);

newHeader.appendChild(title);
newHeader.appendChild(nav);

main.appendChild(mainChild1);
main.appendChild(mainChild2);

document.body.removeChild(document.body.children[2]);
main.removeChild(main.children[1]);

let images = document.querySelectorAll('img');
let content = document.getElementById('content');

content.children[1].replaceChild(images[1], images[0]);
content.children[2].insertBefore(images[0], content.children[2].lastElementChild);

main.removeChild(main.lastElementChild);