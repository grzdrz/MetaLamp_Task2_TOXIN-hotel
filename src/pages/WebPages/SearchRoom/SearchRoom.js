require.context('../../../', true, /\.(png|svg|jpg)$/);

import 'material-design-icons/iconfont/material-icons.css';

//dropdown
import Dropdown from "../../../components/FormElements.Dropdown/Dropdown";
const dropdowns = Array.from(document.querySelectorAll(".js-search-room__dropdown"))
    .map(element => new Dropdown(element));

//dropdown checkbox
import ExpandableCheckbox from "../../../components/FormElements.CheckboxList/ExpandableCheckboxList";
const expandableCheckboxes = Array.from(document.querySelectorAll(".js-search-room__checkbox-container_expandable"))
    .map(element => new ExpandableCheckbox(element));


//pagination
import Pagination from "../../../components/FormElements.Pagination/Pagination";
const paginationContainer1 = document.querySelector(".search-room__pagination-container");
let pagesCount = 20;
let curPage = 7;
const pagination1 = new Pagination({
    pagesCount: pagesCount,
    curPageNumber: curPage,
    title: "pagination",
    bottomText: `1 – ${pagesCount} из 100+ вариантов аренды`,
}, paginationContainer1);


//rangeSlider
import { rangeSliderScript } from "../../../components/FormElements.RangeSlider/RangeSlider.js";
rangeSliderScript();


import DateInput from "../../../components/FormElements.DateInput/DateInput";
const calendars = [];
const calendarsContainers = Array.from(document.querySelectorAll(".search-room__date-input-container"));
calendarsContainers.forEach(element => {
    calendars.push(new DateInput(element));
});

import RoomInfo from "../../../components/room-info/room-info";
const roomInfoElements = Array.from(document.querySelectorAll(".search-room__room-container"));
const roomsInfo = roomInfoElements.map((element) => new RoomInfo(element));

import "./SearchRoom.scss";