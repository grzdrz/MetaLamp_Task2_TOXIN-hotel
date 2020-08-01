require.context("../../../", true, /\.(png|svg|jpg)$/);
import "material-design-icons/iconfont/material-icons.css";
import Dropdown from "../../../components/dropdown/dropdown";
import ExpandableCheckbox from "../../../components/checkbox-list/expandable-checkbox-list";
import Pagination from "../../../components/pagination/pagination";
import RangeSlider from "../../../components/range-slider/range-slider";
import Calendar from "../../../components/calendar/calendar";
import PieChart from "../../../components/pie-chart/pie-chart";

const dropdowns = Array.from(document.querySelectorAll(".js-form-elements__dropdown"))
    .map(element => new Dropdown(element));

const expandableCheckboxes = Array.from(document.querySelectorAll(".js-form-elements__checkbox_expandable"))
    .map(element => new ExpandableCheckbox(element));

const paginations = Array.from(document.querySelectorAll(".js-form-elements__pagination"))
    .map((element) => {
        new Pagination({
            pagesCount: 15,
            curPageNumber: 1,
            title: "pagination",
            itemsCount: 100,
        }, element)
    });

const rangeSliderContainers = Array.from(document.querySelectorAll(".js-form-elements__range-slider"));
const rangeSliders = rangeSliderContainers.map((element) => new RangeSlider(element));

const calendars = [];
const calendarsContainers = Array.from(document.querySelectorAll(".js-form-elements__calendar"));
calendarsContainers.forEach(element => {
    calendars.push(new Calendar(element));
});

const pieChartContainer = document.querySelector(".js-form-elements__pie-chart");
const pieChart = new PieChart(pieChartContainer);

import "./form-elements.scss";