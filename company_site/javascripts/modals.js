'use strict'

document.addEventListener('DOMContentLoaded', () => {
  var Modal = {
    modal: document.getElementById('modal'),
    background: document.getElementById('background'),
    links: document.querySelectorAll('a'),

    hideModal(e) {
      e.stopPropagation();
      this.modal.style.display = 'none';
      this.background.style.display = 'none';
    },

    displayModal(e) {
      e.preventDefault();
      const img = e.target.parentElement.querySelector('img');

      this.modal.querySelector('h3').textContent = img.alt;
      this.modal.querySelector('img').src = img.src;

      this.modal.style.display = 'block';
      this.background.style.display = 'block';
    },

    init() {
      this.background.addEventListener('click', this.hideModal.bind(this));

      [...this.links].forEach(link => {
        link.addEventListener('click', this.displayModal.bind(this));
      });
    }
  }

  Modal.init();
});
