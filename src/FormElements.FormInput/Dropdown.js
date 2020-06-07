export function dropdownScript() {

    let dropdownsElems = document.querySelectorAll(".formInput_dropdown");
    dropdownsElems.forEach(e => {
        e.querySelector(".formInput__dropdownInput").onclick = onDropdown;
        e.querySelector(".formInput__dropdownInput").onmouseenter = onDropdownEnter;
        e.querySelector(".formInput__dropedList").onmouseleave = onDropdownLeave;

        e.querySelectorAll(".formInput__dropedListItemHandlerPlus").forEach(e => {
            e.onclick = onDropdownItemPlus;
        });
        e.querySelectorAll(".formInput__dropedListItemHandlerMinus").forEach(e => {
            e.onclick = onDropdownItemMinus;
        });

        let inputContainer = e.querySelector(".formInput__input");
        inputContainer.dataset.borderRadius = inputContainer.style.borderTopLeftRadius;
    });

    
    function onDropdown(event) {
        let inputContainer = event.currentTarget.parentElement;
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
        let inputContainer = event.currentTarget.parentElement;
        let dropwdownList = inputContainer.querySelector(".formInput__dropedList");

        if (dropwdownList.style.display === "none") {
            inputContainer.style.borderBottomLeftRadius = "0px";
            inputContainer.style.borderBottomRightRadius = "0px";
            dropwdownList.style.display = "flex";
        }
        else return;
    }
    function onDropdownLeave(event) {
        let inputContainer = event.currentTarget.parentElement;

        inputContainer.style.borderBottomLeftRadius = inputContainer.dataset.borderRadius;
        inputContainer.style.borderBottomRightRadius = inputContainer.dataset.borderRadius;
        event.currentTarget.style.display = "none";
    }


    function onDropdownItemPlus(event) {
        let dropedListItemHandlerText = event.currentTarget.parentElement.querySelector(".formInput__dropedListItemHandlerText");
        let curValue = Number.parseInt(dropedListItemHandlerText.textContent);
        curValue++;
        if (curValue !== 0)
            event.currentTarget.parentElement.querySelector(".formInput__dropedListItemHandlerMinus").style.opacity = 1;
        dropedListItemHandlerText.textContent = curValue.toString();

        changeDropdownInputValue(event);
    }
    function onDropdownItemMinus(event) {
        let dropedListItemHandlerText = event.currentTarget.parentElement.querySelector(".formInput__dropedListItemHandlerText");
        let curValue = Number.parseInt(dropedListItemHandlerText.textContent);
        curValue--;
        if (curValue < 0) curValue = 0;
        if (curValue === 0)
            event.currentTarget.style.opacity = 0.38;
        dropedListItemHandlerText.textContent = curValue.toString();

        changeDropdownInputValue(event);
    }

    function changeDropdownInputValue(event) {
        let curDropdownContainer = event.currentTarget.parentElement.parentElement.parentElement.parentElement;
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
}