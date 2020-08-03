/* eslint-disable no-unused-vars */
import "air-datepicker";
import "air-datepicker/dist/css/datepicker.css";
import jQuery from "jquery";

import RoomFinderForm from "../../../components/room-finder-form/room-finder-form";
import SignUpForm from "../../../components/sign-up-form/sign-up-form";
import RoomInfo from "../../../components/room-info/room-info";
import PriceCalculationForm from "../../../components/price-calculation-form/price-calculation-form";

import "material-design-icons/iconfont/material-icons.css";

import "./cards.scss";

const $ = jQuery;
global.jQuery = $;
global.$ = $;

require.context("../../../", true, /\.(png|svg|jpg)$/);

const roomFinderFormContainer = document.querySelector(".cards__room-finder-form");
const roomFinderForm = new RoomFinderForm(roomFinderFormContainer);

const signUpFormContainer = document.querySelector(".cards__sign-up-form");
const signUpForm = new SignUpForm(signUpFormContainer);

const priceCalculationFormContainer = document.querySelector(".cards__price-calculation-form");
const priceCalculationForm = new PriceCalculationForm(priceCalculationFormContainer);

const roomInfoElements = Array.from(document.querySelectorAll(".cards__room-info"));
const roomsInfo = roomInfoElements.map((element) => new RoomInfo(element));

const staticDatepicker = $(".js-cards__datepicker").datepicker({
    range: true,
    position: "bottom left",
    navTitles: {
        days: "MM yyyy",
    },
    autoClose: false,
    onShow(dp, animationCompleted) {
        if (!animationCompleted) {
            if (!dp.$datepicker.find(".calendar__buttons").html()) {
                dp.$datepicker.append(
                    `<div class="calendar__buttons">
                    <p class="calendar__clear-button">очистить</p>
                    <p class="calendar__apply-button">применить</p>
                    </div>`,
                );
                dp.$datepicker.find(".datepicker--pointer").css("display", "none");
            }
        }
    },
}).data("datepicker");
staticDatepicker.show();
