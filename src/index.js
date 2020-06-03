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
//определенным способом(в данном случае с помощью pug шаблонп) рендериться повторно без перезагрузки всей страницы.
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


//rangeSlider
{
    let rangeSliders = document.querySelectorAll(".rangeSlider");
    rangeSliders.forEach(e => {
        let targetFirstSlider = e.querySelector(".rangeSlider__firstSlider");
        let targetLastSlider = e.querySelector(".rangeSlider__lastSlider");

        targetFirstSlider.ondragstart = function () {
            return false;
        };
        targetLastSlider.ondragstart = function () {
            return false;
        };

        targetFirstSlider.addEventListener("mousedown", sliderMouseDown);
        targetLastSlider.addEventListener("mousedown", sliderMouseDown);
    });

    //document.addEventListener("mousedown", sliderMouseDown);
    function sliderMouseDown(event) {
        //event.preventDefault();
        let targetObj;
        if (event.currentTarget.className) {
            let classArray = event.currentTarget.className.split(/\s/i);
            if (classArray.includes("rangeSlider__firstSlider") || classArray.includes("rangeSlider__lastSlider")) {
                targetObj = event.currentTarget;

                document.addEventListener("mousemove", mouseMove);
                document.addEventListener("mouseup", mouseUp);
            }
            else return;
        }
        else return;

        let otherSlider;
        let targetSliderIndex;
        //let otherSliderIndex;
        if (targetObj.className.split(/\s/i).includes("rangeSlider__firstSlider")) {
            targetSliderIndex = 0;
            //otherSliderIndex = 1;
            otherSlider = targetObj.parentElement.querySelector(".rangeSlider__lastSlider");
        }
        else {
            targetSliderIndex = 1;
            //otherSliderIndex = 0;
            otherSlider = targetObj.parentElement.querySelector(".rangeSlider__firstSlider");
        }

        //координаты полосы
        let containerCoordinates = targetObj.parentElement.getBoundingClientRect();
        //ширина полосы
        let containerWidth = targetObj.parentElement.clientWidth;

        //координаты захваченного ползунка
        let targetCoordinates = targetObj.getBoundingClientRect();
        //координаты захваченного ползунка
        let otherSliderCoordinates = otherSlider.getBoundingClientRect();
        //ширина ползунка
        let sliderWidth = targetObj.clientWidth;


        //расстояние между местом нажатия кнопки мыши внутри бегунка и левым краем бегунка
        let xMousePosInsideTargetObj = event.clientX - targetCoordinates.x;

        function mouseMove(event) {
            //event.preventDefault();
            let target_dX = Math.round(event.clientX - containerCoordinates.x - xMousePosInsideTargetObj);
            if (targetSliderIndex === 0) {
                targetObj.style.marginLeft = target_dX + "px";

                if (target_dX < 0)
                    targetObj.style.marginLeft = "0px";
                else if (target_dX + sliderWidth > containerWidth)
                    targetObj.style.marginLeft = containerWidth - sliderWidth + "px";

                let targetCoordinates2 = targetObj.getBoundingClientRect();
                if (targetCoordinates2.x + sliderWidth > otherSliderCoordinates.x)
                    targetObj.style.marginLeft = otherSliderCoordinates.x - containerCoordinates.x - sliderWidth + "px";
            }
            else if (targetSliderIndex === 1) {
                targetObj.style.marginLeft = target_dX + "px";

                if (target_dX < 0)
                    targetObj.style.marginLeft = "0px";
                else if (target_dX + sliderWidth > containerWidth)
                    targetObj.style.marginLeft = containerWidth - sliderWidth + "px";

                let targetCoordinates2 = targetObj.getBoundingClientRect();
                if (targetCoordinates2.x < otherSliderCoordinates.x + sliderWidth)
                    targetObj.style.marginLeft = otherSliderCoordinates.x - containerCoordinates.x + sliderWidth + "px";
            }
        }

        function mouseUp(event) {
            //event.preventDefault();
            document.removeEventListener("mousemove", mouseMove);
            document.removeEventListener("mouseup", mouseUp);
        }
    }
}