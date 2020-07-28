import Dropdown from "../FormElements.Dropdown/Dropdown";

import DateInput from "../FormElements.DateInput/DateInput";

class PriceCalculator {
    constructor(outerContainerElement) {
        this.containerElement = outerContainerElement.querySelector(".price-calculation-form");

        this.additionalServicesNumberElem = this.containerElement.querySelector(".price-calculation-form__additional-services-value");
        this.mainSum = this.containerElement.querySelector(".price-calculation-form__main-sum");
        this.roomRentalPrice = Number.parseInt(this.mainSum.dataset.value);

        const dropdownContainer = this.containerElement.querySelector(".price-calculation-form__dropdown-container");
        this.dropdown = new Dropdown(dropdownContainer);

        const dateInputContainer = this.containerElement.querySelector(".price-calculation-form__date-input-container");
        this.dateInput = new DateInput(dateInputContainer);

        this.totalSum = 0;
        this.additionalServicesSum = 0;
        this.roomsPriceSum = 0;

        this.dropdownInputChange = this.dropdownInputChange.bind(this);
        this.getNewHandlerSelectWrapper = this.getNewHandlerSelectWrapper.bind(this);
        this.getNewHandlerClearClickWrapper = this.getNewHandlerClearClickWrapper.bind(this);
        this.calculateAndSetTotalPrice = this.calculateAndSetTotalPrice.bind(this);

        this.initialize();
    }

    initialize() {
        this.dropdown.dropdownList.forEach(item => {
            item.minus.addEventListener("click", this.dropdownInputChange);
            item.plus.addEventListener("click", this.dropdownInputChange);
        });


        const datepicker = this.dateInput.datepickerInstance;
        const oldHandlerSelect = datepicker.selectDate;
        datepicker.selectDate = this.getNewHandlerSelectWrapper(oldHandlerSelect.bind(datepicker));

        const clearButton = datepicker.$datepicker[0].querySelector(".date-input__clear-button");
        const oldOnClear = clearButton.onclick;
        clearButton.onclick = this.getNewHandlerClearClickWrapper(oldOnClear);
    }

    dropdownInputChange() {
        this.additionalServicesSum = this.dropdown.totalValue * 100;
        this.additionalServicesNumberElem.textContent = this.additionalServicesSum + "₽";

        this.calculateAndSetTotalPrice();
    }

    getNewHandlerSelectWrapper(oldFunc) {
        return function (date) {
            oldFunc(date);

            const firstDateInput = this.dateInput.jqDateInputs.eq(0);
            const secondDateInput = this.dateInput.jqDateInputs.eq(1);
            const firstDate = firstDateInput[0].value;
            const secondDate = secondDateInput[0].value;
            if (firstDate && secondDate) {

                let dateStringsArray1 = firstDate.split(".");
                let date1 = new Date(dateStringsArray1[2], dateStringsArray1[1], dateStringsArray1[0]);
                let dateStringsArray2 = secondDate.split(".");
                let date2 = new Date(dateStringsArray2[2], dateStringsArray2[1], dateStringsArray2[0]);
                let dDate = Math.abs(date2 - date1);
                let daysCount = dDate / (1000 * 60 * 60 * 24);

                let daysField = this.containerElement.querySelector(".price-calculation-form__main-sum-formula");
                let splittedText = daysField.textContent.split(/\s/i);
                splittedText[2] = daysCount;
                let joinedText = splittedText.join(" ");
                daysField.textContent = " " + joinedText;

                let discountValue = this.containerElement.querySelector(".price-calculation-form__main-sum-result");

                this.roomsPriceSum = daysCount * this.roomRentalPrice;
                discountValue.textContent = this.roomsPriceSum + "₽";


                this.calculateAndSetTotalPrice();
            }
        }.bind(this);
    }

    getNewHandlerClearClickWrapper(oldFunc) {
        let newFunc = function (event) {
            oldFunc(event);

            this.roomsPriceSum = 0;

            this.calculateAndSetTotalPrice();
        };
        return newFunc.bind(this);
    }


    calculateAndSetTotalPrice() {
        let totalNumberField = this.containerElement.querySelector(".price-calculation-form__total-result-value");

        this.totalSum = this.additionalServicesSum + this.roomsPriceSum/* + скидка */;
        totalNumberField.textContent = this.totalSum + "₽";
    }
}

export default PriceCalculator;
