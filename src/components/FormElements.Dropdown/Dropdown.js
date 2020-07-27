import ListItem from "./ListItem";

class Dropdown {
    constructor(outerContainerElement) {
        this.containerElement = outerContainerElement.querySelector(".dropdown");

        this.withTotalValue = (this.containerElement.matches(".dropdown__with-total-value") ? true : false);
        this.totalValue = 0;

        this.inputContainer = this.containerElement.querySelector(".dropdown__input-container");
        this.input = this.containerElement.querySelector(".dropdown__input");
        this.dropdownArrow = this.containerElement.querySelector(".dropdown__dropdown-arrow");

        this.dropdownListElement = this.containerElement.querySelector(".dropdown__droped-list");
        this.dropdownList = Array.from(this.dropdownListElement.querySelectorAll(".dropdown__droped-list-item"))
            .map((itemElement) => new ListItem(this, itemElement));


        this.clearButton = this.containerElement.querySelector(".dropdown__clear-button");
        this.applyButton = this.containerElement.querySelector(".dropdown__apply-button");

        this.handlerDropdownClick = this.handlerDropdownClick.bind(this);
        this.handlerDropdownEnter = this.handlerDropdownEnter.bind(this);
        this.handlerDropdownLeave = this.handlerDropdownLeave.bind(this);

        this.handlerClear = this.handlerClear.bind(this);
        this.handlerApply = this.handlerApply.bind(this);

        this.initialize();
    }

    initialize() {
        this.input.onclick = this.handlerDropdownClick;
        this.dropdownArrow.onclick = this.handlerDropdownClick;
        //если обработчик выше повесить на контейнер, то дропдаун будет закрываться при клике по нему, т.к. находится в контейнере


        if (this.clearButton) {
            this.clearButton.style.display = "none";
            this.clearButton.onclick = this.handlerClear;
        }

        if (this.applyButton) this.applyButton.onclick = this.handlerApply;

        this.inputContainer.dataset.borderRadius = this.inputContainer.style.borderTopLeftRadius;
    }

    handlerDropdownClick(event) {
        if (this.dropdownListElement.style.display === "none") {
            this.inputContainer.style.borderBottomLeftRadius = "0px";
            this.inputContainer.style.borderBottomRightRadius = "0px";
            this.dropdownListElement.style.display = "flex";
        }
        else {
            this.inputContainer.style.borderBottomLeftRadius = this.inputContainer.dataset.borderRadius;
            this.inputContainer.style.borderBottomRightRadius = this.inputContainer.dataset.borderRadius;
            this.dropdownListElement.style.display = "none";
        }
    }

    handlerDropdownEnter(event) {
        if (this.dropdownListElement.style.display === "none") {
            this.inputContainer.style.borderBottomLeftRadius = "0px";
            this.inputContainer.style.borderBottomRightRadius = "0px";
            this.dropdownListElement.style.display = "flex";
        }
    }

    handlerDropdownLeave(event) {
        if (this.dropdownListElement.style.display === "flex") {
            this.inputContainer.style.borderBottomLeftRadius = this.inputContainer.dataset.borderRadius;
            this.inputContainer.style.borderBottomRightRadius = this.inputContainer.dataset.borderRadius;
            this.dropdownListElement.style.display = "none";
        }
    }

    changeDropdownInputValue() {
        let sum = 0;
        let babiesCount = 0;
        sum = this.dropdownList.reduce((sum, item) => {
            const itemText = item.name.textContent;
            if (itemText.toLowerCase() !== "младенцы") {
                return sum + Number.parseInt(item.value.textContent);
            }
            else {
                babiesCount = Number.parseInt(item.value.textContent);
                return sum;
            }
        }, 0);

        if (this.withTotalValue) {
            if (babiesCount !== 0) {
                let resultStr1 = sum + " " + this.doDeclensionOfWord(sum, "гость");
                let resultStr2 = resultStr1 + ", " + babiesCount + " " + this.doDeclensionOfWord(babiesCount, "младенец");
                this.input.value = resultStr2;
            }
            else {
                this.input.value = sum + " " + this.doDeclensionOfWord(sum, "гость");
            }
            this.totalValue = sum;
        }
        else {
            const result = this.dropdownList.reduce((fullString, item, index) => {
                let itemName = item.name.textContent;
                let itemValue = Number.parseInt(item.value.textContent);

                if (index !== this.dropdownList.length - 1)
                    return fullString + itemValue + " " + this.doDeclensionOfWord(itemValue, itemName) + ", ";
                else
                    return fullString + itemValue + " " + this.doDeclensionOfWord(itemValue, itemName);
            }, "");
            this.input.value = result;
        }
    }

    //склонение слов
    doDeclensionOfWord(number, word) {
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

    handlerClear() {
        this.clearButton.style.display = "none";

        this.input.value = this.inputContainer.dataset.defaultValue;
        this.dropdownList.forEach(item => {
            item.value.textContent = "0";
            item.minus.style.opacity = 0.38;
        });
    }

    handlerApply() {
        this.inputContainer.style.borderBottomLeftRadius = this.inputContainer.dataset.borderRadius;
        this.inputContainer.style.borderBottomRightRadius = this.inputContainer.dataset.borderRadius;
        this.dropdownListElement.style.display = "none";

        this.changeDropdownInputValue();
    }
}

export default Dropdown;

