const dateFormatOptions = { year: "numeric", month: "2-digit", day: "2-digit", };

export function setDateInputScript() {
    $(function () {
        let firstDateInput = $('.dateInput__datepickerInput_first');
        let secondDateInput = $('.dateInput__datepickerInput_second');

        let firstDatepicker = firstDateInput.datepicker({
            /* todayButton: true,
            clearButton: true, */
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
                secondDatepicker.clear();//чистим соседний датапикер
                if (firstDatepicker.selectedDates[0]) {
                    let firstFormattedDate = new Intl.DateTimeFormat(dateFormatOptions).format(firstDatepicker.selectedDates[0]);
                    firstDateInput.prop("value", firstFormattedDate);
                }
                if (firstDatepicker.selectedDates[1]) {
                    let secondFormattedDate = new Intl.DateTimeFormat(dateFormatOptions).format(firstDatepicker.selectedDates[1]);
                    secondDateInput.prop("value", secondFormattedDate);
                }
                else {
                    firstDateInput.prop("value", "");
                    secondDateInput.prop("value", "");
                }
            },
        }).data('datepicker');

        let secondDatepicker = secondDateInput.datepicker({
            /* todayButton: true,
            clearButton: true, */
            range: true,
            position: 'bottom right',
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
                firstDatepicker.clear();//чистим соседний датапикер
                if (secondDatepicker.selectedDates[0]) {
                    let firstFormattedDate = new Intl.DateTimeFormat(dateFormatOptions).format(secondDatepicker.selectedDates[0]);
                    firstDateInput.prop("value", firstFormattedDate);
                }
                if (secondDatepicker.selectedDates[1]) {
                    let secondFormattedDate = new Intl.DateTimeFormat(dateFormatOptions).format(secondDatepicker.selectedDates[1]);
                    secondDateInput.prop("value", secondFormattedDate);
                }
                else {
                    firstDateInput.prop("value", "");
                    secondDateInput.prop("value", "");
                }
            },
        }).data('datepicker');
    });
}