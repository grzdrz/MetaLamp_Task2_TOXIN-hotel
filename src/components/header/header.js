class Header {
  constructor(container) {
    this.container = container;

    this._handleBurgerClick = this._handleBurgerClick.bind(this);

    this._initialize();
  }

  _initialize() {
    this.logoContainer = this.container.querySelector('.js-header__colored-logo');
    this.burger = this.container.querySelector('.js-header__burger');
    this.burgerElements = Array.from(this.burger.querySelectorAll('.js-header__burger-element'));
    this.navigationMenu = this.container.querySelector('.js-header__navigation-menu');
    this.buttons = this.container.querySelector('.js-header__buttons');
    this.userFullName = this.container.querySelector('.js-header__user-full-name');

    this.burger.addEventListener('click', this._handleBurgerClick);
    this._handleBurgerClick();
  }

  _handleBurgerClick() {
    this.logoContainer.classList.toggle('header__colored-logo_closed');
    this.burger.classList.toggle('header__burger_closed');
    this.burgerElements.forEach((element) => element.classList.toggle('header__burger-element_opened'));
    this.navigationMenu.classList.toggle('header__navigation-menu_closed');
    if (this.buttons) this.buttons.classList.toggle('header__buttons_closed');
    if (this.userFullName) this.userFullName.classList.toggle('header__user-full-name_closed');
  }
}

export default Header;
