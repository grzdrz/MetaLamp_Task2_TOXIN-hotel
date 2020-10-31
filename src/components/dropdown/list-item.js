class ListItem {
  constructor(containerElement, dropdown) {
    this.containerElement = containerElement;
    this.dropdown = dropdown;

    this.value = 0;

    this._initialize();
    this._setEventHandlers();
  }

  updateState() {
    this.minusButton.classList.toggle('dropdown__item-minus_active', this.value !== 0);
    this.valueElement.textContent = this.value;
  }

  _initialize() {
    this.nameElement = this.containerElement.querySelector('.js-dropdown__item-name');
    this.valueElement = this.containerElement.querySelector('.js-dropdown__item-value');
    this.plusButton = this.containerElement.querySelector('.js-dropdown__item-plus');
    this.minusButton = this.containerElement.querySelector('.js-dropdown__item-minus');

    this.isCommon = this.containerElement.matches('.js-dropdown__list-item_common');
    this.names = this.containerElement.dataset.names.split(',');
  }

  _setEventHandlers() {
    this.plusButton.addEventListener('click', this._handlePlusButtonClick);
    this.minusButton.addEventListener('click', this._handleMinusButtonClick);
  }

  _handlePlusButtonClick = (event) => {
    event.preventDefault();

    this.value = Number.parseInt(this.valueElement.textContent, 10);
    this.value += 1;

    this.dropdown.updateState();
  }

  _handleMinusButtonClick = (event) => {
    event.preventDefault();

    this.value = Number.parseInt(this.valueElement.textContent, 10);
    this.value -= 1;
    if (this.value < 0) this.value = 0;

    this.dropdown.updateState();
  }
}

export default ListItem;
