class ListItem {
  constructor(dropdown, containerElement) {
    this.dropdown = dropdown;
    this.containerElement = containerElement;

    this._handleDropdownItemPlus = this._handleDropdownItemPlus.bind(this);
    this._handleDropdownItemMinus = this._handleDropdownItemMinus.bind(this);

    this._initialize();
  }

  _initialize() {
    this.name = this.containerElement.querySelector('.js-dropdown__item-name');
    this.value = this.containerElement.querySelector('.js-dropdown__item-value');
    this.plus = this.containerElement.querySelector('.js-dropdown__item-plus');
    this.minus = this.containerElement.querySelector('.js-dropdown__item-minus');

    this.plus.onclick = this._handleDropdownItemPlus;
    this.minus.onclick = this._handleDropdownItemMinus;
  }

  _handleDropdownItemPlus(event) {
    event.preventDefault();

    let curValue = Number.parseInt(this.value.textContent, 10);
    curValue += 1;
    if (curValue !== 0) this.minus.style.opacity = 1;
    this.value.textContent = curValue;

    if (this.dropdown.clearButton) {
      this.dropdown.clearButton.style.display = 'flex';
    }

    this.dropdown.changeDropdownInputValue();
  }

  _handleDropdownItemMinus(event) {
    event.preventDefault();

    let curValue = Number.parseInt(this.value.textContent, 10);
    curValue -= 1;
    if (curValue < 0) curValue = 0;

    this.value.textContent = curValue;

    if (curValue === 0) {
      event.currentTarget.style.opacity = 0.38;

      const values = this.dropdown.list.map((item) => item.value);
      const absoluteSum = values.reduce((sum, value) => sum + Math.abs(Number.parseInt(value.textContent, 10)), 0);

      if (absoluteSum === 0) {
        if (this.dropdown.clearButton) {
          this.dropdown.clearButton.style.display = 'none';
        }
      }
    }

    this.dropdown.changeDropdownInputValue();
  }
}

export default ListItem;
