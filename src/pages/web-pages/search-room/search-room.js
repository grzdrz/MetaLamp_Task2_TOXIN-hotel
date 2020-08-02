/* eslint-disable no-unused-vars */
import "material-design-icons/iconfont/material-icons.css";

import Dropdown from "../../../components/dropdown/dropdown";
import ExpandableCheckbox from "../../../components/checkbox-list/expandable-checkbox-list";
import Pagination from "../../../components/pagination/pagination";
import RangeSlider from "../../../components/range-slider/range-slider";
import Calendar from "../../../components/calendar/calendar";
import RoomInfo from "../../../components/room-info/room-info";

import "./search-room.scss";

require.context("../../../", true, /\.(png|svg|jpg)$/);

const dropdowns = Array.from(document.querySelectorAll(".js-search-room__dropdown"))
    .map((element) => new Dropdown(element));

const expandableCheckboxes = Array.from(document.querySelectorAll(".js-search-room__checkbox-container_expandable"))
    .map((element) => new ExpandableCheckbox(element));

const paginations = Array.from(document.querySelectorAll(".search-room__pagination-container"))
    .map((element) => new Pagination({
        pagesCount: 20,
        curPageNumber: 7,
        title: "pagination",
        itemsCount: 100,
    }, element));

const rangeSliderContainers = Array.from(document.querySelectorAll(".js-search-room__range-slider-container"));
const rangeSliders = rangeSliderContainers.map((element) => new RangeSlider(element));

const calendars = [];
const calendarsContainers = Array.from(document.querySelectorAll(".search-room__date-input-container"));
calendarsContainers.forEach((element) => {
    calendars.push(new Calendar(element));
});

const roomInfoElements = Array.from(document.querySelectorAll(".search-room__room-container"));
const roomsInfo = roomInfoElements.map((element) => new RoomInfo(element));
