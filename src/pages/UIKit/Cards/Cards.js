require.context('../../../', true, /\.(png|svg|jpg)$/);

import 'material-design-icons/iconfont/material-icons.css';

import { roomInfoScript } from "../../../components/Cards.RoomInfo/RoomInfo.js";
roomInfoScript();

import PriceCalculator from "../../../components/Cards.priceCalculationForm/PriceCalculationForm";
const priceCalculatorForm = document.querySelector(".cards__form-container-3");
const priceCalculator = new PriceCalculator(priceCalculatorForm);


let staticDatepicker = $(".cards__date-picker-container").datepicker({
    range: true,
    position: 'bottom left',
    navTitles: {
        days: 'MM yyyy',
    },
    autoClose: false,
    onShow: function (dp, animationCompleted) {
        if (!animationCompleted) {
            if (!dp.$datepicker.find('.date-input__buttons').html()) {
                dp.$datepicker.append(
                    '<div class="date-input__buttons">' +
                    '<p class="date-input__clear-button">очистить</p>' +
                    '<p class="date-input__apply-button">применить</p>' +
                    '</div>'
                );
                dp.$datepicker.find('.datepicker--pointer').css("display", "none");
            }
        }
    }
}).data('datepicker');
staticDatepicker.show();


import "./Cards.scss";