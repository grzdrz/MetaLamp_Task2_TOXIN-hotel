require.context('../', true, /\.(png|svg|jpg)$/);

import jQueryTest from 'jquery';
const $ = jQueryTest;
global.jQuery = $;
global.$ = $;

import 'air-datepicker';
import 'air-datepicker/dist/css/datepicker.css';

import 'material-design-icons/iconfont/material-icons.css';

//dropdown
import { dropdownScript } from "../FormElements.Dropdown/Dropdown.js";
dropdownScript();

//dropdown
import { expandableCheckboxListScript } from "../FormElements.CheckboxList/ExpandableCheckboxList.js";
expandableCheckboxListScript();


//pagination
import { paginationScript } from "../FormElements.Pagination/Pagination.js";
paginationScript();


//rangeSlider
import { rangeSliderScript } from "../FormElements.RangeSlider/RangeSlider.js";
rangeSliderScript();


import { dateInputScript } from "../FormElements.DateInput/DateInput.js";
dateInputScript();


import "./FormElements.scss";