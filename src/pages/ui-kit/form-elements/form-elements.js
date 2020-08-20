/* eslint-disable no-unused-vars */
import '../../base/base';
import Dropdown from '../../../components/dropdown/dropdown';
import ExpandableCheckbox from '../../../components/checkbox-list/expandable-checkbox-list';
import Pagination from '../../../components/pagination/pagination';
import RangeSlider from '../../../components/range-slider/range-slider';
import Calendar from '../../../components/calendar/calendar';
import './form-elements.scss';

const dropdowns = Array.from(document.querySelectorAll('.js-form-elements__dropdown'))
    .map((element, index) => {
        if (index < 2) return new Dropdown(element);
        return new Dropdown(element, true);
    });

const expandableCheckboxes = Array.from(document.querySelectorAll('.js-form-elements__checkbox_expandable'))
    .map((element, index) => {
        if (index === 0) return new ExpandableCheckbox(element);
        return new ExpandableCheckbox(element, false);
    });

const paginations = Array.from(document.querySelectorAll('.js-form-elements__pagination'))
    .map((element) => new Pagination({
        title: 'pagination',
        pagesCount: 15,
        curPageNumber: 1,
        itemsCount: 180,
    }, element));

const rangeSliderContainers = Array.from(document.querySelectorAll('.js-form-elements__range-slider'));
const rangeSliders = rangeSliderContainers.map((element) => new RangeSlider(element));

const calendars = [];
const calendarsContainers = Array.from(document.querySelectorAll('.js-form-elements__calendar'));
calendarsContainers.forEach((element) => {
    calendars.push(new Calendar(element));
});
