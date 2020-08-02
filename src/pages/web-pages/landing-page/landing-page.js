/* eslint-disable no-unused-vars */
import "material-design-icons/iconfont/material-icons.css";

import RoomFindedForm from "../../../components/room-finder-form/room-finder-form";

import "./landing-page.scss";

require.context("../../../", true, /\.(png|svg|jpg)$/);

const roomFindedFormContainer = document.querySelector(".landing-page__form-container");
const roomFindedForm = new RoomFindedForm(roomFindedFormContainer);
