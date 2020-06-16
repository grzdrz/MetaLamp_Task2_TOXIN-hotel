export function roomInfoScript() {
    let roomInfoBlocks = document.querySelectorAll(".roomInfo");
    roomInfoBlocks.forEach(e => {
        let arrows = e.querySelector(".roomInfo__arrows");
        if (arrows) {
            let leftArrow = arrows.querySelector(".roomInfo__arrowBack");
            let rightArrow = arrows.querySelector(".roomInfo__arrowForward");

            leftArrow.onclick = OnLeftArrowClick;
            rightArrow.onclick = OnRightArrowClick;
        }
    });

    function OnLeftArrowClick(event) {
        if (event.currentTarget.disabled) return;

        let containerElem = event.currentTarget.closest(".roomInfo");

        let radioButtons = Array.from(containerElem.querySelectorAll(".roomInfo__photoRadioButtonInput"));
        let checkedButton = radioButtons.find(e => e.checked);

        if (!checkedButton.previousElementSibling) return;

        if (checkedButton.dataset.serialNumber === "2") {
            checkedButton.checked = false;
            checkedButton.previousElementSibling.previousElementSibling.checked = true;
        }
        else if (checkedButton.dataset.serialNumber === "4") {
            checkedButton.checked = false;
            checkedButton.previousElementSibling.previousElementSibling.checked = true;
        }
        else {
            checkedButton.checked = false;
            checkedButton.previousElementSibling.previousElementSibling.checked = true;
        }
    }

    function OnRightArrowClick(event) {
        if (event.currentTarget.disabled) return;

        let containerElem = event.currentTarget.closest(".roomInfo");

        let radioButtons = Array.from(containerElem.querySelectorAll(".roomInfo__photoRadioButtonInput"));
        let checkedButton = radioButtons.find(e => e.checked);

        if (!checkedButton.nextElementSibling.nextElementSibling.matches(".roomInfo__photoRadioButtonInput")) return;
        else if (checkedButton.nextElementSibling.nextElementSibling.disabled) return;

        if (checkedButton.dataset.serialNumber === "3") {
            checkedButton.checked = false;
            checkedButton.nextElementSibling.nextElementSibling.checked = true;
        }
        else if (checkedButton.dataset.serialNumber === "1") {
            checkedButton.checked = false;
            checkedButton.nextElementSibling.nextElementSibling.checked = true;
        }
        else {
            checkedButton.checked = false;
            checkedButton.nextElementSibling.nextElementSibling.checked = true;
        }
    }
}