import ListItem from './list-item';

class Dropdown {
  constructor(outerContainerElement, isOpened = false) {
    this.outerContainerElement = outerContainerElement;
    this.isOpened = isOpened;
    this.hasClearButton = false;
    this.totalValue = 0;

    this._handleDropdownClick = this._handleDropdownClick.bind(this);
    this._handleCloseDropdown = this._handleCloseDropdown.bind(this);
    this._handleClearButtonClick = this._handleClearButtonClick.bind(this);
    this._handleApply = this._handleApply.bind(this);
    this._handleDropdownLeave = this._handleDropdownLeave.bind(this);

    this._initialize();
  }

  changeDropdownInputValue() {
    let babiesCount = 0;
    const sum = this.list.reduce((previousValue, item) => {
      const itemText = item.name.textContent;
      if (itemText.toLowerCase() !== 'младенцы') {
        return previousValue + Number.parseInt(item.valueElement.textContent, 10);
      }
      babiesCount = Number.parseInt(item.valueElement.textContent, 10);
      return previousValue;
    }, 0);

    if (this.withTotalValue) {
      if (babiesCount !== 0) {
        const mainText = `${sum} ${this._doDeclensionOfWord(sum, 'гость')}`;
        const fullText = `${mainText}, ${babiesCount} ${this._doDeclensionOfWord(babiesCount, 'младенец')}`;
        this.input.value = fullText;
      } else {
        this.input.value = `${sum} ${this._doDeclensionOfWord(sum, 'гость')}`;
      }
      this.totalValue = sum;
    } else {
      const result = this.list.reduce((fullString, item, index) => {
        const itemName = item.name.textContent;
        const itemValue = Number.parseInt(item.valueElement.textContent, 10);

        if (index !== this.list.length - 1) {
          return `${fullString}${itemValue} ${this._doDeclensionOfWord(itemValue, itemName)}, `;
        }
        return `${fullString}${itemValue} ${this._doDeclensionOfWord(itemValue, itemName)}`;
      }, '');
      this.input.value = result;
    }
  }

  _initialize() {
    this.containerElement = this.outerContainerElement.querySelector('.js-dropdown');

    this.withTotalValue = this.containerElement.matches('.js-dropdown_with-total-value');

    this.inputContainer = this.containerElement.querySelector('.js-dropdown__input-container');
    this.input = this.containerElement.querySelector('.js-dropdown__input');
    this.dropdownArrow = this.containerElement.querySelector('.js-dropdown__dropdown-arrow');

    this.listElement = this.containerElement.querySelector('.js-dropdown__list');
    this.list = Array.from(this.listElement.querySelectorAll('.js-dropdown__list-item'))
      .map((itemElement) => new ListItem(this, itemElement));

    this.clearButton = this.containerElement.querySelector('.js-dropdown__clear-button');
    this.applyButton = this.containerElement.querySelector('.js-dropdown__apply-button');

    this.input.onclick = this._handleDropdownClick;
    this.dropdownArrow.onclick = this._handleDropdownClick;

    if (this.clearButton) {
      this.hasClearButton = false;
      this._changeState();
      this.clearButton.onclick = this._handleClearButtonClick;
    }

    if (this.applyButton) this.applyButton.onclick = this._handleApply;

    document.addEventListener('click', this._handleDropdownLeave);
  }

  _doDeclensionOfWord(number, word) {
    let words;
    if (word === 'гость') words = ['гость', 'гостя', 'гостей'];
    else if (word === 'спальни') words = ['спальня', 'спальни', 'спален'];
    else if (word === 'кровати') words = ['кровать', 'кровати', 'кроватей'];
    else if (word === 'ванные комнаты') words = ['ванная комната', 'ванные комнаты', 'ванных комнат'];
    else if (word === 'младенец') words = ['младенец', 'младенца', 'младенцев'];

    const isEndOnOne = number.toString()[number.toString().length - 1] === '1';
    const isNotEqualEleven = number !== 11;
    if (isEndOnOne && isNotEqualEleven) return words[0];

    const isEndNumberMoreThenOne = number.toString()[number.toString().length - 1] > 1;
    const isEndNumberLessThenFour = number.toString()[number.toString().length - 1] <= 4;
    const isEndNumberBetweenTwelveAndFourteen = number < 12 || number > 14;
    const isSecondWord = isEndNumberMoreThenOne && isEndNumberLessThenFour && isEndNumberBetweenTwelveAndFourteen;
    if (isSecondWord) return words[1];

    return words[2];
  }

  _handleDropdownClick() {
    if (this.isOpened) {
      this.isOpened = false;
    } else {
      this.isOpened = true;
    }
    this._changeState();
  }

  _handleCloseDropdown() {
    this.isOpened = false;
    this._changeState();
  }

  _handleClearButtonClick() {
    this.hasClearButton = false;
    this.list.forEach((item) => {
      item.value = 0;
    });

    this._changeState();
    this.changeDropdownInputValue();
  }

  _handleApply() {
    this.isOpened = false;
    this._changeState();

    this.changeDropdownInputValue();
  }

  _handleDropdownLeave(event) {
    if (event.target.className.match) {
      const dropdowns = event.target.className.match(/(^dropdown$)|(^dropdown__)/);
      if (!dropdowns) {
        this._handleCloseDropdown();
      }
    } else this._handleCloseDropdown();
  }

  _changeState() {
    this.totalValue = 0;
    this.list.forEach((item) => {
      if (item.value === 0) {
        item.minus.classList.toggle('dropdown__item-minus_active', false);
        item.valueElement.textContent = 0;
      } else {
        item.minus.classList.toggle('dropdown__item-minus_active', true);
        item.valueElement.textContent = item.value;
      }
      this.totalValue += item.value;
    });
    this.hasClearButton = this.totalValue !== 0;

    if (this.isOpened) {
      this.inputContainer.classList.toggle('dropdown__input-container_opened', true);
      this.listElement.classList.toggle('dropdown__list_opened', true);
    } else {
      this.inputContainer.classList.toggle('dropdown__input-container_opened', false);
      this.listElement.classList.toggle('dropdown__list_opened', false);
    }

    if (this.clearButton) {
      if (this.hasClearButton) {
        this.clearButton.classList.toggle('dropdown__clear-button_visible', true);
      } else {
        this.clearButton.classList.toggle('dropdown__clear-button_visible', false);
      }
    }
  }
}

export default Dropdown;
