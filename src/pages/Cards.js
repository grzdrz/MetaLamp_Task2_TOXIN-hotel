require.context('../', true, /\.(png|svg|jpg)$/);

import jQueryTest from 'jquery';
const $ = jQueryTest;
global.jQuery = $;
global.$ = $;

import 'air-datepicker';
import 'air-datepicker/dist/css/datepicker.css';

import 'material-design-icons/iconfont/material-icons.css';

import { dropdownScript } from "../FormElements.Dropdown/Dropdown.js";
dropdownScript();

import { dateInputScript } from "../FormElements.DateInput/DateInput.js";
dateInputScript();

import { roomInfoScript } from "../Cards.RoomInfo/RoomInfo.js";
roomInfoScript();

import { priceCalculationFormScript } from "../Cards.FormDefault/formsContent/priceCalculationForm.js";
priceCalculationFormScript();


import "./Cards.scss";