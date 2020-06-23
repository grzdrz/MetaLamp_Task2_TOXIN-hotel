require.context('../../../', true, /\.(png|svg|jpg)$/);

import 'material-design-icons/iconfont/material-icons.css';

import { dropdownScript } from "../../../components/FormElements.Dropdown/Dropdown.js";
dropdownScript();

import { dateInputScript } from "../../../components/FormElements.DateInput/DateInput.js";
dateInputScript();

import { roomInfoScript } from "../../../components/Cards.RoomInfo/RoomInfo.js";
roomInfoScript();

import { priceCalculationFormScript } from "../../../components/Cards.priceCalculationForm/PriceCalculationForm.js";
priceCalculationFormScript();


import "./Cards.scss";