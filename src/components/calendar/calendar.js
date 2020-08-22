import 'air-datepicker';
import 'air-datepicker/dist/css/datepicker.css';
import jQuery from 'jquery';

const $ = jQuery;
global.jQuery = $;
global.$ = $;

const dateFormatOptions1 = { year: 'numeric', month: '2-digit', day: '2-digit' };
const dateFormatOptions2 = {
  month: 'short', day: '2-digit',
};

class Calendar {
  constructor(outerContainerElement) {
    this.outerContainerElement = outerContainerElement;

    this._handleShow = this._handleShow.bind(this);
    this._handleDoubleInputSelectRange = this._handleDoubleInputSelectRange.bind(this);
    this._handleSingleInputSelectRange = this._handleSingleInputSelectRange.bind(this);
    this._handleSelectSingleDate = this._handleSelectSingleDate.bind(this);

    this._initialize();
  }

  _initialize() {
    const $outerContainerElement = $('html').find(this.outerContainerElement);
    this.$containerElement = $outerContainerElement.find('.js-calendar');
    this.$dateInputs = this.$containerElement.find('.js-calendar__input');

    this.isDouble = this.$containerElement.hasClass('js-calendar_double');
    this.withRangePicking = this.$containerElement.hasClass('js-calendar_with-range-picking');

    this.datepickerInstance = {};

    if (this.isDouble) this._setDoubleDatepicker();
    else if (this.withRangePicking) this._setSingleDatepickerWithRange();
    else this._singleDatepickerWithoutRange();
  }

  _setDoubleDatepicker() {
    this.dateInputFrom = this.$dateInputs.eq(0);
    this.dateInputTo = this.$dateInputs.eq(1);

    this.datepickerInstance = this.dateInputFrom.datepicker({
      range: true,
      position: 'bottom left',
      navTitles: {
        days: 'MM yyyy',
      },
      minDate: new Date(),
      onShow: this._handleShow,
      onSelect: this._handleDoubleInputSelectRange,
    }).data('datepicker');
    this.datepickerInstance.show();
    this.datepickerInstance.hide();
  }

  _setSingleDatepickerWithRange() {
    this.dateInput = this.$dateInputs.eq(0);

    this.datepickerInstance = this.dateInput.datepicker({
      range: true,
      position: 'bottom left',
      navTitles: {
        days: 'MM yyyy',
      },
      minDate: new Date(),
      onShow: this._handleShow,
      onSelect: this._handleSingleInputSelectRange,
    }).data('datepicker');
  }

  _singleDatepickerWithoutRange() {
    this.dateInput = this.$dateInputs.eq(0);

    this.datepickerInstance = this.dateInput.datepicker({
      position: 'bottom left',
      navTitles: {
        days: 'MM yyyy',
      },
      onShow: this._handleShow,
      onSelect: this._handleSelectSingleDate,
    }).data('datepicker');
  }

  _handleShow(dp, animationCompleted) {
    if (!animationCompleted) {
      if (!dp.$datepicker.find('.calendar__buttons').html()) {
        dp.$datepicker.append(
          `<div class="calendar__buttons">
                    <p class="calendar__clear-button js-calendar__clear-button">очистить</p>
                    <p class="calendar__apply-button js-calendar__apply-button">применить</p>
                    </div>`,
        );

        const clearButton = dp.$datepicker[0].querySelector('.js-calendar__clear-button');
        clearButton.onclick = () => {
          dp.clear();
          dp.$datepicker[0].querySelector('.js-calendar__clear-button').style.display = 'none';
        };

        const applyButton = dp.$datepicker[0].querySelector('.js-calendar__apply-button');
        applyButton.onclick = () => {
          dp.hide();
        };

        dp.$datepicker.find('.datepicker--pointer').css('display', 'none');

        if (this.dateInputTo) this.dateInputTo.bind('click', dp.show.bind(dp));
      }
    }
  }

  _handleDoubleInputSelectRange(formattedDate, date, inst) {
    if (inst.selectedDates[0]) {
      const firstFormattedDate = new Intl.DateTimeFormat(dateFormatOptions1)
        .format(inst.selectedDates[0]);
      this.dateInputFrom.prop('value', firstFormattedDate);
    }
    if (inst.selectedDates[1]) {
      const secondFormattedDate = new Intl.DateTimeFormat(dateFormatOptions1)
        .format(inst.selectedDates[1]);
      this.dateInputTo.prop('value', secondFormattedDate);
      inst.$datepicker[0].querySelector('.js-calendar__clear-button').style.display = 'block';
    } else {
      this.dateInputFrom.prop('value', '');
      this.dateInputTo.prop('value', '');
      inst.$datepicker[0].querySelector('.js-calendar__clear-button').style.display = 'none';
    }
  }

  _handleSingleInputSelectRange(formattedDate, date, inst) {
    if (inst.selectedDates[0] && inst.selectedDates[1]) {
      let formattedDate1 = (new Intl.DateTimeFormat('ru-RU', dateFormatOptions2)
        .format(inst.selectedDates[0]))
        .toString();
      formattedDate1 = formattedDate1.slice(0, formattedDate1.length - 1);
      let formattedDate2 = (new Intl.DateTimeFormat('ru-RU', dateFormatOptions2)
        .format(inst.selectedDates[1]))
        .toString();
      formattedDate2 = formattedDate2.slice(0, formattedDate2.length - 1);
      this.dateInput.prop('value', `${formattedDate1} - ${formattedDate2}`);
      inst.$datepicker[0].querySelector('.js-calendar__clear-button').style.display = 'block';
    } else {
      this.dateInput.prop('value', '');
      inst.$datepicker[0].querySelector('.js-calendar__clear-button').style.display = 'none';
    }
  }

  _handleSelectSingleDate(formattedDate, date, inst) {
    if (inst.selectedDates[0]) {
      inst.$datepicker[0].querySelector('.js-calendar__clear-button').style.display = 'block';
    } else {
      inst.$datepicker[0].querySelector('.js-calendar__clear-button').style.display = 'none';
    }
  }
}

export default Calendar;
