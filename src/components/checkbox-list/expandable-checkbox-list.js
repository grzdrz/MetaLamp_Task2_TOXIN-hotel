class ExpandableCheckbox {
  constructor(outerContainerElement, isClosed = true) {
    this.outerContainerElement = outerContainerElement;
    this.isClosed = isClosed;

    this._initialize();
    this._setEventHandlers();
    this._updateState();
  }

  _initialize() {
    this.containerElement = this.outerContainerElement.querySelector('.js-checkbox-list');
    this.dropdownButton = this.containerElement.querySelector('.js-checkbox-list__title');
    this.list = this.containerElement.querySelector('.js-checkbox-list__list');
    this.dropdownArrow = this.containerElement.querySelector('.js-checkbox-list__dropdown-arrow');
  }

  _setEventHandlers() {
    this.dropdownButton.addEventListener('click', this._handleCheckboxExpand);
    this.dropdownButton.addEventListener('touchend', this._handleCheckboxExpand);
  }

  _updateState() {
    this.list.classList.toggle('checkbox-list__list_closed', this.isClosed);
    this.dropdownArrow.classList.toggle('checkbox-list__dropdown-arrow_closed', this.isClosed);
  }

  _handleCheckboxExpand = (event) => {
    event.preventDefault();
    if (this.isClosed) this.isClosed = false;
    else this.isClosed = true;
    this._updateState();
  }
}

export default ExpandableCheckbox;
