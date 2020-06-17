export function priceCalculationFormScript() {
    let forms = document.querySelectorAll(".formDefault_priceCalculation");
    forms.forEach(e => {
        let plusButtons = e.querySelectorAll(".dropdown__dropedListItemHandlerPlus");
        let minusButtons = e.querySelectorAll(".dropdown__dropedListItemHandlerMinus");

        plusButtons.forEach(e => {
            e.addEventListener("click", inputChange);
        });
        minusButtons.forEach(e => {
            e.addEventListener("click", inputChange);
        });
    });

    function inputChange(event) {
        let dropdownContainer = event.currentTarget.closest(".dropdown");
        let curSum = dropdownContainer.dataset.curSum;

        let formContainer = dropdownContainer.closest(".formDefault");
        let additionalServicesNumberElem = formContainer.querySelector(".formDefault__additionalServicesPriceCalculated");
        let temp1 = Number.parseInt(curSum) * 100;
        additionalServicesNumberElem.textContent = temp1 + "₽";

        let totalNumberTextElem = formContainer.querySelector(".formDefault__inTotalNumber");

        let temp2;
        if (event.currentTarget.matches(".dropdown__dropedListItemHandlerMinus")) {
            if (Number.parseInt(totalNumberTextElem.dataset.totalNumber) <= 0) return;
            temp2 = Number.parseInt(totalNumberTextElem.dataset.totalNumber) - 100;
        }
        else
            temp2 = Number.parseInt(totalNumberTextElem.dataset.totalNumber) + 100;
        totalNumberTextElem.dataset.totalNumber = temp2;
        totalNumberTextElem.textContent = temp2 + "₽";
    }


    let test = $('.dateInput_double.priceCalculation__dateInput .dateInput__datepickerInput_first');
    let test2 = test.data('datepicker');
    //debugger;
    let oldOnSelect = test2.selectDate;
    test2.selectDate = getNewOnSelectWrapper(oldOnSelect.bind(test2));

    function getNewOnSelectWrapper(oldFunc) {
        return function (date/* formattedDate, date, inst */) {
            oldFunc(date/* formattedDate, date, inst */);


            let test3 = this.$el[0];
            let val1 = test3.value;
            let val2 = test3.closest(".dateInput").querySelector(".dateInput__datepickerInput_second").value;
            if (val1 && val2) {
                debugger;
                let d1 = val1.split(".");
                let d11 = new Date(d1[2], d1[1], d1[0]);
                let d2 = val2.split(".");
                let d22 = new Date(d2[2], d2[1], d2[0]);
                let d3 = Math.abs(d22 - d11);
                //debugger;
                let d4 = d3 / (1000 * 60 * 60 * 24);
                test3.closest(".formDefault").querySelector(".formDefault__inTotalNumber").textContent = d4;
            }
        };
    }
}