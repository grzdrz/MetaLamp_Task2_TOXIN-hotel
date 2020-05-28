import "./index.scss";


//dropdown
function onDropdown(event) {
    let targetDropdown = event.currentTarget.parentElement;
    let dropwdownList = targetDropdown.querySelector(".formInput__dropedList");
    if (dropwdownList.style.display === "none") dropwdownList.style.display = "flex";
    else dropwdownList.style.display = "none";
}

function onDropdownItemPlus(event) {
    let curValue = Number.parseInt(event.currentTarget.parentElement.querySelector("p").textContent);
    curValue++;
    event.currentTarget.parentElement.querySelector("p").textContent = curValue.toString();

    changeDropdownInputValue();
}
function onDropdownItemMinus(event) {
    let curValue = Number.parseInt(event.currentTarget.parentElement.querySelector("p").textContent);
    curValue--;
    if (curValue < 0) curValue = 0;
    event.currentTarget.parentElement.querySelector("p").textContent = curValue.toString();

    changeDropdownInputValue();
}

function changeDropdownInputValue() {
    let curDropdownElement = event.currentTarget.parentElement.parentElement.parentElement;
    let dropdownList = curDropdownElement.querySelectorAll(".formInput__dropedListItem");
    let sum = Array.from(dropdownList).reduce((sum, e) => {
        return sum + Number.parseInt(e.querySelector(".formInput__dropedListItemHandler > p").textContent)
    }, 0)

    //склонение слова гость по числу
    if (sum.toString()[sum.toString().length - 1] === "1" && sum !== 11)
        curDropdownElement.parentElement.querySelector(".formInput__mainInput").value = sum + " гость";
    else if ((sum.toString()[sum.toString().length - 1] > 1 && sum.toString()[sum.toString().length - 1] <= 4) &&
        (sum < 12 || sum > 14))
        curDropdownElement.parentElement.querySelector(".formInput__mainInput").value = sum + " гостя";
    else
        curDropdownElement.parentElement.querySelector(".formInput__mainInput").value = sum + " гостей";
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
})