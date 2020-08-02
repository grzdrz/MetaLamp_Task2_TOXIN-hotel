class ExpandableCheckbox {
    constructor(outerContainerElement) {
        this.containerElement = outerContainerElement.querySelector(".checkbox-list");

        this.dropdownButton = this.containerElement.querySelector(".checkbox-list__title");
        this.list = this.containerElement.querySelector(".checkbox-list__list");
        this.dropdownArrow = this.containerElement.querySelector(".checkbox-list__dropdown-arrow");

        this.handlerExpand = this.handlerExpand.bind(this);

        this.initialize();
    }

    initialize() {
        this.dropdownButton.onclick = this.handlerExpand;

        if (this.list.dataset.isOpened === "true") {
            this.list.style.display = "grid";
            this.dropdownArrow.style.transform = "none";
        } else {
            this.list.style.display = "none";
            this.dropdownArrow.style.transform = "rotate(180deg)";
        }
    }

    handlerExpand() {
        if (this.list.dataset.isOpened === "true") {
            this.list.style.display = "none";
            this.list.dataset.isOpened = "false";
            this.dropdownArrow.style.transform = "rotate(180deg)";
        } else {
            this.list.style.display = "grid";
            this.list.dataset.isOpened = "true";
            this.dropdownArrow.style.transform = "none";
        }
    }
}

export default ExpandableCheckbox;
