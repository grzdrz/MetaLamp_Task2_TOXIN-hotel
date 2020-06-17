const dateFormatOptions1 = { year: "numeric", month: "2-digit", day: "2-digit", };
const dateFormatOptions2 = {
    month: "short", day: "2-digit",
};
export function dateInputScript() {
    /* $(function () { */
    let firstDateInputs = $('.dateInput_double .dateInput__datepickerInput_first');
    let secondDateInputs = $('.dateInput_double .dateInput__datepickerInput_second');
    if (firstDateInputs && secondDateInputs)
        for (let i = 0; i < firstDateInputs.length; i++) {
            let doubleDatepicker;
            let firstDateInput = firstDateInputs.eq(i);
            let secondDateInput = secondDateInputs.eq(i);

            doubleDatepicker = firstDateInput.datepicker({
                range: true,
                position: 'bottom left',
                navTitles: {
                    days: 'MM yyyy',
                },
                onShow: function (dp, animationCompleted) {
                    if (!animationCompleted) {
                        if (!dp.$datepicker.find('.dateInput__buttons').html()) {
                            dp.$datepicker.append(
                                '<div class="dateInput__buttons">' +
                                '<p class="dateInput__clearButton">очистить</p>' +
                                '<p class="dateInput__applyButton">применить</p>' +
                                '</div>'
                            );
                            dp.$datepicker.find('.dateInput__clearButton').click(function (event) {
                                dp.clear();
                            });
                            dp.$datepicker.find('.dateInput__applyButton').click(function (event) {
                                dp.hide();
                            });

                            dp.$datepicker.find('.datepicker--pointer').css("display", "none");

                            secondDateInput.bind('click', dp.show.bind(dp));
                        }
                    }
                },
                onSelect: function (formattedDate, date, inst) {
                    //debugger;
                    if (doubleDatepicker.selectedDates[0]) {
                        let firstFormattedDate = new Intl.DateTimeFormat(dateFormatOptions1)
                            .format(doubleDatepicker.selectedDates[0]);
                        firstDateInput.prop("value", firstFormattedDate);
                    }
                    if (doubleDatepicker.selectedDates[1]) {
                        let secondFormattedDate = new Intl.DateTimeFormat(dateFormatOptions1)
                            .format(doubleDatepicker.selectedDates[1]);
                        secondDateInput.prop("value", secondFormattedDate);
                    }
                    else {
                        firstDateInput.prop("value", "");
                        secondDateInput.prop("value", "");
                    }
                },
            }).data('datepicker');
        }

    //let test = firstDateInput.data('datepicker');


    let dropdownDateInput = $('.dateInput_dropdown .dateInput__datepickerInput');
    let dropdownDatepicker;
    if (dropdownDateInput)
        dropdownDatepicker = dropdownDateInput.datepicker({
            range: true,
            position: 'bottom left',
            navTitles: {
                days: 'MM yyyy',
            },
            onShow: function (dp, animationCompleted) {
                if (!animationCompleted) {
                    if (!dp.$datepicker.find('.dateInput__buttons').html()) {
                        dp.$datepicker.append(
                            '<div class="dateInput__buttons">' +
                            '<p class="dateInput__clearButton">очистить</p>' +
                            '<p class="dateInput__applyButton">применить</p>' +
                            '</div>'
                        );
                        dp.$datepicker.find('.dateInput__clearButton').click(function (event) {
                            dp.clear();
                        });
                        dp.$datepicker.find('.dateInput__applyButton').click(function (event) {
                            dp.hide();
                        });

                        dp.$datepicker.find('.datepicker--pointer').css("display", "none");
                    }
                }
            },
            onSelect: function (formattedDate, date, inst) {
                if (dropdownDatepicker.selectedDates[0] && dropdownDatepicker.selectedDates[1]) {
                    let formattedDate1 = (new Intl.DateTimeFormat("ru-RU", dateFormatOptions2)
                        .format(dropdownDatepicker.selectedDates[0]))
                        .toString();
                    formattedDate1 = formattedDate1.slice(0, formattedDate1.length - 1);
                    let formattedDate2 = (new Intl.DateTimeFormat("ru-RU", dateFormatOptions2)
                        .format(dropdownDatepicker.selectedDates[1]))
                        .toString();
                    formattedDate2 = formattedDate2.slice(0, formattedDate2.length - 1);
                    dropdownDateInput.prop("value", formattedDate1 + " - " + formattedDate2);
                }
                else {
                    dropdownDateInput.prop("value", "");
                }
            },
        }).data('datepicker');


    let simpleDateInput = $('.dateInput_simple .dateInput__datepickerInput');
    let simpleDatepicker;
    if (simpleDateInput)
        simpleDatepicker = simpleDateInput.datepicker({
            position: 'bottom left',
            navTitles: {
                days: 'MM yyyy',
            },
            onShow: function (dp, animationCompleted) {
                if (!animationCompleted) {
                    if (!dp.$datepicker.find('.dateInput__buttons').html()) {
                        dp.$datepicker.append(
                            '<div class="dateInput__buttons">' +
                            '<p class="dateInput__clearButton">очистить</p>' +
                            '<p class="dateInput__applyButton">применить</p>' +
                            '</div>'
                        );
                        dp.$datepicker.find('.dateInput__clearButton').click(function (event) {
                            dp.clear();
                        });
                        dp.$datepicker.find('.dateInput__applyButton').click(function (event) {
                            dp.hide();
                        });

                        dp.$datepicker.find('.datepicker--pointer').css("display", "none");
                    }
                }
            },
        }).data('datepicker');
    /* }); */
}