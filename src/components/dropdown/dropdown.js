import ListItem from './list-item';

class Dropdown {
  constructor(outerContainerElement, isOpened = false) {
    this.outerContainerElement = outerContainerElement;
    this.isOpened = isOpened;
    this.hasClearButton = false;
    this.totalValue = 0;

    this._closeDropdown = this._closeDropdown.bind(this);
    this._handleDropdownClick = this._handleDropdownClick.bind(this);
    this._handleClearButtonClick = this._handleClearButtonClick.bind(this);
    this._handleApplyButtonClick = this._handleApplyButtonClick.bind(this);
    this._handleDropdownLeave = this._handleDropdownLeave.bind(this);

    this._initialize();
  }

  updateState() {
    this.totalValue = 0;
    this.droppingList.forEach((item) => {
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
      this.droppingListContainer.classList.toggle('dropdown__list_opened', true);
    } else {
      this.inputContainer.classList.toggle('dropdown__input-container_opened', false);
      this.droppingListContainer.classList.toggle('dropdown__list_opened', false);
    }

    if (this.clearButton) {
      if (this.hasClearButton) {
        this.clearButton.classList.toggle('dropdown__clear-button_visible', true);
      } else {
        this.clearButton.classList.toggle('dropdown__clear-button_visible', false);
      }
    }

    if (this.withTotalValue) this._calculateTotalValue();
    else this._setInputValue();
  }

  _initialize() {
    this.containerElement = this.outerContainerElement.querySelector('.js-dropdown');

    this.withTotalValue = this.containerElement.matches('.js-dropdown_with-total-value');

    this.inputContainer = this.containerElement.querySelector('.js-dropdown__input-container');
    this.input = this.containerElement.querySelector('.js-dropdown__input');
    this.dropdownArrow = this.containerElement.querySelector('.js-dropdown__dropdown-arrow');

    this.droppingListContainer = this.containerElement.querySelector('.js-dropdown__list');
    this.droppingList = Array.from(this.droppingListContainer.querySelectorAll('.js-dropdown__list-item'))
      .map((itemElement) => new ListItem(itemElement, this));

    this.clearButton = this.containerElement.querySelector('.js-dropdown__clear-button');
    if (this.clearButton) this.hasClearButton = false;
    this.applyButton = this.containerElement.querySelector('.js-dropdown__apply-button');

    this._setEventHandlers();
    this.updateState();
  }

  _setEventHandlers() {
    this.input.addEventListener('click', this._handleDropdownClick);
    this.dropdownArrow.addEventListener('click', this._handleDropdownClick);
    if (this.clearButton) this.clearButton.addEventListener('click', this._handleClearButtonClick);
    if (this.applyButton) this.applyButton.addEventListener('click', this._handleApplyButtonClick);
    document.addEventListener('click', this._handleDropdownLeave);
  }

  _calculateTotalValue() {
    let babiesCount = 0;
    this.totalValue = this.droppingList.reduce((previousValue, item) => {
      const itemText = item.name.textContent;
      if (itemText.toLowerCase() !== 'младенцы') {
        return previousValue + Number.parseInt(item.valueElement.textContent, 10);
      }
      babiesCount = Number.parseInt(item.valueElement.textContent, 10);
      return previousValue;
    }, 0);

    this._setInputValue(babiesCount);
  }

  _setInputValue(babiesCount) {
    if (this.withTotalValue) {
      if (babiesCount !== 0) {
        const mainText = `${this.totalValue} ${this._doDeclensionOfWord(this.totalValue, 'гость')}`;
        const fullText = `${mainText}, ${babiesCount} ${this._doDeclensionOfWord(babiesCount, 'младенец')}`;
        this.input.value = fullText;
      } else {
        this.input.value = `${this.totalValue} ${this._doDeclensionOfWord(this.totalValue, 'гость')}`;
      }
    } else {
      const result = this.droppingList.reduce((fullString, item, index) => {
        const itemName = item.name.textContent;
        const itemValue = Number.parseInt(item.valueElement.textContent, 10);

        if (index !== this.droppingList.length - 1) {
          return `${fullString}${itemValue} ${this._doDeclensionOfWord(itemValue, itemName)}, `;
        }
        return `${fullString}${itemValue} ${this._doDeclensionOfWord(itemValue, itemName)}`;
      }, '');
      this.input.value = result;
    }
  }

  _doDeclensionOfWord(number, word) {
    let words;
    if (word === 'гость') words = ['гость', 'гостя', 'гостей'];
    else if (word === 'спальни') words = ['спальня', 'спальни', 'спален'];
    else if (word === 'кровати') words = ['кровать', 'кровати', 'кроватей'];
    else if (word === 'ванные комнаты') words = ['ванная комната', 'ванные комнаты', 'ванных комнат'];
    else if (word === 'младенец') words = ['младенец', 'младенца', 'младенцев'];

    const stringifiedNumber = number.toString();
    const isEndOnOne = stringifiedNumber[stringifiedNumber.length - 1] === '1';
    const isNotEqualEleven = number !== 11;
    if (isEndOnOne && isNotEqualEleven) return words[0];

    const isEndNumberMoreThenOne = stringifiedNumber[stringifiedNumber.length - 1] > 1;
    const isEndNumberLessThenFour = stringifiedNumber[stringifiedNumber.length - 1] <= 4;
    const isEndNumberBetweenTwelveAndFourteen = number < 12 || number > 14;
    const isSecondWord = isEndNumberMoreThenOne && isEndNumberLessThenFour && isEndNumberBetweenTwelveAndFourteen;
    if (isSecondWord) return words[1];

    return words[2];
  }

  _closeDropdown() {
    this.isOpened = false;
    this.updateState();
  }

  _handleDropdownClick() {
    if (this.isOpened) {
      this.isOpened = false;
    } else {
      this.isOpened = true;
    }
    this.updateState();
  }

  _handleClearButtonClick() {
    this.hasClearButton = false;
    this.droppingList.forEach((item) => {
      item.value = 0;
    });
    this.updateState();
  }

  _handleApplyButtonClick() {
    this.isOpened = false;
    this.updateState();
  }

  _handleDropdownLeave(event) {
    if (event.target.className.match) {
      const dropdowns = event.target.className.match(/(^dropdown$)|(^dropdown__)/);
      if (!dropdowns) {
        this._closeDropdown();
      }
    } else this._closeDropdown();
  }
}

export default Dropdown;
