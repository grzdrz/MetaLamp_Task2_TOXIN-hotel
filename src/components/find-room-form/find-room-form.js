import Dropdown from "../dropdown/dropdown";
import Calendar from "../calendar/calendar";

class FindRoomForm {
    constructor(outerContainerElement) {
        this.containerElement = outerContainerElement.querySelector(".find-room-form");

        const dropdownContainer = this.containerElement.querySelector(".find-room-form__dropdown");
        this.dropdown = new Dropdown(dropdownContainer);

        const calendarContainer = this.containerElement.querySelector(".find-room-form__calendar");
        this.calendar = new Calendar(calendarContainer);
    }
}

export default FindRoomForm;
