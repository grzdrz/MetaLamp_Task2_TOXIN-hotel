//Подгружаем паг файл c шаблоном пагинации и js функцию getPagination скомпилированную через pug-loader.
//getPagination будет вызываться при клике по кнопке с соответствующим номером и компилировать новую html разметку 
//под этот номер, после чего эта новая разметка будет вставлена вместо старой(почти что как в реакте).

//P.S. Это в первую очередь демонстрационный скрипт, нужный для того чтобы заставить кнопки пагинации реагировать на клики по ним.
//Но в теории его можно использовать для одностраничных веб приложений, где элементы должны 
//определенным способом(в данном случае с помощью pug шаблона) рендериться повторно без перезагрузки всей страницы.
class Pagination {
    constructor(options, containerElement) {
        this.options = {};
        Object.assign(this.options, options);
        
        this.containerElement = containerElement;

        this.paginationPugCode = require("./PaginationRender.pug");

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
