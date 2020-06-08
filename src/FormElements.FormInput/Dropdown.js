import { queryParentElementByClass } from "../queryParentElementByClass.js";

export function dropdownScript() {

    let dropdownsElems = document.querySelectorAll(".formInput_dropdown");
    dropdownsElems.forEach(e => {
        e.querySelector(".formInput__mainInput").onclick = onDropdownClick;
        e.querySelector(".formInput__dropdownInput").onclick = onDropdownClick;
        //если обработчик выше повесить на контейнер, то дропдаун будет закрываться при клике по нему, т.к. находится в контейнере

        let inputContainer = e.querySelector(".formInput__input");
        inputContainer.onmouseenter = onDropdownEnter;
        inputContainer.onmouseleave = onDropdownLeave;

        e.querySelectorAll(".formInput__dropedListItemHandlerPlus").forEach(e => {
            e.onclick = onDropdownItemPlus;
        });
        e.querySelectorAll(".formInput__dropedListItemHandlerMinus").forEach(e => {
            e.onclick = onDropdownItemMinus;
        });

        let clearButton = e.querySelector(".formInput__clearButton");
        if (clearButton) {
            clearButton.style.display = "none";
            clearButton.onclick = onClear;
        }
        let applyButton = e.querySelector(".formInput__applyButton");
        if (applyButton) {
            applyButton.onclick = onApply;
        }

        inputContainer.dataset.borderRadius = inputContainer.style.borderTopLeftRadius;
    });


    function onDropdownClick(event) {
        let inputContainer = queryParentElementByClass(event.currentTarget, "formInput__input");
        let dropwdownList = inputContainer.querySelector(".formInput__dropedList");

        if (dropwdownList.style.display === "none") {
            inputContainer.style.borderBottomLeftRadius = "0px";
            inputContainer.style.borderBottomRightRadius = "0px";
            dropwdownList.style.display = "flex";
        }
        else {
            inputContainer.style.borderBottomLeftRadius = inputContainer.dataset.borderRadius;
            inputContainer.style.borderBottomRightRadius = inputContainer.dataset.borderRadius;
            dropwdownList.style.display = "none";
        }
    }
    function onDropdownEnter(event) {
        let inputContainer = event.currentTarget;
        let dropwdownList = inputContainer.querySelector(".formInput__dropedList");

        if (dropwdownList.style.display === "none") {
            inputContainer.style.borderBottomLeftRadius = "0px";
            inputContainer.style.borderBottomRightRadius = "0px";
            dropwdownList.style.display = "flex";
        }
    }
    function onDropdownLeave(event) {
        let inputContainer = event.currentTarget;
        let dropwdownList = inputContainer.querySelector(".formInput__dropedList");

        if (dropwdownList.style.display === "flex") {
            inputContainer.style.borderBottomLeftRadius = inputContainer.dataset.borderRadius;
            inputContainer.style.borderBottomRightRadius = inputContainer.dataset.borderRadius;
            dropwdownList.style.display = "none";
        }
    }


    function onDropdownItemPlus(event) {
        let dropedListItemHandlerText = event.currentTarget.parentElement.querySelector(".formInput__dropedListItemHandlerText");
        let curValue = Number.parseInt(dropedListItemHandlerText.textContent);
        curValue++;
        if (curValue !== 0)
            event.currentTarget.parentElement.querySelector(".formInput__dropedListItemHandlerMinus").style.opacity = 1;
        dropedListItemHandlerText.textContent = curValue.toString();

        let listContainer = queryParentElementByClass(event.currentTarget, "formInput__dropedList");
        let clearButton = listContainer.querySelector(".formInput__clearButton");
        if (clearButton) {
            clearButton.style.display = "flex";
        }

        changeDropdownInputValue(queryParentElementByClass(event.currentTarget, "formInput__input"));
    }
    function onDropdownItemMinus(event) {
        let dropedListItemHandlerText = event.currentTarget.parentElement.querySelector(".formInput__dropedListItemHandlerText");
        let curValue = Number.parseInt(dropedListItemHandlerText.textContent);
        curValue--;
        if (curValue < 0) curValue = 0;

        dropedListItemHandlerText.textContent = curValue.toString();

        if (curValue === 0) {
            event.currentTarget.style.opacity = 0.38;

            //проверка на наличие нулей в значениях всех элементов выпадающего списка
            let listContainer = queryParentElementByClass(event.currentTarget, "formInput__dropedList");
            let allValues = Array.from(listContainer.querySelectorAll(".formInput__dropedListItemHandlerText"));
            let absSum = allValues.reduce((sum, currentValue) => {
                return sum + Math.abs(Number.parseInt(currentValue.textContent));
            }, 0);
            if (absSum === 0) {
                let clearButton = listContainer.querySelector(".formInput__clearButton");
                if (clearButton) {
                    clearButton.style.display = "none";
                }
            }
        }

        changeDropdownInputValue(queryParentElementByClass(event.currentTarget, "formInput__input"));
    }

    function changeDropdownInputValue(curDropdownContainer) {
        let dropdownList = curDropdownContainer.querySelectorAll(".formInput__dropedListItem");
        let sum = Array.from(dropdownList).reduce((sum, e) => {
            return sum + Number.parseInt(e.querySelector(".formInput__dropedListItemHandlerText").textContent)
        }, 0);

        //склонение слова гость по числу
        if (curDropdownContainer.className.match(/formInput__dropdown_sumNumber/i)) {
            if (sum.toString()[sum.toString().length - 1] === "1" && sum !== 11)
                curDropdownContainer.parentElement.querySelector(".formInput__mainInput").value = sum + " гость";
            else if ((sum.toString()[sum.toString().length - 1] > 1 && sum.toString()[sum.toString().length - 1] <= 4) &&
                (sum < 12 || sum > 14))
                curDropdownContainer.parentElement.querySelector(".formInput__mainInput").value = sum + " гостя";
            else
                curDropdownContainer.parentElement.querySelector(".formInput__mainInput").value = sum + " гостей";
        }
        else if (curDropdownContainer.className.match(/formInput__dropdown_listOfNumbers/i)) {
            let allItemsNames = Array.from(curDropdownContainer.querySelectorAll(".formInput__dropedListItem"));
            let result = allItemsNames.reduce((fullString, e, index) => {
                let itemName = e.querySelector("p").textContent;
                let itemValue = e.querySelector(".formInput__dropedListItemHandlerText").textContent;
                if (index !== allItemsNames.length - 1)
                    return fullString + itemValue + " " + itemName + ", ";
                else
                    return fullString + itemValue + " " + itemName;
            }, "");
            curDropdownContainer.parentElement.querySelector(".formInput__mainInput").value = result;
        }
    }

    function onClear(event) {
        event.currentTarget.style.display = "none";

        let inputContainer = queryParentElementByClass(event.currentTarget, "formInput__input");
        inputContainer.querySelector(".formInput__mainInput").value = inputContainer.dataset.defaultValue;
        inputContainer.querySelectorAll(".formInput__dropedListItemHandlerText").forEach(e => {
            e.textContent = "0";
        });
        inputContainer.querySelectorAll(".formInput__dropedListItemHandlerMinus").forEach(e => {
            e.style.opacity = 0.38;
        });
    }

    function onApply(event) {
        let inputContainer = queryParentElementByClass(event.currentTarget, "formInput__input");
        let dropwdownList = inputContainer.querySelector(".formInput__dropedList");

        inputContainer.style.borderBottomLeftRadius = inputContainer.dataset.borderRadius;
        inputContainer.style.borderBottomRightRadius = inputContainer.dataset.borderRadius;
        dropwdownList.style.display = "none";

        changeDropdownInputValue(inputContainer);
    }
}