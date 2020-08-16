/* eslint-disable no-unused-vars */
import "../../base/base";
import "air-datepicker";
import "air-datepicker/dist/css/datepicker.css";
import jQuery from "jquery";
import RoomFinderForm from "../../../components/room-finder-form/room-finder-form";
import SignUpForm from "../../../components/sign-up-form/sign-up-form";
import RoomInfo from "../../../components/room-info/room-info";
import PriceCalculationForm from "../../../components/price-calculation-form/price-calculation-form";
import "./cards.scss";

const $ = jQuery;
global.jQuery = $;
global.$ = $;

const roomFinderForms = document.querySelector(".cards__room-finder-form")
    .map((element) => new RoomFinderForm(element));

const signUpForms = document.querySelector(".cards__sign-up-form")
    .map((element) => new SignUpForm(element));

const priceCalculationForms = document.querySelectorAll(".cards__price-calculation-form")
    .map((element) => new PriceCalculationForm(element));

const roomInfos = Array.from(document.querySelectorAll(".cards__room-info"))
    .map((element) => new RoomInfo(element));

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
