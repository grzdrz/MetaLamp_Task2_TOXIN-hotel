class ListItem {
  constructor(containerElement, dropdown) {
    this.containerElement = containerElement;
    this.dropdown = dropdown;

    this.value = 0;

    this._handlePlusButtonClick = this._handlePlusButtonClick.bind(this);
    this._handleMinusButtonClick = this._handleMinusButtonClick.bind(this);

    this._initialize();
  }

  get name() {
    return this.nameElement.textContent;
  }

  _updateState() {
    if (this.value === 0) {
      this.minusButton.classList.toggle('dropdown__item-minus_active', false);
      this.valueElement.textContent = 0;
    } else {
      this.minusButton.classList.toggle('dropdown__item-minus_active', true);
      this.valueElement.textContent = this.value;
    }
  }

  _initialize() {
    this.nameElement = this.containerElement.querySelector('.js-dropdown__item-name');
    this.valueElement = this.containerElement.querySelector('.js-dropdown__item-value');
    this.plusButton = this.containerElement.querySelector('.js-dropdown__item-plus');
    this.minusButton = this.containerElement.querySelector('.js-dropdown__item-minus');

    this.plusButton.addEventListener('click', this._handlePlusButtonClick);
    this.minusButton.addEventListener('click', this._handleMinusButtonClick);
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
