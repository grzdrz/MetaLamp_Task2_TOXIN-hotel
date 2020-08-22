import Calendar from '../calendar/calendar';

class SignUpForm {
  constructor(outerContainerElement) {
    this.outerContainerElement = outerContainerElement;

    this._initialize();
  }

  _initialize() {
    this.containerElement = this.outerContainerElement.querySelector('.js-sign-up-form');

    const calendarContainer = this.containerElement.querySelector('.js-sign-up-form__calendar');
    this.calendar = new Calendar(calendarContainer);
  }
}

export default SignUpForm;
