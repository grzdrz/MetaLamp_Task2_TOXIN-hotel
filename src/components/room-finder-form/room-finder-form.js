import Dropdown from '../dropdown/dropdown';
import Calendar from '../calendar/calendar';

class RoomFinderForm {
    constructor(outerContainerElement) {
        this.outerContainerElement = outerContainerElement;

        this._initialize();
    }

    _initialize() {
        this.containerElement = this.outerContainerElement.querySelector('.js-room-finder-form');

        const dropdownContainer = this.containerElement.querySelector('.js-room-finder-form__dropdown');
        this.dropdown = new Dropdown(dropdownContainer);

        const calendarContainer = this.containerElement.querySelector('.js-room-finder-form__calendar');
        this.calendar = new Calendar(calendarContainer);
    }
}

export default RoomFinderForm;
