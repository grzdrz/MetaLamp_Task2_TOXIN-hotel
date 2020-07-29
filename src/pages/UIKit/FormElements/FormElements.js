require.context('../../../', true, /\.(png|svg|jpg)$/);

import 'material-design-icons/iconfont/material-icons.css';

//dropdown
import Dropdown from "../../../components/FormElements.Dropdown/Dropdown";
const dropdowns = Array.from(document.querySelectorAll(".js-form-elements__dropdown-container"))
    .map(element => new Dropdown(element));

//dropdown checkbox
import ExpandableCheckbox from "../../../components/FormElements.CheckboxList/ExpandableCheckboxList";
const expandableCheckboxes = Array.from(document.querySelectorAll(".js-form-elements__checkbox-container_expandable"))
    .map(element => new ExpandableCheckbox(element));


//paginations
import Pagination from "../../../components/FormElements.Pagination/Pagination";
const paginationContainer1 = document.querySelector(".js-form-elements__pagination-container-1");
let pagesCount = 20;
let curPage = 7;
const pagination1 = new Pagination({
    pagesCount: pagesCount,
    curPageNumber: curPage,
    title: "pagination",
    bottomText: `1 – ${pagesCount} из 100+ вариантов аренды`,
}, paginationContainer1);

const paginationContainer2 = document.querySelector(".js-form-elements__pagination-container-2");
pagesCount = 10;
curPage = 1;
const pagination2 = new Pagination({
    pagesCount: pagesCount,
    curPageNumber: curPage,
    title: "pagination",
    bottomText: `1 – ${pagesCount} из 100+ вариантов аренды`,
}, paginationContainer2);


//rangeSlider
import { rangeSliderScript } from "../../../components/FormElements.RangeSlider/RangeSlider.js";
rangeSliderScript();


import DateInput from "../../../components/FormElements.DateInput/DateInput";
const calendars = [];
const calendarsContainers = Array.from(document.querySelectorAll(".js-form-elements__date-input-container"));
calendarsContainers.forEach(element => {
    calendars.push(new DateInput(element));
});

import { pieChartScript } from "../../../components/FormElements.PieChart/PieChart.js";
pieChartScript();

import "./FormElements.scss";