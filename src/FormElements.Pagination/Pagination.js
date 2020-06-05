//Подгружаем паг файл c шаблоном пагинации и js функцию getPagination скомпилированную через pug-loader.
//getPagination будет вызываться при клике по кнопке с соответствующим номером и компилировать новую html разметку 
//под этот номер, после чего эта новая разметка будет вставлена вместо старой(почти что как в реакте).

//P.S. Это в первую очередь демонстрационный скрипт, нужный для того чтобы заставить кнопки пагинации реагировать на клики по ним.
//Но в теории его можно использовать для одностраничных веб приложений, где элементы должны 
//определенным способом(в данном случае с помощью pug шаблонп) рендериться повторно без перезагрузки всей страницы.
export function paginationScript() {
    let getPaginationByPugCode = require("./paginationForJSRender.pug");
    {
        let curPage = 1;

        function setClickEventsToLinks() {
            let paginations = document.querySelectorAll(".pagination");
            paginations.forEach(e => {
                let links = e.querySelectorAll(".pagination__pageLink");
                links.forEach(ee => {
                    ee.onclick = selectPage;
                })
            });
        }
        setClickEventsToLinks();

        function selectPage(event) {
            event.preventDefault();

            /* потенциальный асинхронный запрос на сервер данных для требуемой страницы */
            /* if(запрос успешен? === false) return; */

            curPage = Number.parseInt(event.currentTarget.textContent);
            event.currentTarget.parentElement.parentElement.innerHTML = getPaginationByPugCode({
                pagesCount: 20,
                curPage: curPage,
            });

            //переустановка ивентов на обновленный объект пагинации, т.к. элемент был полностью пересоздан.
            //P.S. Данный метод переустанавливает обработчики для ивентов ВСЕХ пагинаций на странице, т.к. 
            //после перерендера элемента соответственно пропадает и ссылка на него через event.currentTarget...
            //Плюс т.к. подразумевается что на одной странице одна пагинация, то теоретически это допустимо.
            setClickEventsToLinks();
        }
    }
}