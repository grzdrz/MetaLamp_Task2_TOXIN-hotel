/* eslint-disable no-unused-vars */
import "material-design-icons/iconfont/material-icons.css";

import PieChart from "../../../components/pie-chart/pie-chart";
import PriceCalculationForm from "../../../components/price-calculation-form/price-calculation-form";

import "./room-details.scss";

require.context("../../../", true, /\.(png|svg|jpg)$/);

const pieChart = Array.from(document.querySelectorAll(".js-form-elements__pie-chart"))
    .map((element) => new PieChart(element));

const priceCalculationForm = new PriceCalculationForm(document.querySelector(".room-details__price-calculation-form"));
