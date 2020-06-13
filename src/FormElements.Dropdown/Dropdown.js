import { queryParentElementByClass } from "../queryParentElementByClass.js";

export function dropdownScript() {

    let dropdownsElems = document.querySelectorAll(".dropdown");
    dropdownsElems.forEach(e => {
        e.querySelector(".dropdown__mainInput").onclick = onDropdownClick;
        e.querySelector(".dropdown__dropdownInput").onclick = onDropdownClick;
        //если обработчик выше повесить на контейнер, то дропдаун будет закрываться при клике по нему, т.к. находится в контейнере

        let inputContainer = e.querySelector(".dropdown__input");
        inputContainer.onmouseenter = onDropdownEnter;
        inputContainer.onmouseleave = onDropdownLeave;

        e.querySelectorAll(".dropdown__dropedListItemHandlerPlus").forEach(e => {
            e.onclick = onDropdownItemPlus;
        });
        e.querySelectorAll(".dropdown__dropedListItemHandlerMinus").forEach(e => {
            e.onclick = onDropdownItemMinus;
        });

        let clearButton = e.querySelector(".dropdown__clearButton");
        if (clearButton) {
            clearButton.style.display = "none";
            clearButton.onclick = onClear;
        }
        let applyButton = e.querySelector(".dropdown__applyButton");
        if (applyButton) {
            applyButton.onclick = onApply;
        }

        inputContainer.dataset.borderRadius = inputContainer.style.borderTopLeftRadius;
    });


    function onDropdownClick(event) {
        let inputContainer = queryParentElementByClass(event.currentTarget, "dropdown__input");
        let dropwdownList = inputContainer.querySelector(".dropdown__dropedList");

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
        let dropwdownList = inputContainer.querySelector(".dropdown__dropedList");

        if (dropwdownList.style.display === "none") {
            inputContainer.style.borderBottomLeftRadius = "0px";
            inputContainer.style.borderBottomRightRadius = "0px";
            dropwdownList.style.display = "flex";
        }
    }
    function onDropdownLeave(event) {
        let inputContainer = event.currentTarget;
        let dropwdownList = inputContainer.querySelector(".dropdown__dropedList");

        if (dropwdownList.style.display === "flex") {
            inputContainer.style.borderBottomLeftRadius = inputContainer.dataset.borderRadius;
            inputContainer.style.borderBottomRightRadius = inputContainer.dataset.borderRadius;
            dropwdownList.style.display = "none";
        }
    }


    function onDropdownItemPlus(event) {
        let dropedListItemHandlerText = event.currentTarget.parentElement.querySelector(".dropdown__dropedListItemHandlerText");
        let curValue = Number.parseInt(dropedListItemHandlerText.textContent);
        curValue++;
        if (curValue !== 0)
            event.currentTarget.parentElement.querySelector(".dropdown__dropedListItemHandlerMinus").style.opacity = 1;
        dropedListItemHandlerText.textContent = curValue.toString();

        let listContainer = queryParentElementByClass(event.currentTarget, "dropdown__dropedList");
        let clearButton = listContainer.querySelector(".dropdown__clearButton");
        if (clearButton) {
            clearButton.style.display = "flex";
        }

        changeDropdownInputValue(queryParentElementByClass(event.currentTarget, "dropdown__input"));
    }
    function onDropdownItemMinus(event) {
        let dropedListItemHandlerText = event.currentTarget.parentElement.querySelector(".dropdown__dropedListItemHandlerText");
        let curValue = Number.parseInt(dropedListItemHandlerText.textContent);
        curValue--;
        if (curValue < 0) curValue = 0;

        dropedListItemHandlerText.textContent = curValue.toString();

        if (curValue === 0) {
            event.currentTarget.style.opacity = 0.38;

            //проверка на наличие нулей в значениях всех элементов выпадающего списка
            let listContainer = queryParentElementByClass(event.currentTarget, "dropdown__dropedList");
            let allValues = Array.from(listContainer.querySelectorAll(".dropdown__dropedListItemHandlerText"));
            let absSum = allValues.reduce((sum, currentValue) => {
                return sum + Math.abs(Number.parseInt(currentValue.textContent));
            }, 0);
            if (absSum === 0) {
                let clearButton = listContainer.querySelector(".dropdown__clearButton");
                if (clearButton) {
                    clearButton.style.display = "none";
                }
            }
        }

        changeDropdownInputValue(queryParentElementByClass(event.currentTarget, "dropdown__input"));
    }

    function changeDropdownInputValue(curDropdownContainer) {
        let dropdownList = curDropdownContainer.querySelectorAll(".dropdown__dropedListItem");
        let sum = Array.from(dropdownList).reduce((sum, e) => {
            return sum + Number.parseInt(e.querySelector(".dropdown__dropedListItemHandlerText").textContent)
        }, 0);

        //склонение слова гость по числу
        if (curDropdownContainer.className.match(/dropdown__input_sumNumber/i)) {
            curDropdownContainer
                .parentElement
                .querySelector(".dropdown__mainInput")
                .value = sum + " " + doDeclensionOfWord(sum, );
        }
        else if (curDropdownContainer.className.match(/dropdown__input_listOfNumbers/i)) {
            let allItemsNames = Array.from(curDropdownContainer.querySelectorAll(".dropdown__dropedListItem"));
            let result = allItemsNames.reduce((fullString, e, index) => {
                let itemName = e.querySelector("p").textContent;
                let itemValue = Number.parseInt(e.querySelector(".dropdown__dropedListItemHandlerText").textContent);

                if (index !== allItemsNames.length - 1)
                    return fullString + itemValue + " " + doDeclensionOfWord(itemValue, itemName) + ", ";
                else
                    return fullString + itemValue + " " + doDeclensionOfWord(itemValue, itemName);
            }, "");
            curDropdownContainer.parentElement.querySelector(".dropdown__mainInput").value = result;
        }
    }

    function doDeclensionOfWord(number, word) {
        let words;
        if (word === "гость") words = ["гость", "гостя", "гостей"];
        else if (word === "спальни") words = ["спальня", "спальни", "спален"];
        else if (word === "кровати") words = ["кровать", "кровати", "кроватей"];
        else if (word === "ванные комнаты") words = ["ванная комната", "ванные комнаты", "ванных комнат"];

        if (number.toString()[number.toString().length - 1] === "1" && number !== 11)
            return words[0];
        else if ((number.toString()[number.toString().length - 1] > 1 && number.toString()[number.toString().length - 1] <= 4)
            && (number < 12 || number > 14))
            return words[1];
        else
            return words[2];
    }


    function onClear(event) {
        event.currentTarget.style.display = "none";

        let inputContainer = queryParentElementByClass(event.currentTarget, "dropdown__input");
        inputContainer.querySelector(".dropdown__mainInput").value = inputContainer.dataset.defaultValue;
        inputContainer.querySelectorAll(".dropdown__dropedListItemHandlerText").forEach(e => {
            e.textContent = "0";
        });
        inputContainer.querySelectorAll(".dropdown__dropedListItemHandlerMinus").forEach(e => {
            e.style.opacity = 0.38;
        });
    }

    
    function onApply(event) {
        let inputContainer = queryParentElementByClass(event.currentTarget, "dropdown__input");
        let dropwdownList = inputContainer.querySelector(".dropdown__dropedList");

        inputContainer.style.borderBottomLeftRadius = inputContainer.dataset.borderRadius;
        inputContainer.style.borderBottomRightRadius = inputContainer.dataset.borderRadius;
        dropwdownList.style.display = "none";

        changeDropdownInputValue(inputContainer);
    }
}