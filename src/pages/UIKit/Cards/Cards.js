require.context('../../../', true, /\.(png|svg|jpg)$/);

import 'material-design-icons/iconfont/material-icons.css';

import { dropdownScript } from "../../../components/FormElements.Dropdown/Dropdown.js";
dropdownScript();

import { dateInputScript } from "../../../components/FormElements.DateInput/DateInput.js";
dateInputScript();

import { roomInfoScript } from "../../../components/Cards.RoomInfo/RoomInfo.js";
roomInfoScript();

import { priceCalculationFormScript } from "../../../components/Cards.priceCalculationForm/PriceCalculationForm.js";
priceCalculationFormScript();


let datepicker1 = $(".cards__date-picker-container").datepicker({
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
datepicker1.show();


import "./Cards.scss";