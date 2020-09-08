/* eslint-disable no-unused-vars */
import '../../base/base';
import Header from '../../../components/header/header';
import './headers-and-footers.scss';

const headers = Array.from(document.querySelectorAll('.js-header'))
  .map((element) => new Header(element));
