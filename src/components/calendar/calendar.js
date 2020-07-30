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

class Calendar {
    constructor(outerContainerElement) {
        this.outerContainerElement = outerContainerElement;
        const jqOuterContainerElement = $("html").find(this.outerContainerElement);
        this.jqContainerElement = jqOuterContainerElement.find(".calendar");
        this.jqDateInputs = this.jqContainerElement.find(".calendar__input");

        this.isDouble = this.jqContainerElement.hasClass("calendar_double");
        this.withRangePicking = this.jqContainerElement.hasClass("calendar_with-range-picking");


        this.datepickerInstance = {};

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
        const firstDateInput = this.jqDateInputs.eq(0);
        const secondDateInput = this.jqDateInputs.eq(1);

        this.datepickerInstance = firstDateInput.datepicker({
            range: true,
            position: 'bottom left',
            navTitles: {
                days: 'MM yyyy',
            },
            onShow: function (dp, animationCompleted) {
                if (!animationCompleted) {
                    if (!dp.$datepicker.find('.calendar__buttons').html()) {
                        dp.$datepicker.append(
                            '<div class="calendar__buttons">' +
                            '<p class="calendar__clear-button">очистить</p>' +
                            '<p class="calendar__apply-button">применить</p>' +
                            '</div>'
                        );
                        dp.$datepicker[0].querySelector(".calendar__clear-button").onclick = (event) => {
                            dp.clear();
                        };
                        dp.$datepicker[0].querySelector(".calendar__apply-button").onclick = (event) => {
                            dp.hide();
                        };

                        dp.$datepicker.find('.datepicker--pointer').css("display", "none");

                        secondDateInput.bind('click', dp.show.bind(dp));
                    }
                }
            },
            onSelect: function (formattedDate, date, inst) {
                if (this.datepickerInstance.selectedDates[0]) {
                    let firstFormattedDate = new Intl.DateTimeFormat(dateFormatOptions1).format(this.datepickerInstance.selectedDates[0]);
                    firstDateInput.prop("value", firstFormattedDate);
                }
                if (this.datepickerInstance.selectedDates[1]) {
                    let secondFormattedDate = new Intl.DateTimeFormat(dateFormatOptions1).format(this.datepickerInstance.selectedDates[1]);
                    secondDateInput.prop("value", secondFormattedDate);
                }
                else {
                    firstDateInput.prop("value", "");
                    secondDateInput.prop("value", "");
                }
            }.bind(this),
        }).data('datepicker');
        this.datepickerInstance.show();
        this.datepickerInstance.hide();
    }


    setSingleDatepickerWithRange() {
        const dateInput = this.jqDateInputs.eq(0);

        this.datepickerInstance = dateInput.datepicker({
            range: true,
            position: 'bottom left',
            navTitles: {
                days: 'MM yyyy',
            },
            onShow: function (dp, animationCompleted) {
                if (!animationCompleted) {
                    if (!dp.$datepicker.find('.calendar__buttons').html()) {
                        dp.$datepicker.append(
                            '<div class="calendar__buttons">' +
                            '<p class="calendar__clear-button">очистить</p>' +
                            '<p class="calendar__apply-button">применить</p>' +
                            '</div>'
                        );
                        dp.$datepicker.find('.calendar__clear-button').click(function (event) {
                            dp.clear();
                        });
                        dp.$datepicker.find('.calendar__apply-button').click(function (event) {
                            dp.hide();
                        });

                        dp.$datepicker.find('.datepicker--pointer').css("display", "none");
                    }
                }
            },
            onSelect: function (formattedDate, date, inst) {
                if (this.datepickerInstance.selectedDates[0] && this.datepickerInstance.selectedDates[1]) {
                    let formattedDate1 = (new Intl.DateTimeFormat("ru-RU", dateFormatOptions2)
                        .format(this.datepickerInstance.selectedDates[0]))
                        .toString();
                    formattedDate1 = formattedDate1.slice(0, formattedDate1.length - 1);
                    let formattedDate2 = (new Intl.DateTimeFormat("ru-RU", dateFormatOptions2)
                        .format(this.datepickerInstance.selectedDates[1]))
                        .toString();
                    formattedDate2 = formattedDate2.slice(0, formattedDate2.length - 1);
                    dateInput.prop("value", formattedDate1 + " - " + formattedDate2);
                }
                else {
                    dateInput.prop("value", "");
                }
            }.bind(this),
        }).data('datepicker');
    }

    singleDatepickerWithoutRange() {
        const dateInput = this.jqDateInputs.eq(0);

        this.datepickerInstance = dateInput.datepicker({
            position: 'bottom left',
            navTitles: {
                days: 'MM yyyy',
            },
            onShow: function (dp, animationCompleted) {
                if (!animationCompleted) {
                    if (!dp.$datepicker.find('.calendar__buttons').html()) {
                        dp.$datepicker.append(
                            '<div class="calendar__buttons">' +
                            '<p class="calendar__clear-button">очистить</p>' +
                            '<p class="calendar__apply-button">применить</p>' +
                            '</div>'
                        );
                        dp.$datepicker.find('.calendar__clear-button').click(function (event) {
                            dp.clear();
                        });
                        dp.$datepicker.find('.calendar__apply-button').click(function (event) {
                            dp.hide();
                        });

                        dp.$datepicker.find('.datepicker--pointer').css("display", "none");
                    }
                }
            },
        }).data('datepicker');
    }
}

export default Calendar;