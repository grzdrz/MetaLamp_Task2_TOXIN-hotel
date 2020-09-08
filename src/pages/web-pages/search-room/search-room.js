/* eslint-disable no-unused-vars */
import '../../base/base';
import Header from '../../../components/header/header';
import Dropdown from '../../../components/dropdown/dropdown';
import ExpandableCheckbox from '../../../components/checkbox-list/expandable-checkbox-list';
import Pagination from '../../../components/pagination/pagination';
import RangeSlider from '../../../components/range-slider/range-slider';
import Calendar from '../../../components/calendar/calendar';
import RoomInfo from '../../../components/room-info/room-info';
import './search-room.scss';

const header = new Header(document.querySelector('.js-header'));
const dropdowns = Array.from(document.querySelectorAll('.js-search-room__dropdown'))
  .map((element) => new Dropdown(element));

const expandableCheckboxes = Array.from(document.querySelectorAll('.js-search-room__checkbox_expandable'))
  .map((element) => new ExpandableCheckbox(element));

const paginations = Array.from(document.querySelectorAll('.js-search-room__pagination'))
  .map((element) => new Pagination({
    pagesCount: 15,
    currentPageNumber: 1,
    itemsCount: 180,
  }, element));

const rangeSliders = Array.from(document.querySelectorAll('.js-search-room__range-slider'))
  .map((element) => new RangeSlider(element));

const calendars = Array.from(document.querySelectorAll('.js-search-room__calendar'))
  .map((element) => new Calendar(element));

const roomsInfo = Array.from(document.querySelectorAll('.js-search-room__room-info'))
  .map((element) => new RoomInfo(element));
