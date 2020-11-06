/* eslint-disable prefer-const */
/* eslint-disable no-restricted-syntax */
import LoopedDoublyLinkedList from './looped-doubly-linked-list';

import './images-carousel.scss';

class ImagesCarousel {
  constructor(outerContainer, currentImageIndex = 0) {
    this.outerContainer = outerContainer;
    this.currentImageIndex = currentImageIndex;

    this.skipBack = this.skipBack.bind(this);
    this.skipForward = this.skipForward.bind(this);

    this.initialize();
    this.setEventsHandlers();
    this.buildCarouselList();

    this.currentImage = this.imagesList.tail;
    this.setImagesPositions();
  }

  initialize() {
    this.imagesContainer = this.outerContainer.querySelector('.js-room-info__photos');
    this.button = this.outerContainer.querySelector('.js-room-info__arrow-back');
    this.button2 = this.outerContainer.querySelector('.js-room-info__arrow-forward');
    this.imagesElements = [...this.outerContainer.querySelectorAll('.js-room-info__photo')];
    if (this.imagesElements.length === 2) {
      this.imagesContainer.append(this.imagesElements[0].cloneNode());
      this.imagesContainer.append(this.imagesElements[1].cloneNode());
      this.imagesElements = [...this.outerContainer.querySelectorAll('.js-room-info__photo')];
    }
    this.radioButtons = [...this.outerContainer.querySelectorAll('.js-room-info__radio-button')];
  }

  setEventsHandlers() {
    this.button.addEventListener('click', this.skipBack);
    this.button2.addEventListener('click', this.skipForward);
    this.radioButtons.forEach((button) => button.addEventListener('click', this._handleRadioButtonClick));
  }

  buildCarouselList() {
    this.imagesList = new LoopedDoublyLinkedList(this.imagesElements[0]);
    for (let i = 1; i < this.imagesElements.length; i += 1) {
      this.imagesList.add(this.imagesElements[i]);
    }
  }

  showActiveImages() {
    /* for (let item of this.imagesList) {
      item.value.style.display = 'none';
    }
    this.currentImage.previous.value.style.display = 'block';
    this.currentImage.next.value.style.display = 'block';
    this.currentImage.value.style.display = 'block'; */
  }

  setImagesPositions() {
    const width = this.currentImage.value.clientWidth;

    for (let item of this.imagesList) {
      if (item.index !== this.currentImage.index) {
        item.value.style.transition = 'none';
        item.value.style.display = 'none';
      }
    }

    let startItem = this.currentImage;
    let currentItem = this.currentImage.next;
    let i = 1;
    while (currentItem !== startItem) {
      currentItem.value.style.zIndex = 0;
      currentItem.value.style.left = `${width * i}px`;
      i += 1;
      currentItem = currentItem.next;
    }

    for (let item of this.imagesList) {
      item.value.style.transition = 'left 0.8s ease-out';
      item.value.style.display = 'block';
    }

    i = this.currentImage.index - this.currentImageIndex;
    startItem = this.currentImage.previous;
    currentItem = this.currentImage;
    while (currentItem !== startItem) {
      if (currentItem.index === this.currentImageIndex) this.currentImage = currentItem;

      currentItem.value.style.zIndex = 0;
      currentItem.value.style.left = `${width * i}px`;

      i += 1;
      currentItem = currentItem.next;
    }
    currentItem.value.style.zIndex = 0;
    currentItem.value.style.left = `${width * i}px`;

    this._updateState();
  }

  skipBack() {
    this.currentImage = this.currentImage.previous;
    this.showActiveImages();

    const width = this.currentImage.value.clientWidth;

    this.currentImage.previous.value.style.zIndex = 0;
    this.currentImage.next.value.style.zIndex = 2;
    this.currentImage.value.style.zIndex = 2;

    this.currentImage.previous.value.style.left = `${-width}px`;
    this.currentImage.next.value.style.left = `${width}px`;
    this.currentImage.value.style.left = `${0}px`;

    this.currentImageIndex = this.currentImage.index;

    this._updateState();
  }

  skipForward() {
    this.currentImage = this.currentImage.next;
    this.showActiveImages();

    const width = this.currentImage.value.clientWidth;

    this.currentImage.previous.value.style.zIndex = 2;
    this.currentImage.next.value.style.zIndex = 0;
    this.currentImage.value.style.zIndex = 2;

    this.currentImage.previous.value.style.left = `${-width}px`;
    this.currentImage.next.value.style.left = `${width}px`;
    this.currentImage.value.style.left = `${0}px`;

    this.currentImageIndex = this.currentImage.index;

    this._updateState();
  }

  _handleRadioButtonClick = (event) => {
    const target = event.target.closest('.js-room-info__radio-button');
    const index = Number.parseInt(target.dataset.serialNumber, 10);
    this.currentImageIndex = index;
    this._updateState();
    this.setImagesPositions();
  }

  _updateState() {
    this.radioButtons.forEach((button, index) => {
      button.classList.toggle('room-info__radio-button_checked', index === this.currentImageIndex);
    });
    /* this.photos.forEach((photo, index) => {
      photo.classList.toggle('room-info__photo_current', index === this.currentImageIndex);
    }); */
  }
}

export default ImagesCarousel;
