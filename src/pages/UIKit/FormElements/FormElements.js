require.context('../../../', true, /\.(png|svg|jpg)$/);

import 'material-design-icons/iconfont/material-icons.css';

//dropdown
import { dropdownScript } from "../../../components/FormElements.Dropdown/Dropdown.js";
dropdownScript();

//dropdown checkbox
import { expandableCheckboxListScript } from "../../../components/FormElements.CheckboxList/ExpandableCheckboxList.js";
expandableCheckboxListScript();


//paginations
import Pagination from "../../../components/FormElements.Pagination/Pagination";
const paginationContainer1 = document.querySelector(".js-form-elements__pagination-container-1");
const pagination1 = new Pagination({
    pagesCount: 20,
    curPageNumber: 7,
    title: "pagination",
    bottomText: "1 – 20 из 100+ вариантов аренды",
}, paginationContainer1);
const paginationContainer2 = document.querySelector(".js-form-elements__pagination-container-2");
const pagination2 = new Pagination({
    pagesCount: 10,
    curPageNumber: 7,
    title: "pagination",
    bottomText: "1 – 10 из 100+ вариантов аренды",
}, paginationContainer2);


//rangeSlider
import { rangeSliderScript } from "../../../components/FormElements.RangeSlider/RangeSlider.js";
rangeSliderScript();


import { dateInputScript } from "../../../components/FormElements.DateInput/DateInput.js";
dateInputScript();

import { pieChartScript } from "../../../components/FormElements.PieChart/PieChart.js";
pieChartScript();

import "./FormElements.scss";