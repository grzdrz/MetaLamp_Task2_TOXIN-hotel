class Header {
  constructor(container) {
    this.container = container;

    this._handleBurgerClick = this._handleBurgerClick.bind(this);

    this._initialize();
  }

  _initialize() {
    this.logoContainer = this.container.querySelector('.js-header__colored-logo');
    this.burger = this.container.querySelector('.js-header__burger');
    this.navigationMenu = this.container.querySelector('.js-header__navigation-menu');
    this.buttons = this.container.querySelector('.js-header__buttons');
    this.userFullName = this.container.querySelector('.js-header__user-full-name');

    this.burger.addEventListener('click', this._handleBurgerClick);
  }

  _handleBurgerClick() {
    this.logoContainer.classList.toggle('header__colored-logo_opened');
    this.burger.classList.toggle('header__burger_opened');
    this.navigationMenu.classList.toggle('header__navigation-menu_opened');
    if (this.buttons) this.buttons.classList.toggle('header__buttons_opened');
    if (this.userFullName) this.userFullName.classList.toggle('header__user-full-name_opened');
  }
}

export default Header;
