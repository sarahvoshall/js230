'use strict'

document.addEventListener('DOMContentLoaded', () => {
  const templates = {};
  let photos;

  // compile templates
  document.querySelectorAll('[type="text/x-handlebars"]').forEach(template => {
    templates[template.id] = Handlebars.compile(template.innerHTML);
  });

  // register partials
  document.querySelectorAll('[data-type="partial"]').forEach(template => {
    Handlebars.registerPartial(template.id, template.innerHTML);
  });

  const slideshow = {
    prevSlide: function(e) {
      e.preventDefault();
      let prev = this.currentSlide.previousElementSibling;
      if (!prev) {
        prev = this.lastSlide;
      }
      this.toggleFade(this.currentSlide);
      this.toggleFade(prev);
      this.renderPhotoContent(prev.getAttribute("data-id"));
      this.currentSlide = prev;
    },
    nextSlide: function(e) {
      e.preventDefault();
      let next = this.currentSlide.nextElementSibling;
      if (!next) {
        next = this.firstSlide;
      }
      this.toggleFade(this.currentSlide);
      this.toggleFade(next);
      this.renderPhotoContent(next.getAttribute("data-id"));
      this.currentSlide = next;
    },
    toggleFade: function(slide) {
      slide.classList.toggle('visible');
    },
    renderPhotoContent: function(idx) {
      renderPhotoInformation(Number(idx));
      getCommentsFor(idx);
    },
    bind: function() {
      let prevButton = this.slideshow.querySelector("a.prev");
      let nextButton = this.slideshow.querySelector("a.next");
      prevButton.addEventListener("click", (e) => { this.prevSlide(e) });
      nextButton.addEventListener("click", (e) => { this.nextSlide(e) });
    },
    init: function() {
      this.slideshow = document.querySelector("#slideshow");
      let slides = this.slideshow.querySelectorAll('figure');
      this.firstSlide = slides[0];
      this.lastSlide = slides[slides.length -1];
      this.currentSlide = this.firstSlide;
      this.bind();
    }
  };

  fetch("/photos")
    .then(response => response.json())
    .then(json => {
      photos = json;
      renderPhotos();
      renderPhotoInformation(photos[0].id);
      getCommentsFor(photos[0].id);
      slideshow.init();
  });

  document.querySelector('section > header').addEventListener('click', event => {
    event.preventDefault();
    let button = event.target;
    let href = button.getAttribute('href');
    let dataId = button.getAttribute('data-id');
    let text = button.textContent;

    fetch(href, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ photo_id: dataId }),
    })
    .then(response => response.json())
    .then(json => {
      button.textContent = text.replace(/\d+/, json.total);
      fetch('/photos')
      .then(response => response.json())
      .then(json => photos = json);
    });
  });

  document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();
    let form = event.target;
    let href = form.getAttribute('action');
    let method = form.getAttribute('method');
    let data = new FormData(form);
    let currentSlideId = slideshow.currentSlide.getAttribute('data-id');
    data.set('photo-id', currentSlideId);

    fetch(href, {
      method: method,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
      body: new URLSearchParams([...data]),
    })
    .then(response => response.json())
    .then(json => {
      let commentsList = document.querySelector('#comments ul');
      commentsList.insertAdjacentHTML('beforeend', templates.photo_comment(json));
      form.reset();
    });
  });

  function renderPhotos() {
    let slides = document.getElementById('slides');
    slides.insertAdjacentHTML('beforeend', templates.photos({ photos: photos }));
  }

  function renderPhotoInformation(idx) {
    let photo = photos.filter(function(item) {
      return item.id === idx;
    })[0];
    let header = document.querySelector("section > header");
    header.innerHTML = "";
    header.insertAdjacentHTML('beforeend', templates.photo_information(photo));
  }

  function getCommentsFor(idx) {
    fetch("/comments?photo_id=" + idx)
      .then(response => response.json())
      .then(comment_json => {
        let comment_list = document.querySelector("#comments ul");
        comment_list.innerHTML = "";
        comment_list.insertAdjacentHTML('beforeend', templates.photo_comments({ comments: comment_json }));
    });
  }
});