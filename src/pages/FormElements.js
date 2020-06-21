require.context('../', true, /\.(png|svg|jpg)$/);

import jQueryTest from 'jquery';
const $ = jQueryTest;
global.jQuery = $;
global.$ = $;

import 'air-datepicker';
import 'air-datepicker/dist/css/datepicker.css';

import 'material-design-icons/iconfont/material-icons.css';

//dropdown
import { dropdownScript } from "../components/FormElements.Dropdown/Dropdown.js";
dropdownScript();

//dropdown checkbox
import { expandableCheckboxListScript } from "../components/FormElements.CheckboxList/ExpandableCheckboxList.js";
expandableCheckboxListScript();


//pagination
import { paginationScript } from "../components/FormElements.Pagination/Pagination.js";
paginationScript();


//rangeSlider
import { rangeSliderScript } from "../components/FormElements.RangeSlider/RangeSlider.js";
rangeSliderScript();


import { dateInputScript } from "../components/FormElements.DateInput/DateInput.js";
dateInputScript();


import "./FormElements.scss";