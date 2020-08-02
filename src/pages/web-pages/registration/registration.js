/* eslint-disable no-unused-vars */
import "material-design-icons/iconfont/material-icons.css";

import SignUpForm from "../../../components/sign-up-form/sign-up-form";

import "./registration.scss";

require.context("../../../", true, /\.(png|svg|jpg)$/);

const signUpFormContainer = document.querySelector(".cards__form-container-2");
const signUpForm = new SignUpForm(signUpFormContainer);
