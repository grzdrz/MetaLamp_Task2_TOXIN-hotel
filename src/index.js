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
    rateButtons.forEach(e => {
        e.querySelectorAll(".ratingRadio__label").forEach(ee => {
            ee.onclick = rateButtonClickHandler;
        });
    });

    function rateButtonClickHandler(event) {
        let curIndexNumberOfStar = event.currentTarget.dataset.indexNumber;
        let stars = event.currentTarget.parentElement;
        let test1 = Array.from(stars.querySelectorAll(".ratingRadio__label"));
        
        let test2 = test1.filter(e => e.dataset.indexNumber < curIndexNumberOfStar);
        test2.forEach(e => {
            let starInput = e.querySelector(".ratingRadio__input");
            starInput.className = "ratingRadio__input";//сбросили классы модификаторы
        });

        let test3 = test1.filter(e => e.dataset.indexNumber > curIndexNumberOfStar);
        test3.forEach(e => {
            let starInput = e.querySelector(".ratingRadio__input");
            starInput.className = "ratingRadio__input ratingRadio__input_unchecked";
        });
    }
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
    let targetMaxValue;
    let targetMinValue;
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



        let targetFirstInput = e.querySelector(".rangeSlider__firstInput");
        let targetLastInput = e.querySelector(".rangeSlider__lastInput");
        let targetMaxValueElem = e.querySelector(".rangeSlider__maxValueInput");
        let targetMinValueElem = e.querySelector(".rangeSlider__minValueInput");
        targetMaxValue = targetMaxValueElem.value;
        targetMinValue = targetMinValueElem.value;

        let slidersContainer = e.querySelector(".rangeSlider__sliderContainer");
        let slidersContainerCoords = slidersContainer.getBoundingClientRect();
        let slidersValueContainer = e.querySelector(".rangeSlider__sliderBodyFilled");
        let slidersValueContainerCoords = slidersContainer.getBoundingClientRect();
        let firstSlider = e.querySelector(".rangeSlider__firstSlider");
        let firstSliderCoords = firstSlider.getBoundingClientRect();
        let lastSlider = e.querySelector(".rangeSlider__lastSlider");
        let lastSliderCoords = lastSlider.getBoundingClientRect();

        let dFullValue = Number.parseInt(targetMaxValue) - Number.parseInt(targetMinValue);
        let dValue = Number.parseInt(targetLastInput.value) - Number.parseInt(targetFirstInput.value);
        let dSliderContainerValue = lastSliderCoords.x - firstSliderCoords.x;
        let dSliderContainerFullValue = slidersContainerCoords.width - firstSliderCoords.width * 2;

        //пропорция длин/координат ползунков к диапазонам значений/конкретным значениям инпутов
        let x1 = ((targetFirstInput.value * dSliderContainerFullValue) / dFullValue);
        let x2 = ((targetLastInput.value * dSliderContainerFullValue) / dFullValue) + lastSliderCoords.width;

        firstSlider.style.marginLeft = x1 + "px";
        lastSlider.style.marginLeft = x2 + "px";
        slidersValueContainer.style.width = x2 - x1 + "px";
        slidersValueContainer.style.marginLeft = x1 + firstSliderCoords.width / 2 + "px";
    });






    //document.addEventListener("mousedown", sliderMouseDown);
    function sliderMouseDown(event) {
        //event.preventDefault();
        let targetSlider;
        let targetSliderContainer;
        if (event.currentTarget.className) {
            let classArray = event.currentTarget.className.split(/\s/i);
            if (classArray.includes("rangeSlider__firstSlider") || classArray.includes("rangeSlider__lastSlider")) {
                targetSlider = event.currentTarget;
                targetSliderContainer = targetSlider.parentElement.parentElement;

                document.addEventListener("mousemove", mouseMove);
                document.addEventListener("mouseup", mouseUp);
            }
            else return;
        }
        else return;

        let otherSlider;
        let targetSliderIndex;
        //let otherSliderIndex;
        if (targetSlider.className.split(/\s/i).includes("rangeSlider__firstSlider")) {
            targetSliderIndex = 0;
            //otherSliderIndex = 1;
            otherSlider = targetSlider.parentElement.querySelector(".rangeSlider__lastSlider");
        }
        else {
            targetSliderIndex = 1;
            //otherSliderIndex = 0;
            otherSlider = targetSlider.parentElement.querySelector(".rangeSlider__firstSlider");
        }

        let filledBody = targetSlider.parentElement.querySelector(".rangeSlider__sliderBodyFilled");
        let filledBodyCoordinates = filledBody.getBoundingClientRect();

        //координаты полосы
        let containerCoordinates = targetSlider.parentElement.getBoundingClientRect();
        //ширина полосы
        let containerWidth = targetSlider.parentElement.clientWidth;

        //координаты захваченного ползунка
        let targetCoordinates = targetSlider.getBoundingClientRect();
        //координаты захваченного ползунка
        let otherSliderCoordinates = otherSlider.getBoundingClientRect();
        //ширина ползунка
        let sliderWidth = targetSlider.clientWidth;


        //расстояние между местом нажатия кнопки мыши внутри бегунка и левым краем бегунка
        let xMousePosInsideTargetSlider = event.clientX - targetCoordinates.x;

        function mouseMove(event) {
            //event.preventDefault();
            let target_dX = Math.round(event.clientX - containerCoordinates.x - xMousePosInsideTargetSlider);
            if (targetSliderIndex === 0) {
                targetSlider.style.marginLeft = target_dX + "px";

                if (target_dX < 0)
                    targetSlider.style.marginLeft = "0px";
                else if (target_dX + sliderWidth > containerWidth)
                    targetSlider.style.marginLeft = containerWidth - sliderWidth + "px";

                let targetCoordinates2 = targetSlider.getBoundingClientRect();
                if (targetCoordinates2.x + sliderWidth > otherSliderCoordinates.x)
                    targetSlider.style.marginLeft = otherSliderCoordinates.x - containerCoordinates.x - sliderWidth + "px";
                else {
                    filledBody.style.marginLeft = targetCoordinates2.x - containerCoordinates.x + sliderWidth / 2 + "px";
                    filledBody.style.width = otherSliderCoordinates.x - targetCoordinates2.x + "px";


                    //в первый инпут
                    let tempValue1 = targetCoordinates2.x - containerCoordinates.x /* + targetCoordinates2.width */;
                    let tempFullSliderValue = containerCoordinates.width - targetCoordinates2.width * 2;
                    //  tempValue1/tempFullSliderValue = x/fullInputValue => x = (fullInputValue*tempValue1)/tempFullSliderValue
                    let targetFirstInput = targetSliderContainer.querySelector(".rangeSlider__firstInput");
                    //let targetLastInput = e.querySelector(".rangeSlider__lastInput");
                    let targetMaxValueElem = targetSliderContainer.querySelector(".rangeSlider__maxValueInput");
                    let targetMinValueElem = targetSliderContainer.querySelector(".rangeSlider__minValueInput");
                    let fullInputValue = targetMaxValueElem.value - targetMinValueElem.value;
                    let newFirstInputValue = Math.round((fullInputValue * tempValue1) / tempFullSliderValue);

                    targetFirstInput.value = newFirstInputValue;

                    let titleRange = targetFirstInput.parentElement.parentElement.querySelector(".rangeSlider__rangeValue");
                    let titleRangeText = titleRange.textContent;
                    let splitedTitleRangeText = titleRangeText.split(/\s/i);
                    splitedTitleRangeText[0] = newFirstInputValue.toString();
                    titleRangeText = splitedTitleRangeText.join(" ");
                    titleRange.textContent = titleRangeText;
                }
            }
            else if (targetSliderIndex === 1) {
                targetSlider.style.marginLeft = target_dX + "px";

                if (target_dX < 0)
                    targetSlider.style.marginLeft = "0px";
                else if (target_dX + sliderWidth > containerWidth)
                    targetSlider.style.marginLeft = containerWidth - sliderWidth + "px";

                let targetCoordinates2 = targetSlider.getBoundingClientRect();
                if (targetCoordinates2.x < otherSliderCoordinates.x + sliderWidth)
                    targetSlider.style.marginLeft = otherSliderCoordinates.x - containerCoordinates.x + sliderWidth + "px";
                else {
                    filledBody.style.marginLeft = otherSliderCoordinates.x - containerCoordinates.x + sliderWidth / 2 + "px";
                    filledBody.style.width = targetCoordinates2.x - otherSliderCoordinates.x + "px";


                    //во второй инпут
                    let tempValue1 = targetCoordinates2.x - containerCoordinates.x - targetCoordinates2.width;
                    let tempFullSliderValue = containerCoordinates.width - targetCoordinates2.width * 2;

                    let targetLastInput = targetSliderContainer.querySelector(".rangeSlider__lastInput");

                    let targetMaxValueElem = targetSliderContainer.querySelector(".rangeSlider__maxValueInput");
                    let targetMinValueElem = targetSliderContainer.querySelector(".rangeSlider__minValueInput");
                    let fullInputValue = targetMaxValueElem.value - targetMinValueElem.value;
                    let newLastInputValue = Math.round((fullInputValue * tempValue1) / tempFullSliderValue);

                    targetLastInput.value = newLastInputValue;

                    let titleRange = targetLastInput.parentElement.parentElement.querySelector(".rangeSlider__rangeValue");
                    let titleRangeText = titleRange.textContent;
                    let splitedTitleRangeText = titleRangeText.split(/\s/i);
                    splitedTitleRangeText[2] = newLastInputValue.toString();
                    titleRangeText = splitedTitleRangeText.join(" ");
                    titleRange.textContent = titleRangeText;
                }
            }
        }

        function mouseUp(event) {
            //event.preventDefault();
            document.removeEventListener("mousemove", mouseMove);
            document.removeEventListener("mouseup", mouseUp);
        }
    }

}