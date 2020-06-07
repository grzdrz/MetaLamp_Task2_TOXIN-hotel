export function expandableCheckboxListScript() {
    let expandableCheckboxLists = document.querySelectorAll(".checkboxList_expandable");
    expandableCheckboxLists.forEach(e => {
        let dropdownButton = e.querySelector(".checkboxList__title");
        dropdownButton.onclick = expandCheckboxList;

        expandCheckboxList({ currentTarget: dropdownButton, });
    });

    function expandCheckboxList(event) {
        let list = event.currentTarget.parentElement.querySelector(".checkboxList__list");
        if (list.dataset.isOpened === "true") {
            list.style.display = "none";
            list.dataset.isOpened = "false";
            event.currentTarget.querySelector(".checkboxList__dropdownButton").style.transform = "rotate(180deg)";
        }
        else {
            list.style.display = "grid";
            list.dataset.isOpened = "true";
            event.currentTarget.querySelector(".checkboxList__dropdownButton").style.transform = "none";
        }
    }
}