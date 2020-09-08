/* eslint-disable no-unused-vars */
import '../../base/base';
import Header from '../../../components/header/header';
import SignUpForm from '../../../components/sign-up-form/sign-up-form';
import './registration.scss';

const header = new Header(document.querySelector('.js-header'));
const signUpForm = new SignUpForm(document.querySelector('.js-registration__form'));
