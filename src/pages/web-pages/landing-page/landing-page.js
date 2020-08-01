require.context("../../../", true, /\.(png|svg|jpg)$/);
import "material-design-icons/iconfont/material-icons.css";
import RoomFindedForm from "../../../components/room-finder-form/room-finder-form";

const roomFindedFormContainer = document.querySelector(".landing-page__form-container");
const roomFindedForm = new RoomFindedForm(roomFindedFormContainer);

import "./landing-page.scss";
