import Dropdown from "../FormElements.Dropdown/Dropdown";
import DateInput from "../FormElements.DateInput/DateInput";

class FindRoomForm {
    constructor(outerContainerElement) {
        this.containerElement = outerContainerElement.querySelector(".find-room-form");

        const dropdownContainer = this.containerElement.querySelector(".find-room-form__dropdown");
        this.dropdown = new Dropdown(dropdownContainer);

        const calendarContainer = this.containerElement.querySelector(".find-room-form__calendar");
        this.calendar = new DateInput(calendarContainer);
    }
}

export default FindRoomForm;
