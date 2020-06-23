require.context('../../../', true, /\.(png|svg|jpg)$/);

import 'material-design-icons/iconfont/material-icons.css';

import { pieChartScript } from "../../../components/FormElements.PieChart/PieChart.js";
pieChartScript();

import { priceCalculationFormScript } from "../../../components/Cards.priceCalculationForm/PriceCalculationForm.js";
priceCalculationFormScript();

import "./RoomDetails.scss";