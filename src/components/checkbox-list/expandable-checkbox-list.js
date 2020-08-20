class ExpandableCheckbox {
    constructor(outerContainerElement, isClosed = true) {
        this.outerContainerElement = outerContainerElement;
        this.isClosed = isClosed;

        this._handleExpand = this._handleExpand.bind(this);

        this._initialize();
    }

    _initialize() {
        this.containerElement = this.outerContainerElement.querySelector('.js-checkbox-list');
        this.dropdownButton = this.containerElement.querySelector('.js-checkbox-list__title');
        this.list = this.containerElement.querySelector('.js-checkbox-list__list');
        this.dropdownArrow = this.containerElement.querySelector('.js-checkbox-list__dropdown-arrow');

        this.dropdownButton.addEventListener('click', this._handleExpand);

        this._changeState();
    }

    _changeState() {
        if (this.isClosed) {
            this.list.classList.toggle('checkbox-list__list_closed', true);
            this.dropdownArrow.classList.toggle('checkbox-list__dropdown-arrow_closed', true);
        } else {
            this.list.classList.toggle('checkbox-list__list_closed', false);
            this.dropdownArrow.classList.toggle('checkbox-list__dropdown-arrow_closed', false);
        }
    }

    _handleExpand() {
        if (this.isClosed) this.isClosed = false;
        else this.isClosed = true;
        this._changeState();
    }
}

export default ExpandableCheckbox;
