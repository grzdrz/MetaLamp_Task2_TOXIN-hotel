import Dropdown from "../dropdown/dropdown";
import Calendar from "../calendar/calendar";

class PriceCalculationForm {
    constructor(outerContainerElement) {
        this.containerElement = outerContainerElement.querySelector(".price-calculation-form");

        this.mainSum = this.containerElement.querySelector(".price-calculation-form__main-sum");
        this.mainSumFormula = this.containerElement.querySelector(".price-calculation-form__main-sum-formula");
        this.mainSumValue = this.containerElement.querySelector(".price-calculation-form__main-sum-result");
        this.services = this.containerElement.querySelector(".price-calculation-form__services");
        this.additionalServicesValue = this.containerElement.querySelector(".price-calculation-form__additional-services-value");
        this.totalResultValue = this.containerElement.querySelector(".price-calculation-form__total-result-value");

        const dropdownContainer = this.containerElement.querySelector(".price-calculation-form__dropdown");
        this.dropdown = new Dropdown(dropdownContainer);

        const calendarContainer = this.containerElement.querySelector(".price-calculation-form__calendar");
        this.calendar = new Calendar(calendarContainer);

        this.roomRentalPrice = Number.parseInt(this.mainSum.dataset.value);
        this.currencyType = this.mainSum.dataset.currencyType;
        this.discountValue = Number.parseInt(this.services.dataset.value);
        this.totalSum = 0;
        this.servicesSum = 0;
        this.roomRentalSum = 0;

        this.handlerDropdownInputChange = this.handlerDropdownInputChange.bind(this);
        this.getHandlerSelectWrapper = this.getHandlerSelectWrapper.bind(this);
        this.getHandlerClearClickWrapper = this.getHandlerClearClickWrapper.bind(this);
        this.setTotalPrice = this.setTotalPrice.bind(this);

        this.initialize();
    }

    initialize() {
        this.dropdown.dropdownList.forEach(item => {
            item.minus.addEventListener("click", this.handlerDropdownInputChange);
            item.plus.addEventListener("click", this.handlerDropdownInputChange);
        });


        const datepicker = this.calendar.datepickerInstance;
        const oldHandlerSelect = datepicker.selectDate;
        datepicker.selectDate = this.getHandlerSelectWrapper(oldHandlerSelect.bind(datepicker));

        const clearButton = datepicker.$datepicker[0].querySelector(".calendar__clear-button");
        const oldOnClear = clearButton.onclick;
        clearButton.onclick = this.getHandlerClearClickWrapper(oldOnClear);
    }

    handlerDropdownInputChange() {
        this.servicesSum = this.dropdown.totalValue * 100;
        this.additionalServicesValue.textContent = `${this.formateNumber(this.servicesSum)}${this.currencyType}`;

        this.setTotalPrice();
    }

    getHandlerSelectWrapper(oldHandler) {
        return function (date) {
            oldHandler(date);

            const firstDateInput = this.calendar.jqDateInputs.eq(0);
            const secondDateInput = this.calendar.jqDateInputs.eq(1);
            const firstDateValue = firstDateInput[0].value;
            const secondDateValue = secondDateInput[0].value;
            if (firstDateValue && secondDateValue) {
                const firstDateStrings = firstDateValue.split(".");
                const firstDate = new Date(firstDateStrings[2], firstDateStrings[1], firstDateStrings[0]);
                const secondDateStrings = secondDateValue.split(".");
                const secondDate = new Date(secondDateStrings[2], secondDateStrings[1], secondDateStrings[0]);
                const dDate = Math.abs(secondDate - firstDate);
                const daysCount = dDate / (1000 * 60 * 60 * 24);

                const splittedText = this.mainSumFormula.textContent.split("x");
                splittedText[1] = ` ${daysCount} ${this.doDeclensionOfWord(daysCount)}`;
                this.mainSumFormula.textContent = splittedText.join("x");

                this.roomRentalSum = daysCount * this.roomRentalPrice;
                this.mainSumValue.textContent = `${this.formateNumber(this.roomRentalSum)}${this.currencyType}`;

                this.setTotalPrice();
            }
        }.bind(this);
    }

    getHandlerClearClickWrapper(oldHandler) {
        return function (event) {
            oldHandler(event);

            this.roomRentalSum = 0;

            this.setTotalPrice();
        }.bind(this);
    }

    setTotalPrice() {
        this.totalSum = this.servicesSum + this.roomRentalSum - this.discountValue;
        if (this.totalSum < 0) this.totalSum = 0;
        this.totalResultValue.textContent = `${this.formateNumber(this.totalSum)}${this.currencyType}`;
    }

    formateNumber(number) {
        return number.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
    }

    doDeclensionOfWord(number) {
        const words = ["сутки", "суток", "суток"];

        if (number.toString()[number.toString().length - 1] === "1" && number !== 11)
            return words[0];
        else if ((number.toString()[number.toString().length - 1] > 1 && number.toString()[number.toString().length - 1] <= 4)
            && (number < 12 || number > 14))
            return words[1];
        else
            return words[2];
    }
}

export default PriceCalculationForm;
