require.context('../../../', true, /\.(png|svg|jpg)$/);

import 'material-design-icons/iconfont/material-icons.css';


import Dropdown from "../../../components/dropdown/dropdown";
const dropdowns = Array.from(document.querySelectorAll(".js-form-elements__dropdown-container"))
    .map(element => new Dropdown(element));


import ExpandableCheckbox from "../../../components/checkbox-list/expandable-checkbox-list";
const expandableCheckboxes = Array.from(document.querySelectorAll(".js-form-elements__checkbox-container_expandable"))
    .map(element => new ExpandableCheckbox(element));


import Pagination from "../../../components/pagination/pagination";
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


import RangeSlider from "../../../components/range-slider/range-slider";
const rangeSliderContainers = Array.from(document.querySelectorAll(".js-form-elements__range-slider-container"));
const rangeSliders = rangeSliderContainers.map((element) => new RangeSlider(element));

import Calendar from "../../../components/calendar/calendar";
const calendars = [];
const calendarsContainers = Array.from(document.querySelectorAll(".js-form-elements__date-input-container"));
calendarsContainers.forEach(element => {
    calendars.push(new Calendar(element));
});

import PieChart from "../../../components/pie-chart/pie-chart";
const pieChartContainer = document.querySelector(".js-form-elements__pie-chart-container");
const pieChart = new PieChart(pieChartContainer);

import "./FormElements.scss";