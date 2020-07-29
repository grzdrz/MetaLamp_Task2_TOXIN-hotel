require.context('../../../', true, /\.(png|svg|jpg)$/);

import 'material-design-icons/iconfont/material-icons.css';

import { pieChartScript } from "../../../components/FormElements.PieChart/PieChart.js";
pieChartScript();

import PriceCalculationForm from "../../../components/price-calculation-form/price-calculation-form";
const priceCalculationFormContainer = document.querySelector(".room-details__price-calculation-form-container");
const priceCalculationForm = new PriceCalculationForm(priceCalculationFormContainer);

import "./RoomDetails.scss";