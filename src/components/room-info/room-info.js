class RoomInfo {
    constructor(outerContainerElement) {
        this.containerElement = outerContainerElement.querySelector(".room-info");
        this.arrows = this.containerElement.querySelector(".room-info__arrows");
        if (this.arrows) {
            this.leftArrow = this.arrows.querySelector(".room-info__arrow-back");
            this.rightArrow = this.arrows.querySelector(".room-info__arrow-forward");
        }
        this.radioButtons = Array.from(this.containerElement.querySelectorAll(".room-info__radio-button"));

        this.handlerLeftArrowClick = this.handlerLeftArrowClick.bind(this);
        this.handlerRightArrowClick = this.handlerRightArrowClick.bind(this);

        this.initialize();
    }

    initialize() {
        if (this.leftArrow && this.rightArrow) {
            this.leftArrow.onclick = this.handlerLeftArrowClick;
            this.rightArrow.onclick = this.handlerRightArrowClick;
        }
    }

    handlerLeftArrowClick(event) {
        if (event.currentTarget.disabled) return;

        const checkedButton = this.radioButtons.find((button) => button.checked);

        if (!checkedButton.previousElementSibling) return;

        if (checkedButton.dataset.serialNumber === "2") {
            checkedButton.checked = false;
            checkedButton.previousElementSibling.previousElementSibling.checked = true;
        } else if (checkedButton.dataset.serialNumber === "4") {
            checkedButton.checked = false;
            checkedButton.previousElementSibling.previousElementSibling.checked = true;
        } else {
            checkedButton.checked = false;
            checkedButton.previousElementSibling.previousElementSibling.checked = true;
        }
    }

    handlerRightArrowClick(event) {
        if (event.currentTarget.disabled) return;

        const checkedButton = this.radioButtons.find((button) => button.checked);

        if (!checkedButton.nextElementSibling.nextElementSibling.matches(".room-info__radio-button")) return;
        if (checkedButton.nextElementSibling.nextElementSibling.disabled) return;

        if (checkedButton.dataset.serialNumber === "3") {
            checkedButton.checked = false;
            checkedButton.nextElementSibling.nextElementSibling.checked = true;
        } else if (checkedButton.dataset.serialNumber === "1") {
            checkedButton.checked = false;
            checkedButton.nextElementSibling.nextElementSibling.checked = true;
        } else {
            checkedButton.checked = false;
            checkedButton.nextElementSibling.nextElementSibling.checked = true;
        }
    }
}

export default RoomInfo;
