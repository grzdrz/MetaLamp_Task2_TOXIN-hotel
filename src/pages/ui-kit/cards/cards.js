require.context("../../../", true, /\.(png|svg|jpg)$/);
import "material-design-icons/iconfont/material-icons.css";
import FindRoomForm from "../../../components/find-room-form/find-room-form";
import SignUpForm from "../../../components/sign-up-form/sign-up-form";
import RoomInfo from "../../../components/room-info/room-info";
import PriceCalculationForm from "../../../components/price-calculation-form/price-calculation-form";

const findRoomFormContainer = document.querySelector(".cards__form-container-1");
const findRoomForm = new FindRoomForm(findRoomFormContainer);

const signUpFormContainer = document.querySelector(".cards__form-container-2");
const signUpForm = new SignUpForm(signUpFormContainer);

const roomInfoElements = Array.from(document.querySelectorAll(".cards__room-info-container"));
const roomsInfo = roomInfoElements.map((element) => new RoomInfo(element));

const priceCalculationFormContainer = document.querySelector(".cards__form-container-3");
const priceCalculationForm = new PriceCalculationForm(priceCalculationFormContainer);


const staticDatepicker = $(".cards__date-picker-container").datepicker({
    range: true,
    position: 'bottom left',
    navTitles: {
        days: 'MM yyyy',
    },
    autoClose: false,
    onShow: function (dp, animationCompleted) {
        if (!animationCompleted) {
            if (!dp.$datepicker.find('.calendar__buttons').html()) {
                dp.$datepicker.append(
                    '<div class="calendar__buttons">' +
                    '<p class="calendar__clear-button">очистить</p>' +
                    '<p class="calendar__apply-button">применить</p>' +
                    '</div>'
                );
                dp.$datepicker.find('.datepicker--pointer').css("display", "none");
            }
        }
    }
}).data('datepicker');
staticDatepicker.show();


import "./cards.scss";