/* eslint-disable no-lonely-if */
import ListItem from './list-item';
import { doDeclensionOfWord } from '../../assets/helpers';

class Dropdown {
  constructor(outerContainerElement, isOpened = false) {
    this.outerContainerElement = outerContainerElement;
    this.isOpened = isOpened;
    this.hasClearButton = false;
    this.totalValue = 0;

    this._initialize();
    this._setEventHandlers();
    this.updateState();
  }

  updateState() {
    this.totalValue = 0;
    this.droppingList.forEach((item) => {
      item._updateState();
      this.totalValue += item.value;
    });
    this.hasClearButton = this.totalValue !== 0;

    this.inputContainer.classList.toggle('dropdown__input-container_opened', this.isOpened);
    this.droppingListContainer.classList.toggle('dropdown__list_opened', this.isOpened);
    if (this.clearButton) this.clearButton.classList.toggle('dropdown__clear-button_visible', this.hasClearButton);

    this._calculateTotalValue();
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

    this.words = new Map([
      ['гость', ['гость', 'гостя', 'гостей']],
      ['спальни', ['спальня', 'спальни', 'спален']],
      ['кровати', ['кровать', 'кровати', 'кроватей']],
      ['ванные комнаты', ['ванная комната', 'ванные комнаты', 'ванных комнат']],
      ['младенец', ['младенец', 'младенца', 'младенцев']],
    ]);
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
      if (item.name.toLowerCase() !== 'младенцы') {
        return previousValue + item.value;
      }
      babiesCount = item.value;
      return previousValue;
    }, 0);

    this._setInputValue(babiesCount);
  }

  _setInputValue(babiesCount) {
    if (this.withTotalValue) {
      if (babiesCount !== 0) {
        const mainText = `${this.totalValue} ${doDeclensionOfWord(this.totalValue, this.words.get('гость'))}`;
        const fullText = `${mainText}, ${babiesCount} ${doDeclensionOfWord(babiesCount, this.words.get('младенец'))}`;
        this.input.value = fullText;
      } else if (this.totalValue !== 0) {
        this.input.value = `${this.totalValue} ${doDeclensionOfWord(this.totalValue, this.words.get('гость'))}`;
      } else {
        this.input.value = 'Сколько гостей';
      }
    } else {
      if (this.totalValue !== 0) {
        const result = this.droppingList.reduce((fullString, item, index) => {
          const itemName = item.name;
          const itemValue = item.value;

          if (index !== this.droppingList.length - 1) {
            return `${fullString}${itemValue} ${doDeclensionOfWord(itemValue, this.words.get(itemName))}, `;
          }
          return `${fullString}${itemValue} ${doDeclensionOfWord(itemValue, this.words.get(itemName))}`;
        }, '');
        this.input.value = result;
      } else {
        this.input.value = 'Сколько комнат';
      }
    }
  }

  _handleDropdownClick = () => {
    this.isOpened = !this.isOpened;
    this.updateState();
  }

  _handleClearButtonClick = () => {
    this.hasClearButton = false;
    this.droppingList.forEach((item) => {
      item.value = 0;
    });
    this.updateState();
  }

  _handleApplyButtonClick = () => {
    this.isOpened = false;
    this.updateState();
  }

  _handleDropdownLeave = (event) => {
    const dropwdown = event.target.closest('.dropdown');
    if (!dropwdown) {
      this.isOpened = false;
      this.updateState();
    }
  }
}

export default Dropdown;
