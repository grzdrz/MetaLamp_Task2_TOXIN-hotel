//Подгружаем паг файл c шаблоном пагинации и js функцию getPagination скомпилированную через pug-loader.
//getPagination будет вызываться при клике по кнопке с соответствующим номером и компилировать новую html разметку 
//под этот номер, после чего эта новая разметка будет вставлена вместо старой(почти что как в реакте).

//P.S. Это в первую очередь демонстрационный скрипт, нужный для того чтобы заставить кнопки пагинации реагировать на клики по ним.
//Но в теории его можно использовать для одностраничных веб приложений, где элементы должны 
//определенным способом(в данном случае с помощью pug шаблонп) рендериться повторно без перезагрузки всей страницы.
export function paginationScript() {
    let getPaginationByPugCode = require("./paginationForJSRender.pug");
    {
        function setClickEventsToPagesLinks() {
            let paginations = document.querySelectorAll(".pagination");
            paginations.forEach(e => {
                let links = e.querySelectorAll(".pagination__pageLink");
                links.forEach(ee => {
                    ee.onclick = selectPage;
                });

                let leftArrow = e.querySelector(".pagination__leftArrow");
                if (leftArrow) leftArrow.onclick = selectPage;

                let rightArrow = e.querySelector(".pagination__rightArrow");
                if (rightArrow) rightArrow.onclick = selectPage;
            });
        }
        setClickEventsToPagesLinks();

        function selectPage(event) {
            event.preventDefault();

            /* потенциальный асинхронный запрос на сервер данных для требуемой страницы */
            /* if(запрос успешен? === false) return; */

            let selectedPageNumber = event.currentTarget.textContent;
            if (selectedPageNumber === "arrow_forward") {
                let classes = event.currentTarget.className.split(/\s/i);
                if (classes.includes("pagination__leftArrow")) {
                    let prevPage = --(event.currentTarget.parentElement.dataset.curPageNumber);
                    event.currentTarget.parentElement.parentElement.innerHTML = getPaginationByPugCode({
                        pagesCount: 20,
                        curPageNumber: prevPage,
                    });
                }
                else if (classes.includes("pagination__rightArrow")) {
                    let nextPage = ++(event.currentTarget.parentElement.dataset.curPageNumber);
                    event.currentTarget.parentElement.parentElement.innerHTML = getPaginationByPugCode({
                        pagesCount: 20,
                        curPageNumber: nextPage,
                    });
                }
            }
            else if (selectedPageNumber === "...") return;
            else {
                event.currentTarget.parentElement.dataset.curPageNumber = Number.parseInt(selectedPageNumber);
                event.currentTarget.parentElement.parentElement.innerHTML = getPaginationByPugCode({
                    pagesCount: 20,
                    curPageNumber: Number.parseInt(selectedPageNumber),
                });
            }
            //переустановка ивентов на обновленный объект пагинации, т.к. элемент был полностью пересоздан.
            //P.S. Данный метод переустанавливает обработчики для ивентов ВСЕХ пагинаций на странице, т.к. 
            //после перерендера элемента соответственно пропадает и ссылка на него через event.currentTarget...
            //Плюс т.к. подразумевается что на одной странице одна пагинация, то теоретически это допустимо.
            setClickEventsToPagesLinks();
        }
    }
}