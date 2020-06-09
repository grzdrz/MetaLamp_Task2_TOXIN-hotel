const dateFormatOptions = { year: "numeric", month: "2-digit", day: "2-digit", };

export function setDateInputScript() {
    $(function () {
        let firstDateInput = $('.first-datepicker');
        let secondDateInput = $('.second-datepicker');

        let firstDatepicker = firstDateInput.datepicker({
            autoClose: true,
            minDate: new Date(),
            range: true,
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
            autoClose: true,
            minDate: new Date(),
            range: true,
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