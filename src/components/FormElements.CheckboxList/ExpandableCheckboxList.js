export function expandableCheckboxListScript() {
    let expandableCheckboxLists = document.querySelectorAll(".checkbox-list_expandable");
    expandableCheckboxLists.forEach(e => {
        let dropdownButton = e.querySelector(".checkbox-list__title");
        dropdownButton.onclick = expandCheckboxList;

        let list = e.querySelector(".checkbox-list__list");
        if (list.dataset.isOpened === "true") {
            list.style.display = "grid";
            e.querySelector(".checkbox-list__dropdown-arrow").style.transform = "none";
        }
        else {
            list.style.display = "none";
            e.querySelector(".checkbox-list__dropdown-arrow").style.transform = "rotate(180deg)";
        }
    });

    function expandCheckboxList(event) {
        let list = event.currentTarget.parentElement.querySelector(".checkbox-list__list");
        if (list.dataset.isOpened === "true") {
            list.style.display = "none";
            list.dataset.isOpened = "false";
            event.currentTarget.querySelector(".checkbox-list__dropdown-arrow").style.transform = "rotate(180deg)";
        }
        else {
            list.style.display = "grid";
            list.dataset.isOpened = "true";
            event.currentTarget.querySelector(".checkbox-list__dropdown-arrow").style.transform = "none";
        }
    }
}