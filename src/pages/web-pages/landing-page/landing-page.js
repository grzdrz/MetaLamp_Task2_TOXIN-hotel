require.context("../../../", true, /\.(png|svg|jpg)$/);
import "material-design-icons/iconfont/material-icons.css";
import FindRoomForm from "../../../components/find-room-form/find-room-form";

const findRoomFormContainer = document.querySelector(".landing-page__form-container");
const findRoomForm = new FindRoomForm(findRoomFormContainer);

import "./landing-page.scss";
