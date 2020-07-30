require.context('../../../', true, /\.(png|svg|jpg)$/);

import 'material-design-icons/iconfont/material-icons.css';

import PieChart from "../../../components/pie-chart/pie-chart";
const pieChartContainer = document.querySelector(".js-form-elements__pie-chart-container");
const pieChart = new PieChart(pieChartContainer);

import PriceCalculationForm from "../../../components/price-calculation-form/price-calculation-form";
const priceCalculationFormContainer = document.querySelector(".room-details__price-calculation-form-container");
const priceCalculationForm = new PriceCalculationForm(priceCalculationFormContainer);

import "./RoomDetails.scss";