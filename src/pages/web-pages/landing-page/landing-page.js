/* eslint-disable no-unused-vars */
import '../../base/base';
import Header from '../../../components/header/header';
import RoomFindedForm from '../../../components/room-finder-form/room-finder-form';
import './landing-page.scss';

const header = new Header(document.querySelector('.js-header'));
const roomFindedForm = new RoomFindedForm(document.querySelector('.js-landing-page__form'));
