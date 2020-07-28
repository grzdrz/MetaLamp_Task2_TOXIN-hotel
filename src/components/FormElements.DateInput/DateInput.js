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

class DateInput {
    constructor(outerContainerElement) {
        this.outerContainerElement = outerContainerElement;
        this.containerElement = this.outerContainerElement.find(".date-input");

        this.isDouble = this.containerElement.hasClass("date-input_double");
        this.withRangePicking = this.containerElement.hasClass("date-input_with-range-picking");

        this.initialize();
    }

    initialize() {
        if (this.isDouble)
            this.setDoubleDatepicker();
        else if (this.withRangePicking)
            this.setSingleDatepickerWithRange();
        else
            this.singleDatepickerWithoutRange();
    }

    setDoubleDatepicker() {
        const dateInputs = this.containerElement.find(".date-input__datepicker-input");
        const firstDateInput = dateInputs.eq(0);
        const secondDateInput = dateInputs.eq(1);

        const doubleDatepicker = firstDateInput.datepicker({
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
                    let firstFormattedDate = new Intl.DateTimeFormat(dateFormatOptions1).format(doubleDatepicker.selectedDates[0]);
                    firstDateInput.prop("value", firstFormattedDate);
                }
                if (doubleDatepicker.selectedDates[1]) {
                    let secondFormattedDate = new Intl.DateTimeFormat(dateFormatOptions1).format(doubleDatepicker.selectedDates[1]);
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


    setSingleDatepickerWithRange() {
        const dateInputs = this.containerElement.find(".date-input__datepicker-input");
        const dateInput = dateInputs.eq(0);

        const datepickerInstance = dateInput.datepicker({
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
                if (datepickerInstance.selectedDates[0] && datepickerInstance.selectedDates[1]) {
                    let formattedDate1 = (new Intl.DateTimeFormat("ru-RU", dateFormatOptions2)
                        .format(datepickerInstance.selectedDates[0]))
                        .toString();
                    formattedDate1 = formattedDate1.slice(0, formattedDate1.length - 1);
                    let formattedDate2 = (new Intl.DateTimeFormat("ru-RU", dateFormatOptions2)
                        .format(datepickerInstance.selectedDates[1]))
                        .toString();
                    formattedDate2 = formattedDate2.slice(0, formattedDate2.length - 1);
                    dateInput.prop("value", formattedDate1 + " - " + formattedDate2);
                }
                else {
                    dateInput.prop("value", "");
                }
            },
        }).data('datepicker');
        datepickerInstance.show();
        datepickerInstance.hide();
    }

    singleDatepickerWithoutRange() {
        const dateInputs = this.containerElement.find(".date-input__datepicker-input");
        const dateInput = dateInputs.eq(0);

        const datepickerInstance = dateInput.datepicker({
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
        datepickerInstance.show();
        datepickerInstance.hide();
    }
}

export default DateInput;
