require.context('../../../', true, /\.(png|svg|jpg)$/);

import 'material-design-icons/iconfont/material-icons.css';

//dropdown
import { dropdownScript } from "../../../components/FormElements.Dropdown/Dropdown.js";
dropdownScript();

//dropdown checkbox
import { expandableCheckboxListScript } from "../../../components/FormElements.CheckboxList/ExpandableCheckboxList.js";
expandableCheckboxListScript();


//pagination
import { paginationScript } from "../../../components/FormElements.Pagination/Pagination.js";
paginationScript();


//rangeSlider
import { rangeSliderScript } from "../../../components/FormElements.RangeSlider/RangeSlider.js";
rangeSliderScript();


import { dateInputScript } from "../../../components/FormElements.DateInput/DateInput.js";
dateInputScript();

import { pieChartScript } from "../../../components/FormElements.PieChart/PieChart.js";
pieChartScript();

import "./FormElements.scss";