import Dropdown from "../dropdown/dropdown";
import Calendar from "../calendar/calendar";

class RoomFinderForm {
    constructor(outerContainerElement) {
        this.containerElement = outerContainerElement.querySelector(".room-finder-form");

        const dropdownContainer = this.containerElement.querySelector(".room-finder-form__dropdown");
        this.dropdown = new Dropdown(dropdownContainer);

        const calendarContainer = this.containerElement.querySelector(".room-finder-form__calendar");
        this.calendar = new Calendar(calendarContainer);
    }
}

export default RoomFinderForm;
