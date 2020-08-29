class ListItem {
  constructor(containerElement, dropdown) {
    this.containerElement = containerElement;
    this.dropdown = dropdown;

    this.value = 0;

    this._handlePlusButtonClick = this._handlePlusButtonClick.bind(this);
    this._handleMinusButtonClick = this._handleMinusButtonClick.bind(this);

    this._initialize();
  }

  _initialize() {
    this.name = this.containerElement.querySelector('.js-dropdown__item-name');
    this.valueElement = this.containerElement.querySelector('.js-dropdown__item-value');
    this.plus = this.containerElement.querySelector('.js-dropdown__item-plus');
    this.minus = this.containerElement.querySelector('.js-dropdown__item-minus');

    this.plus.addEventListener('click', this._handlePlusButtonClick);
    this.minus.addEventListener('click', this._handleMinusButtonClick);
  }

  _handlePlusButtonClick(event) {
    event.preventDefault();

    this.value = Number.parseInt(this.valueElement.textContent, 10);
    this.value += 1;

    this.dropdown.updateState();
  }

  _handleMinusButtonClick(event) {
    event.preventDefault();

    this.value = Number.parseInt(this.valueElement.textContent, 10);
    this.value -= 1;
    if (this.value < 0) this.value = 0;

    this.dropdown.updateState();
  }
}

export default ListItem;
