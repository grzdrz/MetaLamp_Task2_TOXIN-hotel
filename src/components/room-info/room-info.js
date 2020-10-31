class RoomInfo {
  constructor(outerContainerElement, currentPhotoIndex = 0) {
    this.outerContainerElement = outerContainerElement;
    this.currentPhotoIndex = currentPhotoIndex;

    this._initialize();
    this._setEventHandlers();
    this._updateState();
  }

  _initialize() {
    this.containerElement = this.outerContainerElement.querySelector('.js-room-info');
    this.arrows = this.containerElement.querySelector('.js-room-info__arrows');
    if (this.arrows) {
      this.leftArrow = this.arrows.querySelector('.js-room-info__arrow-back');
      this.rightArrow = this.arrows.querySelector('.js-room-info__arrow-forward');
    }
    this.radioButtons = Array.from(this.containerElement.querySelectorAll('.js-room-info__radio-button'));
    this.photos = Array.from(this.containerElement.querySelectorAll('.js-room-info__photo'));
  }

  _setEventHandlers() {
    if (this.leftArrow && this.rightArrow) {
      this.leftArrow.addEventListener('click', this._handleLeftArrowClick);
      this.rightArrow.addEventListener('click', this._handleRightArrowClick);
    }
    this.radioButtons.forEach((button) => {
      button.addEventListener('click', this._handleRadioButtonClick);
    });
  }

  _skipPhoto(isDirectionForward) {
    if (isDirectionForward) {
      if (this.currentPhotoIndex === this.radioButtons.length - 1) return;
      this.currentPhotoIndex += 1;
    } else {
      if (this.currentPhotoIndex === 0) return;
      this.currentPhotoIndex -= 1;
    }
  }

  _updateState() {
    this.radioButtons.forEach((button, index) => {
      button.classList.toggle('room-info__radio-button_checked', index === this.currentPhotoIndex);
    });
    this.photos.forEach((photo, index) => {
      photo.classList.toggle('room-info__photo_current', index === this.currentPhotoIndex);
    });
  }

  _handleLeftArrowClick = () => {
    this._skipPhoto(false);
    this._updateState();
  }

  _handleRightArrowClick = () => {
    this._skipPhoto(true);
    this._updateState();
  }

  _handleRadioButtonClick = (event) => {
    const target = event.target.closest('.js-room-info__radio-button');
    const index = Number.parseInt(target.dataset.serialNumber, 10);
    this.currentPhotoIndex = index;
    this._updateState();
  }
}

export default RoomInfo;
