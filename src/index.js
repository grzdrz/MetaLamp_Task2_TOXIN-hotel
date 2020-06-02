import "./index.scss";


/* import jQueryTest from 'jquery';

const $ = jQueryTest;
global.jQuery = $;
global.$ = $;

import "./jquery-rate-picker.js"; 
import "./test.js"; */

//dropdown
{
    function onDropdown(event) {
        let targetDropdown = event.currentTarget.parentElement;
        let dropwdownList = targetDropdown.querySelector(".formInput__dropedList");

        if (dropwdownList.style.display === "none") {
            targetDropdown.style.borderBottomLeftRadius = "0px";
            targetDropdown.style.borderBottomRightRadius = "0px";
            dropwdownList.style.display = "flex";
        }
        else {
            targetDropdown.style.borderBottomLeftRadius = "4px";
            targetDropdown.style.borderBottomRightRadius = "4px";
            dropwdownList.style.display = "none";
        }
    }

    function onDropdownItemPlus(event) {
        let curValue = Number.parseInt(event.currentTarget.parentElement.querySelector("p").textContent);
        curValue++;
        if (curValue !== 0) event.currentTarget.parentElement.querySelector(".formInput__dropedListItemHandlerMinus").style.opacity = 1;
        event.currentTarget.parentElement.querySelector("p").textContent = curValue.toString();

        changeDropdownInputValue(event);
    }
    function onDropdownItemMinus(event) {
        let curValue = Number.parseInt(event.currentTarget.parentElement.querySelector("p").textContent);
        curValue--;
        if (curValue < 0) curValue = 0;
        if (curValue === 0) event.currentTarget.style.opacity = 0.38;
        event.currentTarget.parentElement.querySelector("p").textContent = curValue.toString();

        changeDropdownInputValue(event);
    }

    function changeDropdownInputValue(event) {
        let curDropdownElement = event.currentTarget.parentElement.parentElement.parentElement.parentElement;
        let dropdownList = curDropdownElement.querySelectorAll(".formInput__dropedListItem");
        let sum = Array.from(dropdownList).reduce((sum, e) => {
            return sum + Number.parseInt(e.querySelector(".formInput__dropedListItemHandler > p").textContent)
        }, 0);

        //склонение слова гость по числу
        let test = curDropdownElement.className.match(/formInput__dropdown_fullNumber/i);
        let test2 = curDropdownElement.className.match(/formInput__dropdown_listOfNumbers/i);
        if (curDropdownElement.className.match(/formInput__dropdown_fullNumber/i)) {
            if (sum.toString()[sum.toString().length - 1] === "1" && sum !== 11)
                curDropdownElement.parentElement.querySelector(".formInput__mainInput").value = sum + " гость";
            else if ((sum.toString()[sum.toString().length - 1] > 1 && sum.toString()[sum.toString().length - 1] <= 4) &&
                (sum < 12 || sum > 14))
                curDropdownElement.parentElement.querySelector(".formInput__mainInput").value = sum + " гостя";
            else
                curDropdownElement.parentElement.querySelector(".formInput__mainInput").value = sum + " гостей";
        }
        else if (curDropdownElement.className.match(/formInput__dropdown_listOfNumbers/i)) {
            let allItemNames = Array.from(curDropdownElement.querySelectorAll(".formInput__dropedListItem"));
            let result = allItemNames.reduce((fullString, e, index) => {
                let itemName = e.querySelector("p").textContent.toLowerCase();
                let itemValue = e.querySelector(".formInput__dropedListItemHandler > p").textContent;
                if (index !== allItemNames.length - 1)
                    return fullString + itemValue + " " + itemName + ", ";
                else
                    return fullString + itemValue + " " + itemName;
            }, "")
            curDropdownElement.parentElement.querySelector(".formInput__mainInput").value = result;
        }
    }

    let dropdownsElems = document.querySelectorAll(".formInput_dropdown");
    dropdownsElems.forEach(e => {
        e.querySelector(".formInput__dropdownInput").onclick = onDropdown;
        e.querySelectorAll(".formInput__dropedListItemHandlerPlus").forEach(e => {
            e.onclick = onDropdownItemPlus;
        });
        e.querySelectorAll(".formInput__dropedListItemHandlerMinus").forEach(e => {
            e.onclick = onDropdownItemMinus;
        });
    });
}

//rate button
{
    let rateButtons = document.querySelectorAll(".ratingRadio");
}

//pagination
//Подгружаем паг файл c шаблоном пагинации и js функцию getPagination скомпилированную через pug-loader.
//getPagination будет вызываться при клике по кнопке с соответствующим номером и компилировать новую html разметку 
//под этот номер, после чего эта новая разметка будет вставлена вместо старой(почти что как в реакте).

//P.S. Это в первую очередь демонстрационный скрипт, нужный для того чтобы заставить кнопки пагинации реагировать на клики по ним.
//Но в теории его можно использовать для одностраничных веб приложений, где элементы должны 
//определенным способом(в данном случае через pug) рендериться повторно без перезагрузки всей страницы.
let getPaginationByPugCode = require("./FormElements.Pagination/paginationForJSRender.pug");
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