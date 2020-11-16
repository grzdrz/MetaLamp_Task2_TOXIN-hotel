class NavigationMenu {
  constructor(container) {
    this.container = container;

    this._initialize();
    this._setEventsHandlers();
  }

  _initialize() {
    this.itemsElements = [...this.container.querySelectorAll('.js-navigation-menu__item')];
  }

  _setEventsHandlers() {
    this.itemsElements.forEach((itemElement) => {
      itemElement.addEventListener('click', this._handleItemClick);
      itemElement.addEventListener('touchend', this._handleItemClick, false);
    });
    document.addEventListener('click', this._handleItemLeave);
  }

  _handleItemClick = (event) => {
    event.preventDefault();

    const targetItemElement = event.target.closest('.js-navigation-menu__item');
    this.itemsElements.forEach((itemElement) => {
      if (targetItemElement === itemElement) itemElement.classList.toggle('navigation-menu__item_opened');
      else itemElement.classList.toggle('navigation-menu__item_opened', false);
    });
  };

  _handleItemLeave = (event) => {
    const item = event.target.closest('.js-navigation-menu__item');
    if (!item) {
      this.itemsElements.forEach((itemElement) => itemElement.classList.toggle('navigation-menu__item_opened', false));
    }
  };
}

export default NavigationMenu;
