import Calendar from "../calendar/calendar";

class SignUpForm {
    constructor(outerContainerElement) {
        this.outerContainerElement = outerContainerElement;

        this.initialize();
    }

    initialize() {
        this.containerElement = this.outerContainerElement.querySelector(".sign-up-form");

        const calendarContainer = this.containerElement.querySelector(".sign-up-form__calendar");
        this.calendar = new Calendar(calendarContainer);
    }
}

export default SignUpForm;
