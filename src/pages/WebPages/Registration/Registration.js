require.context('../../../', true, /\.(png|svg|jpg)$/);

import 'material-design-icons/iconfont/material-icons.css';

import SignUpForm from "../../../components/sign-up-form/sign-up-form";
const signUpFormContainer = document.querySelector(".cards__form-container-2");
const signUpForm = new SignUpForm(signUpFormContainer);

import "./Registration.scss";
