require.context('../../../', true, /\.(png|svg|jpg)$/);

import 'material-design-icons/iconfont/material-icons.css';


import Dropdown from "../../../components/dropdown/dropdown";
const dropdowns = Array.from(document.querySelectorAll(".js-search-room__dropdown"))
    .map(element => new Dropdown(element));


import ExpandableCheckbox from "../../../components/checkbox-list/expandable-checkbox-list";
const expandableCheckboxes = Array.from(document.querySelectorAll(".js-search-room__checkbox-container_expandable"))
    .map(element => new ExpandableCheckbox(element));


import Pagination from "../../../components/pagination/pagination";
const paginationContainer1 = document.querySelector(".search-room__pagination-container");
let pagesCount = 20;
let curPage = 7;
const pagination1 = new Pagination({
    pagesCount: pagesCount,
    curPageNumber: curPage,
    title: "pagination",
    bottomText: `1 – ${pagesCount} из 100+ вариантов аренды`,
}, paginationContainer1);



import RangeSlider from "../../../components/range-slider/range-slider";
const rangeSliderContainers = Array.from(document.querySelectorAll(".js-search-room__range-slider-container"));
const rangeSliders = rangeSliderContainers.map((element) => new RangeSlider(element));


import Calendar from "../../../components/calendar/calendar";
const calendars = [];
const calendarsContainers = Array.from(document.querySelectorAll(".search-room__date-input-container"));
calendarsContainers.forEach(element => {
    calendars.push(new Calendar(element));
});


import RoomInfo from "../../../components/room-info/room-info";
const roomInfoElements = Array.from(document.querySelectorAll(".search-room__room-container"));
const roomsInfo = roomInfoElements.map((element) => new RoomInfo(element));

import "./SearchRoom.scss";