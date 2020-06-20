/* import { debug } from "webpack";
 */
export function roomInfoScript() {
    let roomInfoBlocks = document.querySelectorAll(".room-info");
    roomInfoBlocks.forEach(e => {
        let arrows = e.querySelector(".room-info__arrows");
        if (arrows) {
            let leftArrow = arrows.querySelector(".room-info__arrow-back");
            let rightArrow = arrows.querySelector(".room-info__arrow-forward");

            leftArrow.onclick = OnLeftArrowClick;
            rightArrow.onclick = OnRightArrowClick;
        }
    });

    function OnLeftArrowClick(event) {
        if (event.currentTarget.disabled) return;

        let containerElem = event.currentTarget.closest(".room-info");

        let radioButtons = Array.from(containerElem.querySelectorAll(".room-info__photo-radio-button-input"));
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

        let containerElem = event.currentTarget.closest(".room-info");

        let radioButtons = Array.from(containerElem.querySelectorAll(".room-info__photo-radio-button-input"));
        let checkedButton = radioButtons.find(e => e.checked);

        if (!checkedButton.nextElementSibling.nextElementSibling.matches(".room-info__photo-radio-button-input")) return;
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