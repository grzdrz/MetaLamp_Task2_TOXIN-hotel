require.context('../', true, /\.(png|svg|jpg)$/);

import jQueryTest from 'jquery';
const $ = jQueryTest;
global.jQuery = $;
global.$ = $;

import 'air-datepicker';
import 'air-datepicker/dist/css/datepicker.css';

import 'material-design-icons/iconfont/material-icons.css';

import { dropdownScript } from "../components/FormElements.Dropdown/Dropdown.js";
dropdownScript();

import { dateInputScript } from "../components/FormElements.DateInput/DateInput.js";
dateInputScript();

import { roomInfoScript } from "../components/Cards.RoomInfo/RoomInfo.js";
roomInfoScript();

import { priceCalculationFormScript } from "../components/Cards.priceCalculationForm/PriceCalculationForm.js";
priceCalculationFormScript();


import "./Cards.scss";