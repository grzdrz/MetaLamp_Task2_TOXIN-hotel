class RoomInfo {
    constructor(outerContainerElement) {
        this.outerContainerElement = outerContainerElement;

        this._handleLeftArrowClick = this._handleLeftArrowClick.bind(this);
        this._handleRightArrowClick = this._handleRightArrowClick.bind(this);

        this._initialize();
    }

    _initialize() {
        this.containerElement = this.outerContainerElement.querySelector('.js-room-info');
        this.arrows = this.containerElement.querySelector('.js-room-info__arrows');
        if (this.arrows) {
            this.leftArrow = this.arrows.querySelector('.js-room-info__arrow-back');
            this.rightArrow = this.arrows.querySelector('.js-room-info__arrow-forward');
        }
        this.radioButtons = Array.from(this.containerElement.querySelectorAll('.js-room-info__radio-button'));

        if (this.leftArrow && this.rightArrow) {
            this.leftArrow.onclick = this._handleLeftArrowClick;
            this.rightArrow.onclick = this._handleRightArrowClick;
        }
    }

    _handleLeftArrowClick(event) {
        if (event.currentTarget.disabled) return;

        const checkedButton = this.radioButtons.find((button) => button.checked);

        if (!checkedButton.previousElementSibling) return;

        if (checkedButton.dataset.serialNumber === '2') {
            checkedButton.checked = false;
            checkedButton.previousElementSibling.previousElementSibling.checked = true;
        } else if (checkedButton.dataset.serialNumber === '4') {
            checkedButton.checked = false;
            checkedButton.previousElementSibling.previousElementSibling.checked = true;
        } else {
            checkedButton.checked = false;
            checkedButton.previousElementSibling.previousElementSibling.checked = true;
        }
    }

    _handleRightArrowClick(event) {
        if (event.currentTarget.disabled) return;

        const checkedButton = this.radioButtons.find((button) => button.checked);

        if (!checkedButton.nextElementSibling.nextElementSibling.matches('.js-room-info__radio-button')) return;
        if (checkedButton.nextElementSibling.nextElementSibling.disabled) return;

        if (checkedButton.dataset.serialNumber === '3') {
            checkedButton.checked = false;
            checkedButton.nextElementSibling.nextElementSibling.checked = true;
        } else if (checkedButton.dataset.serialNumber === '1') {
            checkedButton.checked = false;
            checkedButton.nextElementSibling.nextElementSibling.checked = true;
        } else {
            checkedButton.checked = false;
            checkedButton.nextElementSibling.nextElementSibling.checked = true;
        }
    }
}

export default RoomInfo;
