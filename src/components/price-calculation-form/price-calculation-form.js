import Dropdown from '../dropdown/dropdown';
import Calendar from '../calendar/calendar';

class PriceCalculationForm {
    constructor(outerContainerElement) {
        this.outerContainerElement = outerContainerElement;
        this.daysCount = 0;
        this.totalSum = 0;
        this.servicesSum = 0;
        this.roomRentalSum = 0;

        this._handleDropdownInputChange = this._handleDropdownInputChange.bind(this);
        this._getCalendarSelectWrapper = this._getCalendarSelectWrapper.bind(this);
        this._getCalendarClearClickWrapper = this._getCalendarClearClickWrapper.bind(this);

        this._initialize();
    }

    _initialize() {
        this.containerElement = this.outerContainerElement.querySelector('.js-price-calculation-form');

        this.mainSum = this.containerElement.querySelector('.js-price-calculation-form__main-sum');
        this.mainSumFormula = this.containerElement.querySelector('.js-price-calculation-form__main-sum-formula');
        this.mainSumValue = this.containerElement.querySelector('.js-price-calculation-form__main-sum-result');
        this.services = this.containerElement.querySelector('.js-price-calculation-form__services');
        this.additionalServicesValue = this.containerElement.querySelector('.js-price-calculation-form__additional-services-value');
        this.totalResultValue = this.containerElement.querySelector('.js-price-calculation-form__total-result-value');

        const dropdownContainer = this.containerElement.querySelector('.js-price-calculation-form__dropdown');
        this.dropdown = new Dropdown(dropdownContainer);

        const calendarContainer = this.containerElement.querySelector('.js-price-calculation-form__calendar');
        this.calendar = new Calendar(calendarContainer);

        this.roomRentalPrice = Number.parseInt(this.mainSum.dataset.value, 10);
        this.currencyType = this.mainSum.dataset.currencyType;
        this.discountValue = Number.parseInt(this.services.dataset.value, 10);

        this.dropdown.list.forEach((item) => {
            item.minus.addEventListener('click', this._handleDropdownInputChange);
            item.plus.addEventListener('click', this._handleDropdownInputChange);
        });
        this.dropdown.clearButton.addEventListener('click', this._handleDropdownInputChange);

        const datepicker = this.calendar.datepickerInstance;
        const oldHandlerSelect = datepicker.selectDate;
        datepicker.selectDate = this._getCalendarSelectWrapper(oldHandlerSelect.bind(datepicker));

        const clearButton = datepicker.$datepicker[0].querySelector('.js-calendar__clear-button');
        const oldOnClear = clearButton.onclick;
        clearButton.onclick = this._getCalendarClearClickWrapper(oldOnClear);
    }

    _handleDropdownInputChange() {
        this.servicesSum = this.dropdown.totalValue * 100;
        this._calculateTotalPrice();
    }

    _getCalendarSelectWrapper(oldHandler) {
        return function newHandler(date) {
            oldHandler(date);

            const firstDateInput = this.calendar.$dateInputs.eq(0);
            const secondDateInput = this.calendar.$dateInputs.eq(1);
            const firstDateValue = firstDateInput[0].value;
            const secondDateValue = secondDateInput[0].value;
            if (firstDateValue && secondDateValue) {
                const firstDateStrings = firstDateValue.split('.');
                const firstDate = new Date(firstDateStrings[2], firstDateStrings[1], firstDateStrings[0]);
                const secondDateStrings = secondDateValue.split('.');
                const secondDate = new Date(secondDateStrings[2], secondDateStrings[1], secondDateStrings[0]);
                const dDate = Math.abs(secondDate - firstDate);

                this.daysCount = dDate / (1000 * 60 * 60 * 24);
                this.roomRentalSum = this.daysCount * this.roomRentalPrice;

                this._calculateTotalPrice();
            }
        }.bind(this);
    }

    _getCalendarClearClickWrapper(oldHandler) {
        return function newHandler(event) {
            oldHandler(event);

            this.daysCount = 0;
            this.roomRentalSum = 0;

            this._calculateTotalPrice();
        }.bind(this);
    }

    _calculateTotalPrice() {
        this.totalSum = this.servicesSum + this.roomRentalSum - this.discountValue;
        if (this.totalSum < 0) this.totalSum = 0;

        this._render();
    }

    _render() {
        this.mainSumFormula.textContent = `${this.roomRentalPrice}${this.currencyType} x ${this.daysCount} ${this._doDeclensionOfWord(this.daysCount)}`;
        this.mainSumValue.textContent = `${this._formateNumber(this.roomRentalSum)}${this.currencyType}`;
        this.additionalServicesValue.textContent = `${this._formateNumber(this.servicesSum)}${this.currencyType}`;
        this.totalResultValue.textContent = `${this._formateNumber(this.totalSum)}${this.currencyType}`;
    }

    _formateNumber(number) {
        return number.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
    }

    _doDeclensionOfWord(number) {
        const words = ['сутки', 'суток', 'суток'];

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
}

export default PriceCalculationForm;
