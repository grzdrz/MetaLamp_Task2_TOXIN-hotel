class ListItem {
  constructor(dropdown, containerElement) {
    this.dropdown = dropdown;
    this.containerElement = containerElement;
    this.value = 0;

    this._handleDropdownItemPlus = this._handleDropdownItemPlus.bind(this);
    this._handleDropdownItemMinus = this._handleDropdownItemMinus.bind(this);

    this._initialize();
  }

  _initialize() {
    this.name = this.containerElement.querySelector('.js-dropdown__item-name');
    this.valueElement = this.containerElement.querySelector('.js-dropdown__item-value');
    this.plus = this.containerElement.querySelector('.js-dropdown__item-plus');
    this.minus = this.containerElement.querySelector('.js-dropdown__item-minus');

    this.plus.addEventListener('click', this._handleDropdownItemPlus);
    this.minus.addEventListener('click', this._handleDropdownItemMinus);
  }

  _handleDropdownItemPlus(event) {
    event.preventDefault();

    this.value = Number.parseInt(this.valueElement.textContent, 10);
    this.value += 1;

    this.dropdown._changeState();
    this.dropdown.changeDropdownInputValue();
  }

  _handleDropdownItemMinus(event) {
    event.preventDefault();

    this.value = Number.parseInt(this.valueElement.textContent, 10);
    this.value -= 1;
    if (this.value < 0) this.value = 0;

    this.dropdown._changeState();
    this.dropdown.changeDropdownInputValue();
  }
}

export default ListItem;
