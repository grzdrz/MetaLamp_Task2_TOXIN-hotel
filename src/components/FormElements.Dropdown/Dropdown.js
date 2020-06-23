export function dropdownScript() {
    let dropdownsElems = document.querySelectorAll(".dropdown");
    dropdownsElems.forEach(e => {
        e.querySelector(".dropdown__input").onclick = onDropdownClick;
        e.querySelector(".dropdown__dropdown-arrow").onclick = onDropdownClick;
        //если обработчик выше повесить на контейнер, то дропдаун будет закрываться при клике по нему, т.к. находится в контейнере

        let inputContainer = e.querySelector(".dropdown__input-container");
        //inputContainer.onmouseenter = onDropdownEnter;
        //inputContainer.onmouseleave = onDropdownLeave;

        e.querySelectorAll(".dropdown__droped-list-item-handler-plus").forEach(e => {
            e.addEventListener("click", onDropdownItemPlus);
        });
        e.querySelectorAll(".dropdown__droped-list-item-handler-minus").forEach(e => {
            e.addEventListener("click", onDropdownItemMinus);
        });

        let clearButton = e.querySelector(".dropdown__clear-button");
        if (clearButton) {
            clearButton.style.display = "none";
            clearButton.onclick = onClear;
        }
        let applyButton = e.querySelector(".dropdown__apply-button");
        if (applyButton) {
            applyButton.onclick = onApply;
        }

        inputContainer.dataset.borderRadius = inputContainer.style.borderTopLeftRadius;
    });


    function onDropdownClick(event) {
        let inputContainer = event.currentTarget.closest(".dropdown__input-container");
        let dropwdownList = inputContainer.querySelector(".dropdown__droped-list");

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
        let dropwdownList = inputContainer.querySelector(".dropdown__droped-list");

        if (dropwdownList.style.display === "none") {
            inputContainer.style.borderBottomLeftRadius = "0px";
            inputContainer.style.borderBottomRightRadius = "0px";
            dropwdownList.style.display = "flex";
        }
    }
    function onDropdownLeave(event) {
        let inputContainer = event.currentTarget;
        let dropwdownList = inputContainer.querySelector(".dropdown__droped-list");

        if (dropwdownList.style.display === "flex") {
            inputContainer.style.borderBottomLeftRadius = inputContainer.dataset.borderRadius;
            inputContainer.style.borderBottomRightRadius = inputContainer.dataset.borderRadius;
            dropwdownList.style.display = "none";
        }
    }


    function onDropdownItemPlus(event) {
        event.preventDefault();

        let dropedListItemHandlerText = event.currentTarget.parentElement.querySelector(".dropdown__droped-list-item-handler-text");
        let curValue = Number.parseInt(dropedListItemHandlerText.textContent);
        curValue++;
        if (curValue !== 0)
            event.currentTarget.parentElement.querySelector(".dropdown__droped-list-item-handler-minus").style.opacity = 1;
        dropedListItemHandlerText.textContent = curValue.toString();

        let listContainer = event.currentTarget.closest(".dropdown__droped-list");
        let clearButton = listContainer.querySelector(".dropdown__clear-button");
        if (clearButton) {
            clearButton.style.display = "flex";
        }

        changeDropdownInputValue(event.currentTarget.closest(".dropdown"));
    }
    function onDropdownItemMinus(event) {
        event.preventDefault();

        let dropedListItemHandlerText = event.currentTarget.parentElement.querySelector(".dropdown__droped-list-item-handler-text");
        let curValue = Number.parseInt(dropedListItemHandlerText.textContent);
        curValue--;
        if (curValue < 0) curValue = 0;

        dropedListItemHandlerText.textContent = curValue.toString();

        if (curValue === 0) {
            event.currentTarget.style.opacity = 0.38;

            //проверка на наличие нулей в значениях всех элементов выпадающего списка
            let listContainer = event.currentTarget.closest(".dropdown__droped-list");
            let allValues = Array.from(listContainer.querySelectorAll(".dropdown__droped-list-item-handler-text"));
            let absSum = allValues.reduce((sum, currentValue) => {
                return sum + Math.abs(Number.parseInt(currentValue.textContent));
            }, 0);
            if (absSum === 0) {
                let clearButton = listContainer.querySelector(".dropdown__clear-button");
                if (clearButton) {
                    clearButton.style.display = "none";
                }
            }
        }

        changeDropdownInputValue(event.currentTarget.closest(".dropdown"));
    }

    function changeDropdownInputValue(dropdownContainer) {
        let dropdownList = dropdownContainer.querySelectorAll(".dropdown__droped-list-item");

        let sum = 0;
        let babiesCount = 0;
        sum = Array.from(dropdownList).reduce((sum, e) => {
            let itemText = e.querySelector(".dropdown__droped-list-item-text").textContent;
            if (itemText.toLowerCase() !== "младенцы") {
                return sum + Number.parseInt(e.querySelector(".dropdown__droped-list-item-handler-text").textContent);
            }
            else {
                babiesCount = Number.parseInt(e.querySelector(".dropdown__droped-list-item-handler-text").textContent);
                return sum;
            }
        }, 0);

        if (dropdownContainer.matches(".dropdown__with-total-value")) {
            if (babiesCount !== 0) {
                let resultStr1 = sum + " " + doDeclensionOfWord(sum, "гость");
                let resultStr2 = resultStr1 + ", " + babiesCount + " " + doDeclensionOfWord(babiesCount, "младенец");
                dropdownContainer
                    .querySelector(".dropdown__input")
                    .value = resultStr2;
            }
            else {
                dropdownContainer
                    .querySelector(".dropdown__input")
                    .value = sum + " " + doDeclensionOfWord(sum, "гость");
            }
            dropdownContainer.dataset.curSum = sum;
        }
        else if (dropdownContainer.matches(".dropdown__without-total-value")) {
            let allItemsNames = Array.from(dropdownContainer.querySelectorAll(".dropdown__droped-list-item"));
            let result = allItemsNames.reduce((fullString, e, index) => {
                let itemName = e.querySelector("p").textContent;
                let itemValue = Number.parseInt(e.querySelector(".dropdown__droped-list-item-handler-text").textContent);

                if (index !== allItemsNames.length - 1)
                    return fullString + itemValue + " " + doDeclensionOfWord(itemValue, itemName) + ", ";
                else
                    return fullString + itemValue + " " + doDeclensionOfWord(itemValue, itemName);
            }, "");
            dropdownContainer.querySelector(".dropdown__input").value = result;
        }
    }

    //склонение слов
    function doDeclensionOfWord(number, word) {
        let words;
        if (word === "гость") words = ["гость", "гостя", "гостей"];
        else if (word === "спальни") words = ["спальня", "спальни", "спален"];
        else if (word === "кровати") words = ["кровать", "кровати", "кроватей"];
        else if (word === "ванные комнаты") words = ["ванная комната", "ванные комнаты", "ванных комнат"];
        else if (word === "младенец") words = ["младенец", "младенца", "младенцев"];

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

        let dropdownContainer = event.currentTarget.closest(".dropdown");
        let inputContainer = dropdownContainer.querySelector(".dropdown__input-container");

        dropdownContainer.querySelector(".dropdown__input").value = inputContainer.dataset.defaultValue;
        dropdownContainer.querySelectorAll(".dropdown__droped-list-item-handler-text").forEach(e => {
            e.textContent = "0";
        });
        dropdownContainer.querySelectorAll(".dropdown__droped-list-item-handler-minus").forEach(e => {
            e.style.opacity = 0.38;
        });
    }

    function onApply(event) {
        let dropdownContainer = event.currentTarget.closest(".dropdown");
        let dropwdownList = dropdownContainer.querySelector(".dropdown__droped-list");

        let inputContainer = dropdownContainer.querySelector(".dropdown__input-container");
        inputContainer.style.borderBottomLeftRadius = inputContainer.dataset.borderRadius;
        inputContainer.style.borderBottomRightRadius = inputContainer.dataset.borderRadius;
        dropwdownList.style.display = "none";

        changeDropdownInputValue(dropdownContainer);
    }
}