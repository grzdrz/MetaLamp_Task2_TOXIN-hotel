/* eslint-disable no-unused-vars */
import '../../base/base';
import 'air-datepicker';
import 'air-datepicker/dist/css/datepicker.css';
import jQuery from 'jquery';
import RoomFinderForm from '../../../components/room-finder-form/room-finder-form';
import SignUpForm from '../../../components/sign-up-form/sign-up-form';
import RoomInfo from '../../../components/room-info/room-info';
import PriceCalculationForm from '../../../components/price-calculation-form/price-calculation-form';
import './cards.scss';

const $ = jQuery;
global.jQuery = $;
global.$ = $;

const roomFinderForms = Array.from(document.querySelectorAll('.js-cards__room-finder-form'))
  .map((element) => new RoomFinderForm(element));

const signUpForms = Array.from(document.querySelectorAll('.js-cards__sign-up-form'))
  .map((element) => new SignUpForm(element));

const priceCalculationForms = Array.from(document.querySelectorAll('.js-cards__price-calculation-form'))
  .map((element) => new PriceCalculationForm(element));

const roomInfos = Array.from(document.querySelectorAll('.js-cards__room-info'))
  .map((element) => new RoomInfo(element));

const staticDatepicker = $('.js-cards__datepicker').datepicker({
  range: true,
  position: 'bottom left',
  navTitles: {
    days: 'MM yyyy',
  },
  autoClose: false,
  onShow(datepickerInstance, animationCompleted) {
    if (!animationCompleted) {
      if (!datepickerInstance.$datepicker.find('.calendar__buttons').html()) {
        datepickerInstance.$datepicker.append(
          `<div class="calendar__buttons">
              <p class="calendar__clear-button">очистить</p>
              <p class="calendar__apply-button">применить</p>
          </div>`,
        );
        datepickerInstance.$datepicker.find('.datepicker--pointer').css('display', 'none');
      }
    }
  },
}).data('datepicker');
staticDatepicker.show();
