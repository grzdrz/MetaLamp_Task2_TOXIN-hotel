export function priceCalculationFormScript() {
    let forms = document.querySelectorAll(".formDefault_priceCalculation");
    forms.forEach(e => {
        let plusButtons = e.querySelectorAll(".dropdown__dropedListItemHandlerPlus");
        let minusButtons = e.querySelectorAll(".dropdown__dropedListItemHandlerMinus");

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

        let formContainer = dropdownContainer.closest(".formDefault");
        let additionalServicesNumberElem = formContainer.querySelector(".formDefault__additionalServicesPriceCalculated");
        let temp1 = Number.parseInt(curSum) * 100;
        additionalServicesNumberElem.textContent = temp1 + "₽";
        additionalServicesNumberElem.dataset.calculatedNumber = temp1;


        calculateAndSetTotalPrice(formContainer);
    }


    let firstDateInput = $('.dateInput_double.priceCalculation__dateInput .dateInput__datepickerInput_first');
    let datepicker = firstDateInput.data('datepicker');
    let oldOnSelect = datepicker.selectDate;
    datepicker.selectDate = getNewOnSelectWrapper(oldOnSelect.bind(datepicker));

    function getNewOnSelectWrapper(oldFunc) {
        return function (date/* formattedDate, date, inst */) {
            oldFunc(date/* formattedDate, date, inst */);

            let firstDateInput = this.$el[0];
            let dateInputValue1 = firstDateInput.value;
            let dateInputValue2 = firstDateInput.closest(".dateInput").querySelector(".dateInput__datepickerInput_second").value;
            if (dateInputValue1 && dateInputValue2) {

                let dateStringsArray1 = dateInputValue1.split(".");
                let date1 = new Date(dateStringsArray1[2], dateStringsArray1[1], dateStringsArray1[0]);
                let dateStringsArray2 = dateInputValue2.split(".");
                let date2 = new Date(dateStringsArray2[2], dateStringsArray2[1], dateStringsArray2[0]);
                let dDate = Math.abs(date2 - date1);
                let daysCount = dDate / (1000 * 60 * 60 * 24);

                let formContainer = firstDateInput.closest(".formDefault");
                let daysField = formContainer.querySelector(".formDefault__priceMultiplyPeriodOfTimeDescriptionDays");
                let splittedText = daysField.textContent.split(/\s/i);
                splittedText[0] = daysCount;
                let joinedText = splittedText.join(" ");
                daysField.textContent = " " + joinedText;

                let numberField = formContainer.querySelector(".formDefault__priceMultiplyPeriodOfTimeDescriptionNumber");
                let calculatedPriceField = formContainer.querySelector(".formDefault__priceMultiplyPeriodOfTimePriceCalculated");
                calculatedPriceField.dataset.calculatedNumber = daysCount * Number.parseInt(numberField.dataset.number);
                calculatedPriceField.textContent = calculatedPriceField.dataset.calculatedNumber + "₽";


                calculateAndSetTotalPrice(formContainer);
            }
        };
    }


    function calculateAndSetTotalPrice(containerElem) {
        let totalNumberField = containerElem.querySelector(".formDefault__inTotalNumber");

        let numberField1 = containerElem.querySelector(".formDefault__priceMultiplyPeriodOfTimePriceCalculated");
        let numberField2 = containerElem.querySelector(".formDefault__servicesDiscountPriceCalculated");
        let numberField3 = containerElem.querySelector(".formDefault__additionalServicesPriceCalculated");

        totalNumberField.dataset.totalNumber =
            Number.parseInt(numberField1.dataset.calculatedNumber) +
            Number.parseInt(numberField2.dataset.calculatedNumber) +
            Number.parseInt(numberField3.dataset.calculatedNumber);
        totalNumberField.textContent = totalNumberField.dataset.totalNumber + "₽";
    }
}