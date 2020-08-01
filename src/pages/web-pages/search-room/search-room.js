require.context("../../../", true, /\.(png|svg|jpg)$/);
import "material-design-icons/iconfont/material-icons.css";
import Dropdown from "../../../components/dropdown/dropdown";
import ExpandableCheckbox from "../../../components/checkbox-list/expandable-checkbox-list";
import Pagination from "../../../components/pagination/pagination";
import RangeSlider from "../../../components/range-slider/range-slider";
import Calendar from "../../../components/calendar/calendar";
import RoomInfo from "../../../components/room-info/room-info";

const dropdowns = Array.from(document.querySelectorAll(".js-search-room__dropdown"))
    .map(element => new Dropdown(element));

const expandableCheckboxes = Array.from(document.querySelectorAll(".js-search-room__checkbox-container_expandable"))
    .map(element => new ExpandableCheckbox(element));

const paginationContainer1 = document.querySelector(".search-room__pagination-container");
let pagesCount = 20;
let curPage = 7;
const pagination1 = new Pagination({
    pagesCount: pagesCount,
    curPageNumber: curPage,
    title: "pagination",
    bottomText: `1 – ${pagesCount} из 100+ вариантов аренды`,
}, paginationContainer1);

const rangeSliderContainers = Array.from(document.querySelectorAll(".js-search-room__range-slider-container"));
const rangeSliders = rangeSliderContainers.map((element) => new RangeSlider(element));

const calendars = [];
const calendarsContainers = Array.from(document.querySelectorAll(".search-room__date-input-container"));
calendarsContainers.forEach(element => {
    calendars.push(new Calendar(element));
});

const roomInfoElements = Array.from(document.querySelectorAll(".search-room__room-container"));
const roomsInfo = roomInfoElements.map((element) => new RoomInfo(element));

import "./search-room.scss";