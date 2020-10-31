/* eslint-disable no-lonely-if */
import 'air-datepicker';
import 'air-datepicker/dist/css/datepicker.css';
import jQuery from 'jquery';

const $ = jQuery;
global.jQuery = $;
global.$ = $;

const dateFormatOptionsForDoubleInput = { year: 'numeric', month: '2-digit', day: '2-digit' };
const dateFormatOptionsForSingleInput = { month: 'short', day: '2-digit' };

class Calendar {
  constructor(outerContainerElement) {
    this.outerContainerElement = outerContainerElement;
    this.hasClearButton = false;

    this._initialize();
    this._selectDatapicker();
  }

  _initialize() {
    const $outerContainerElement = $('html').find(this.outerContainerElement);
    this.$containerElement = $outerContainerElement.find('.js-calendar');
    this.$dateInputs = this.$containerElement.find('.js-calendar__input');

    this.isDouble = this.$containerElement.hasClass('js-calendar_type_double');
    this.withRangePicking = this.$containerElement.hasClass('js-calendar_with-range-picking');
  }

  _selectDatapicker() {
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
      onShow: this._handleDatepickerShow,
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
      onShow: this._handleDatepickerShow,
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
      onShow: this._handleDatepickerShow,
      onSelect: this._handleSingleInputSelectRange,
    }).data('datepicker');
  }

  _handleDatepickerShow = (datepickerInstance, animationCompleted) => {
    if (!animationCompleted) {
      if (!datepickerInstance.$datepicker.find('.calendar__buttons').html()) {
        datepickerInstance.$datepicker.append(
          `<div class="calendar__buttons">
            <p class="calendar__clear-button js-calendar__clear-button">очистить</p>
            <p class="calendar__apply-button js-calendar__apply-button">применить</p>
          </div>`,
        );

        this.clearButton = datepickerInstance.$datepicker[0].querySelector('.js-calendar__clear-button');
        this.clearButton.addEventListener('click', this._handleClearButtonClick.bind(this, datepickerInstance));

        this.applyButton = datepickerInstance.$datepicker[0].querySelector('.js-calendar__apply-button');
        this.applyButton.addEventListener('click', this._handleApplyButtonClick.bind(this, datepickerInstance));

        datepickerInstance.$datepicker.find('.datepicker--pointer').css('display', 'none');

        if (this.dateInputTo) this.dateInputTo.bind('click', datepickerInstance.show.bind(datepickerInstance));
      }
    }
  }

  _handleDoubleInputSelectRange = (formattedDate, date, inst) => {
    if (inst.selectedDates[0]) {
      const firstFormattedDate = new Intl.DateTimeFormat(dateFormatOptionsForDoubleInput)
        .format(inst.selectedDates[0]);
      this.dateInputFrom.prop('value', firstFormattedDate);
    }
    if (inst.selectedDates[1]) {
      const secondFormattedDate = new Intl.DateTimeFormat(dateFormatOptionsForDoubleInput)
        .format(inst.selectedDates[1]);
      this.dateInputTo.prop('value', secondFormattedDate);
      this.hasClearButton = true;
    } else {
      this.dateInputFrom.prop('value', '');
      this.dateInputTo.prop('value', '');
      this.hasClearButton = false;
    }
    this._updateState();
  }

  _handleSingleInputSelectRange = (formattedDate, date, inst) => {
    if (this.withRangePicking) {
      if (inst.selectedDates[0] && inst.selectedDates[1]) {
        let formattedDateFrom = (new Intl.DateTimeFormat('ru-RU', dateFormatOptionsForSingleInput)
          .format(inst.selectedDates[0]))
          .toString();
        formattedDateFrom = formattedDateFrom.slice(0, formattedDateFrom.length - 1);
        let formattedDateTo = (new Intl.DateTimeFormat('ru-RU', dateFormatOptionsForSingleInput)
          .format(inst.selectedDates[1]))
          .toString();
        formattedDateTo = formattedDateTo.slice(0, formattedDateTo.length - 1);
        this.dateInput.prop('value', `${formattedDateFrom} - ${formattedDateTo}`);
        this.hasClearButton = true;
      } else {
        this.dateInput.prop('value', '');
        this.hasClearButton = false;
      }
    } else {
      if (inst.selectedDates[0]) {
        this.hasClearButton = true;
      } else {
        this.hasClearButton = false;
      }
    }

    this._updateState();
  }

  _handleClearButtonClick(datepickerInstance) {
    datepickerInstance.clear();
    this.hasClearButton = false;
    this._updateState();
  }

  _handleApplyButtonClick(datepickerInstance) {
    datepickerInstance.hide();
  }

  _updateState() {
    this.clearButton.classList.toggle('calendar__clear-button_visible', this.hasClearButton);
  }
}

export default Calendar;
