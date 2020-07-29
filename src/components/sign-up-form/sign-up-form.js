import DateInput from "../FormElements.DateInput/DateInput";

class SignUpForm {
    constructor(outerContainerElement) {
        this.containerElement = outerContainerElement.querySelector(".sign-up-form");

        const calendarContainer = this.containerElement.querySelector(".sign-up-form__calendar");
        this.calendar = new DateInput(calendarContainer);
    }
}

export default SignUpForm;