import { dropdownScript } from "../FormElements.Dropdown/Dropdown.js";
dropdownScript();

import { dateInputScript } from "../FormElements.DateInput/DateInput.js";
dateInputScript();

export function priceCalculationFormScript() {
    let forms = document.querySelectorAll(".price-calculation-form");
    forms.forEach(e => {
        let plusButtons = e.querySelectorAll(".dropdown__droped-list-item-handler-plus");
        let minusButtons = e.querySelectorAll(".dropdown__droped-list-item-handler-minus");

        plusButtons.forEach(e => {
            e.addEventListener("click", dropdownInputChange);
        });
        minusButtons.forEach(e => {
            e.addEventListener("click", dropdownInputChange);
        });
    });

    function dropdownInputChange(event) {
        let dropdownContainer = event.currentTarget.closest(".dropdown");
        let curSum = dropdownContainer.dataset.curSum;

        let formContainer = dropdownContainer.closest(".price-calculation-form");
        let additionalServicesNumberElem = formContainer
            .querySelector(".price-calculation-form__additional-services-price-calculated");
        let temp1 = Number.parseInt(curSum) * 100;
        additionalServicesNumberElem.textContent = temp1 + "₽";
        additionalServicesNumberElem.dataset.calculatedNumber = temp1;


        calculateAndSetTotalPrice(formContainer);
    }


    let firstDateInput = $('.price-calculation-form .date-input_double.date-input_with-range-picking .date-input__datepicker-input_first');
    let datepicker = firstDateInput.data('datepicker');
    let oldOnSelect = datepicker.selectDate;
    datepicker.selectDate = getNewOnSelectWrapper(oldOnSelect.bind(datepicker));

    function getNewOnSelectWrapper(oldFunc) {
        return function (date) {
            oldFunc(date);

            let firstDateInput = this.$el[0];
            let dateInputValue1 = firstDateInput.value;
            let dateInputValue2 = firstDateInput.closest(".date-input").querySelector(".date-input__datepicker-input_second").value;
            if (dateInputValue1 && dateInputValue2) {

                let dateStringsArray1 = dateInputValue1.split(".");
                let date1 = new Date(dateStringsArray1[2], dateStringsArray1[1], dateStringsArray1[0]);
                let dateStringsArray2 = dateInputValue2.split(".");
                let date2 = new Date(dateStringsArray2[2], dateStringsArray2[1], dateStringsArray2[0]);
                let dDate = Math.abs(date2 - date1);
                let daysCount = dDate / (1000 * 60 * 60 * 24);

                let formContainer = firstDateInput.closest(".price-calculation-form");
                let daysField = formContainer.querySelector(".price-calculation-form__price-multiply-period-of-time-description-days");
                let splittedText = daysField.textContent.split(/\s/i);
                splittedText[0] = daysCount;
                let joinedText = splittedText.join(" ");
                daysField.textContent = " " + joinedText;

                let numberField = formContainer
                    .querySelector(".price-calculation-form__price-multiply-period-of-time-description-number");
                let calculatedPriceField = formContainer
                    .querySelector(".price-calculation-form__price-multiply-period-of-time-price-calculated");
                calculatedPriceField.dataset.calculatedNumber = daysCount * Number.parseInt(numberField.dataset.number);
                calculatedPriceField.textContent = calculatedPriceField.dataset.calculatedNumber + "₽";


                calculateAndSetTotalPrice(formContainer);
            }
        };
    }


    function calculateAndSetTotalPrice(containerElem) {
        let totalNumberField = containerElem.querySelector(".price-calculation-form__in-total-number");

        let numberField1 = containerElem.querySelector(".price-calculation-form__price-multiply-period-of-time-price-calculated");
        let numberField2 = containerElem.querySelector(".price-calculation-form__services-discount-price-calculated");
        let numberField3 = containerElem.querySelector(".price-calculation-form__additional-services-price-calculated");

        totalNumberField.dataset.totalNumber =
            Number.parseInt(numberField1.dataset.calculatedNumber) +
            Number.parseInt(numberField2.dataset.calculatedNumber) +
            Number.parseInt(numberField3.dataset.calculatedNumber);
        totalNumberField.textContent = totalNumberField.dataset.totalNumber + "₽";
    }
}