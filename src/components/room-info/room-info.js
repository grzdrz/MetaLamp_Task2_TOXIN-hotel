class RoomInfo {
  constructor(outerContainer, currentImageIndex = 0) {
    this.outerContainer = outerContainer;
    this.currentImageIndex = currentImageIndex;

    this._initialize();
    this._setEventsHandlers();
    this._setImagesPositions();
  }

  _initialize() {
    this.imagesContainer = this.outerContainer.querySelector('.js-room-info__photos');
    this.leftButton = this.outerContainer.querySelector('.js-room-info__arrow-back');
    this.rightButton = this.outerContainer.querySelector('.js-room-info__arrow-forward');
    this.imagesElements = [...this.outerContainer.querySelectorAll('.js-room-info__photo')];
    this.radioButtons = [...this.outerContainer.querySelectorAll('.js-room-info__radio-button')];
  }

  _setEventsHandlers() {
    this.leftButton.addEventListener('click', this._handleLeftButtonClick);
    this.rightButton.addEventListener('click', this._handleRightButtonClick);
    this.radioButtons.forEach((button) => button.addEventListener('click', this._handleRadioButtonClick));
  }

  _setImagesPositions() {
    let relativeIndex = -this.currentImageIndex;
    this.imagesElements.forEach((image) => {
      image.style.left = `${image.clientWidth * relativeIndex}px`;
      relativeIndex += 1;
    });
    this._updateState();
  }

  _handleLeftButtonClick = () => {
    if (this.currentImageIndex > 0) this.currentImageIndex -= 1;
    this._setImagesPositions();
  }

  _handleRightButtonClick = () => {
    if (this.currentImageIndex < this.imagesElements.length - 1) this.currentImageIndex += 1;
    this._setImagesPositions();
  }

  _handleRadioButtonClick = (event) => {
    const targetRadioButton = event.target.closest('.js-room-info__radio-button');
    this.currentImageIndex = Number.parseInt(targetRadioButton.dataset.serialNumber, 10);
    this._setImagesPositions();
  }

  _updateState() {
    this.radioButtons.forEach((button, index) => {
      button.classList.toggle('room-info__radio-button_checked', index === this.currentImageIndex);
    });
  }
}

export default RoomInfo;
