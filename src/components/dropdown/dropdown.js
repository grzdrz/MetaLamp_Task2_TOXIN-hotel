import ListItem from './list-item';
import { doDeclensionOfWord } from '../../assets/helpers';

class Dropdown {
  constructor(outerContainerElement, isOpened = false) {
    this.outerContainerElement = outerContainerElement;
    this.isOpened = isOpened;
    this.hasClearButton = false;

    this._initialize();
    this._setEventHandlers();
    this.updateState();
  }

  updateState() {
    this.droppingItems.forEach((item) => {
      item.updateState();
    });
    this._calculateCommonValue();
    this._buildInputText();
    this._setInputValue();

    const hasCommonValue = this.commonValue !== 0;
    const haveItemsValues = this.droppingItems.find((item) => item.value > 0);
    this.hasClearButton = hasCommonValue && haveItemsValues;

    this.inputContainer.classList.toggle('dropdown__input-container_opened', this.isOpened);
    this.droppingListContainer.classList.toggle('dropdown__list_opened', this.isOpened);
    this.dropdownArrow.classList.toggle('dropdown__dropdown-arrow_opened', this.isOpened);
    if (this.clearButton) this.clearButton.classList.toggle('dropdown__clear-button_visible', this.hasClearButton);
  }

  _initialize() {
    this.containerElement = this.outerContainerElement.querySelector('.js-dropdown');

    this.commonNames = this.containerElement.dataset.commonNames.split(',').filter((name) => name);
    this.defaultText = this.containerElement.dataset.defaultText;

    this.inputContainer = this.containerElement.querySelector('.js-dropdown__input-container');
    this.input = this.containerElement.querySelector('.js-dropdown__input');
    this.dropdownArrow = this.containerElement.querySelector('.js-dropdown__dropdown-arrow');

    this.droppingListContainer = this.containerElement.querySelector('.js-dropdown__list');
    this.droppingItems = Array.from(this.droppingListContainer.querySelectorAll('.js-dropdown__list-item'))
      .map((itemElement) => new ListItem(itemElement, this));

    this.clearButton = this.containerElement.querySelector('.js-dropdown__clear-button');
    if (this.clearButton) this.hasClearButton = false;
    this.applyButton = this.containerElement.querySelector('.js-dropdown__apply-button');
  }

  _setEventHandlers() {
    this.input.addEventListener('click', this._handleDropdownClick);
    this.dropdownArrow.addEventListener('click', this._handleDropdownClick);
    if (this.clearButton) this.clearButton.addEventListener('click', this._handleClearButtonClick);
    if (this.applyButton) this.applyButton.addEventListener('click', this._handleApplyButtonClick);
    document.addEventListener('click', this._handleDropdownLeave);
  }

  _calculateCommonValue() {
    this.commonValue = this.droppingItems.reduce((previousValue, item) => {
      if (item.isCommon) return previousValue + item.value;
      return previousValue;
    }, 0);
  }

  _buildInputText() {
    const commonValueText = this.commonNames.length > 0 ? `${this.commonValue} ${doDeclensionOfWord(this.commonValue, this.commonNames)}` : '';
    const itemsValuesText = this.droppingItems.reduce((previousText, item, index) => {
      const canContinueText = this.commonNames.length === 0 || item.value !== 0;
      if (!item.isCommon && canContinueText) {
        return `${previousText}${index === 0 && !commonValueText ? '' : ', '}${item.value} ${doDeclensionOfWord(item.value, item.names)} `;
      }
      return previousText;
    }, '');
    const resultText = `${this.commonNames.length > 0 ? commonValueText : ''}${itemsValuesText} `;

    return resultText;
  }

  _setInputValue() {
    const hasCommonValue = this.commonValue !== 0;
    const haveItemsValues = this.droppingItems.find((item) => item.value > 0);
    if (hasCommonValue || haveItemsValues) {
      this.input.value = this._buildInputText();
    } else {
      this.input.value = this.defaultText;
    }
  }

  _handleDropdownClick = () => {
    this.isOpened = !this.isOpened;
    this.updateState();
  }

  _handleClearButtonClick = () => {
    this.hasClearButton = false;
    this.commonValue = 0;
    this.droppingItems.forEach((item) => {
      item.value = 0;
    });
    this.updateState();
  }

  _handleApplyButtonClick = () => {
    this.isOpened = false;
    this.updateState();
  }

  _handleDropdownLeave = (event) => {
    const dropwdown = event.target.closest('.js-dropdown');
    if (!dropwdown) {
      this.isOpened = false;
      this.updateState();
    }
  }
}

export default Dropdown;
