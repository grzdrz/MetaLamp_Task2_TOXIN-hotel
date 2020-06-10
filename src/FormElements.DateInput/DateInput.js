const dateFormatOptions = { year: "numeric", month: "2-digit", day: "2-digit", };

export function setDateInputScript() {
    $(function () {
        let firstDateInput = $('.dateInput_double .dateInput__datepickerInput_first');
        let secondDateInput = $('.dateInput_double .dateInput__datepickerInput_second');
        let firstDatepicker;
        if (firstDateInput && secondDateInput)
            firstDatepicker = firstDateInput.datepicker({
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


        let dropdownDateInput = $('.dateInput_dropdown .dateInput__datepickerInput_first');
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
            }).data('datepicker');


        let simpleDateInput = $('.dateInput_simple .dateInput__datepickerInput_first');
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
    });
}