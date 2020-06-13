import "../Cards.scss";

require.context('../', true, /\.(png|svg|jpg)$/);

import jQueryTest from 'jquery';
const $ = jQueryTest;
global.jQuery = $;
global.$ = $;

import 'air-datepicker';

import { dropdownScript } from "../FormElements.Dropdown/Dropdown.js";
dropdownScript();

import { dateInputScript } from "../FormElements.DateInput/DateInput.js";
dateInputScript();