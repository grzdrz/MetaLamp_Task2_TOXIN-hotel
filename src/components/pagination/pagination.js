/* eslint-disable global-require */
class Pagination {
    constructor(options, outerContainerElement) {
        this.options = {};
        Object.assign(this.options, options);

        this.outerContainerElement = outerContainerElement;

        this.paginationPugCode = require("./pagination-for-render.pug");

        this.handlerSelectPage = this.handlerSelectPage.bind(this);
        this.setClickEventsToPagesLinks = this.setClickEventsToPagesLinks.bind(this);
        this.writeBottomText = this.writeBottomText.bind(this);

        this.initialize();
    }

    initialize() {
        this.outerContainerElement.innerHTML = this.paginationPugCode(this.options);
        this.writeBottomText();
        this.setClickEventsToPagesLinks();
    }

    setClickEventsToPagesLinks() {
        const links = this.outerContainerElement.querySelectorAll(".js-pagination__link");
        links.forEach((a) => {
            a.onclick = this.handlerSelectPage;
        });
    }

    writeBottomText() {
        const bottomTextElement = this.outerContainerElement.querySelector(".pagination__bottom-text");
        const firstItemCountNumber = Math.round(this.options.itemsCount / this.options.pagesCount) * (this.options.curPageNumber - 1) + 1;
        let lastItemCountNumber = Math.round(this.options.itemsCount / this.options.pagesCount) * this.options.curPageNumber;
        if (lastItemCountNumber > this.options.itemsCount) lastItemCountNumber = this.options.itemsCount;
        const itemsCountText = this.options.itemsCount > 100 ? "100+" : `${this.options.itemsCount}`;
        bottomTextElement.textContent = `${firstItemCountNumber} - ${lastItemCountNumber} из ${itemsCountText} вариантов аренды`;
    }

    handlerSelectPage(event) {
        event.preventDefault();

        const selectedPageNumber = event.currentTarget.dataset.pageNumber;
        if (selectedPageNumber === "leftArrow") {
            this.options.curPageNumber -= 1;
            this.outerContainerElement.innerHTML = this.paginationPugCode(this.options);
        } else if (selectedPageNumber === "rightArrow") {
            this.options.curPageNumber += 1;
            this.outerContainerElement.innerHTML = this.paginationPugCode(this.options);
        } else {
            this.options.curPageNumber = Number.parseInt(selectedPageNumber, 10);
            this.outerContainerElement.innerHTML = this.paginationPugCode(this.options);
        }

        this.writeBottomText();
        this.setClickEventsToPagesLinks();
    }
}

export default Pagination;
