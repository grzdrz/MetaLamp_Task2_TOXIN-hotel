/* eslint-disable global-require */
class Pagination {
  constructor(options, outerContainerElement) {
    this.options = {};
    Object.assign(this.options, options);

    this.outerContainerElement = outerContainerElement;

    this.pugCode = require('./pagination-for-render.pug');

    this._handleLinkClick = this._handleLinkClick.bind(this);
    this._setEventHandlers = this._setEventHandlers.bind(this);
    this._writeBottomText = this._writeBottomText.bind(this);

    this._initialize();
  }

  _initialize() {
    this.outerContainerElement.innerHTML = this.pugCode(this.options);
    this._writeBottomText();
    this._setEventHandlers();
  }

  _setEventHandlers() {
    const links = this.outerContainerElement.querySelectorAll('.js-pagination__link');
    links.forEach((a) => {
      a.onclick = this._handleLinkClick;
    });
  }

  _writeBottomText() {
    const bottomTextElement = this.outerContainerElement.querySelector('.js-pagination__bottom-text');
    const firstItemCountNumber = Math.round(this.options.itemsCount / this.options.pagesCount) * (this.options.currentPageNumber - 1) + 1;
    let lastItemCountNumber = Math.round(this.options.itemsCount / this.options.pagesCount) * this.options.currentPageNumber;
    if (lastItemCountNumber > this.options.itemsCount) lastItemCountNumber = this.options.itemsCount;
    const itemsCountText = this.options.itemsCount > 100 ? '100+' : `${this.options.itemsCount}`;
    bottomTextElement.textContent = `${firstItemCountNumber} - ${lastItemCountNumber} из ${itemsCountText} вариантов аренды`;
  }

  _handleLinkClick(event) {
    event.preventDefault();

    const selectedPageNumber = event.currentTarget.dataset.pageNumber;
    if (selectedPageNumber === 'leftArrow') {
      this.options.currentPageNumber -= 1;
      this.outerContainerElement.innerHTML = this.pugCode(this.options);
    } else if (selectedPageNumber === 'rightArrow') {
      this.options.currentPageNumber += 1;
      this.outerContainerElement.innerHTML = this.pugCode(this.options);
    } else {
      this.options.currentPageNumber = Number.parseInt(selectedPageNumber, 10);
      this.outerContainerElement.innerHTML = this.pugCode(this.options);
    }

    this._writeBottomText();
    this._setEventHandlers();
  }
}

export default Pagination;
