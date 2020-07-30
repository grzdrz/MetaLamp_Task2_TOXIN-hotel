class Pagination {
    constructor(options, containerElement) {
        this.options = {};
        Object.assign(this.options, options);

        this.containerElement = containerElement;

        this.paginationPugCode = require("./pagination-for-render.pug");

        this.handlerSelectPage = this.handlerSelectPage.bind(this);
        this.setClickEventsToPagesLinks = this.setClickEventsToPagesLinks.bind(this);

        this.initialize();
    }

    initialize() {
        this.containerElement.innerHTML = this.paginationPugCode(this.options);
        this.setClickEventsToPagesLinks();
    }

    setClickEventsToPagesLinks() {
        const links = this.containerElement.querySelectorAll(".js-pagination__page-link");
        links.forEach(a => {
            a.onclick = this.handlerSelectPage;
        });
    }

    handlerSelectPage(event) {
        event.preventDefault();

        const selectedPageNumber = event.currentTarget.dataset.pageNumber;
        if (selectedPageNumber === "leftArrow") {
            const prevPage = this.options.curPageNumber - 1;
            this.options.curPageNumber = prevPage;
            this.containerElement.innerHTML = this.paginationPugCode(this.options);
        } else if (selectedPageNumber === "rightArrow") {
            const nextPage = this.options.curPageNumber + 1;
            this.options.curPageNumber = nextPage;
            this.containerElement.innerHTML = this.paginationPugCode(this.options);
        } else {
            this.options.curPageNumber = Number.parseInt(selectedPageNumber);
            this.containerElement.innerHTML = this.paginationPugCode(this.options);
        }

        this.setClickEventsToPagesLinks();
    }
}

export default Pagination;
