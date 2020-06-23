import jQueryTest from 'jquery';
const $ = jQueryTest;
global.jQuery = $;
global.$ = $;

import 'air-datepicker';
import 'air-datepicker/dist/css/datepicker.css';

const dateFormatOptions1 = { year: "numeric", month: "2-digit", day: "2-digit", };
const dateFormatOptions2 = {
    month: "short", day: "2-digit",
};
export function dateInputScript() {
    let firstDateInputs = $('.date-input_double.date-input_with-range-picking .date-input__datepicker-input_first');
    let secondDateInputs = $('.date-input_double.date-input_with-range-picking .date-input__datepicker-input_second');
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
                        if (!dp.$datepicker.find('.date-input__buttons').html()) {
                            dp.$datepicker.append(
                                '<div class="date-input__buttons">' +
                                '<p class="date-input__clear-button">очистить</p>' +
                                '<p class="date-input__apply-button">применить</p>' +
                                '</div>'
                            );
                            dp.$datepicker[0].querySelector(".date-input__clear-button").onclick = (event) => {
                                dp.clear();
                            };
                            dp.$datepicker[0].querySelector(".date-input__apply-button").onclick = (event) => {
                                dp.hide();
                            };

                            dp.$datepicker.find('.datepicker--pointer').css("display", "none");

                            secondDateInput.bind('click', dp.show.bind(dp));
                        }
                    }
                },
                onSelect: function (formattedDate, date, inst) {
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
            doubleDatepicker.show();
            doubleDatepicker.hide();
        }


    let dropdownDateInputs = $('.date-input_single.date-input_with-range-picking .date-input__datepicker-input');
    if (dropdownDateInputs)
        for (let i = 0; i < dropdownDateInputs.length; i++) {
            let dropdownDatepicker;
            let dropdownDateInput = dropdownDateInputs.eq(i);

            if (dropdownDateInput)
                dropdownDatepicker = dropdownDateInput.datepicker({
                    range: true,
                    position: 'bottom left',
                    navTitles: {
                        days: 'MM yyyy',
                    },
                    onShow: function (dp, animationCompleted) {
                        if (!animationCompleted) {
                            if (!dp.$datepicker.find('.date-input__buttons').html()) {
                                dp.$datepicker.append(
                                    '<div class="date-input__buttons">' +
                                    '<p class="date-input__clear-button">очистить</p>' +
                                    '<p class="date-input__apply-button">применить</p>' +
                                    '</div>'
                                );
                                dp.$datepicker.find('.date-input__clear-button').click(function (event) {
                                    dp.clear();
                                });
                                dp.$datepicker.find('.date-input__apply-button').click(function (event) {
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
        }

    let simpleDateInputs = $('.date-input_single.date-input_without-range-picking .date-input__datepicker-input');
    if (simpleDateInputs)
        for (let i = 0; i < simpleDateInputs.length; i++) {
            let simpleDatepicker;
            let simpleDateInput = simpleDateInputs.eq(i);

            simpleDatepicker = simpleDateInput.datepicker({
                position: 'bottom left',
                navTitles: {
                    days: 'MM yyyy',
                },
                onShow: function (dp, animationCompleted) {
                    if (!animationCompleted) {
                        if (!dp.$datepicker.find('.date-input__buttons').html()) {
                            dp.$datepicker.append(
                                '<div class="date-input__buttons">' +
                                '<p class="date-input__clear-button">очистить</p>' +
                                '<p class="date-input__apply-button">применить</p>' +
                                '</div>'
                            );
                            dp.$datepicker.find('.date-input__clear-button').click(function (event) {
                                dp.clear();
                            });
                            dp.$datepicker.find('.date-input__apply-button').click(function (event) {
                                dp.hide();
                            });

                            dp.$datepicker.find('.datepicker--pointer').css("display", "none");
                        }
                    }
                },
            }).data('datepicker');
        }
}