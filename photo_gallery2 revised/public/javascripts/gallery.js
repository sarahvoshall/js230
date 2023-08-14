var Gallery = {
  async loadFirstPage() {
    fetch('/photos')
      .then(response => response.json())
      .then(photos => {
        this.photos = photos;
        this.currentPhotoIndex = 0;
        this.renderFirstPage();
        this.renderPhotoInformation(this.photos[0].id);
        this.getPhotoComments(this.photos[0].id);
        this.bindActions();
      });
  },

  renderFirstPage() {
    const template = Handlebars.compile(document.getElementById('photos').innerHTML);
    const slides = document.getElementById('slides');

    slides.innerHTML = template({ photos: this.photos }); 
  },

  updatePhotoInformation() {
    fetch('/photos')
      .then(response => response.json())
      .then(photos => {
        this.photos = photos;
        this.renderPhotoInformation(this.photos[this.currentPhotoIndex].id);
      });
  },

  renderPhotoInformation(id) {
    const template = Handlebars.compile(document.getElementById('photo_information').innerHTML);
    const header = document.querySelector('section header');

    const currentPhoto = this.photos.find(photo => photo.id === id);
    header.innerHTML = template(currentPhoto);

    const like = document.querySelector('a.like');
    const favorite = document.querySelector('a.favorite');
    like.addEventListener('click', this.handleLike.bind(this));
    favorite.addEventListener('click', this.handleFavorite.bind(this));
  },

  async getPhotoComments(id) {
    fetch(`/comments?photo_id=${id}`)
      .then(response => response.json())
      .then(comments => this.renderPhotoComments(comments));
  },

  renderPhotoComments(comments) {
    const templatePartial = Handlebars.compile(document.getElementById('photo_comment').innerHTML);
    const template = Handlebars.compile(document.getElementById('photo_comments').innerHTML);
    Handlebars.registerPartial('comment', templatePartial);

    const commentsUl = document.querySelector('#comments ul');
    commentsUl.innerHTML = template({ comments: comments });
  },

  handlePreviousClick(e) {
    e.preventDefault();

    const slides = document.querySelectorAll('#slides figure');
    slides[this.currentPhotoIndex].style.display = 'none';
    this.currentPhotoIndex -= 1;

    if (this.currentPhotoIndex < 0) {
      this.currentPhotoIndex = this.photos.length - 1;
    }

    slides[this.currentPhotoIndex].style.display = 'block';
    this.renderPhotoInformation(this.photos[this.currentPhotoIndex].id);
    this.getPhotoComments(this.photos[this.currentPhotoIndex].id);
    // document.querySelector('input[name="photo_id"').value = this.photos[this.currentPhotoIndex].id;
  },

  handleNextClick(e) {
    e.preventDefault();

    const slides = document.querySelectorAll('#slides figure');
    slides[this.currentPhotoIndex].style.display = 'none';
    this.currentPhotoIndex += 1;

    if (this.currentPhotoIndex >= this.photos.length) {
      this.currentPhotoIndex = 0;
    }

    slides[this.currentPhotoIndex].style.display = 'block';
    this.renderPhotoInformation(this.photos[this.currentPhotoIndex].id);
    this.getPhotoComments(this.photos[this.currentPhotoIndex].id);
    // document.querySelector('input[name="photo_id"').value = this.photos[this.currentPhotoIndex].id;
  },

  handleLike(e) {
    e.preventDefault();

    const data = { photo_id: this.photos[this.currentPhotoIndex].id };
    fetch('photos/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(() => {
        this.updatePhotoInformation(this.photos[this.currentPhotoIndex].id);
      });
  },

  handleFavorite(e) {
    e.preventDefault();

    const data = { photo_id: this.photos[this.currentPhotoIndex].id };
    fetch('photos/favorite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(() => {
        this.updatePhotoInformation(this.photos[this.currentPhotoIndex].id);
      });
  },

  handleFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(this.form);
    formData.set('data-id', this.photos[this.currentPhotoIndex].id);
    var searchParams = new URLSearchParams();

    for ([key, value] of formData.entries()) {
      searchParams.append(key, value);
    }

    const data = searchParams.toString();
    fetch('comments/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
      })
      .then(() => {
        this.getPhotoComments(this.photos[this.currentPhotoIndex].id);
        this.form.reset();
      });
  },

  bindActions() {
    const previous = document.querySelector('a.prev');
    const next = document.querySelector('a.next');
    this.form = document.querySelector('form');

    previous.addEventListener('click', this.handlePreviousClick.bind(this));
    next.addEventListener('click', this.handleNextClick.bind(this));
    this.form.addEventListener('submit', this.handleFormSubmit.bind(this));
  },

  init() {
    this.loadFirstPage();
  },
};

Gallery.init();