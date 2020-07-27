import ListItem from "./ListItem";

class Dropdown {
    constructor(outerContainerElement) {
        this.containerElement = outerContainerElement.querySelector(".dropdown");

        this.withTotalValue = (this.containerElement.matches(".dropdown__with-total-value") ? true : false);
        this.totalValue = 0;

        this.inputContainer = this.containerElement.querySelector(".dropdown__input-container");
        this.borderRadius = this.inputContainer.style.borderTopLeftRadius;
        this.input = this.containerElement.querySelector(".dropdown__input");
        this.inputDefaultValue = this.inputContainer.dataset.defaultValue;
        this.dropdownArrow = this.containerElement.querySelector(".dropdown__dropdown-arrow");

        this.dropdownListElement = this.containerElement.querySelector(".dropdown__droped-list");
        this.dropdownList = Array.from(this.dropdownListElement.querySelectorAll(".dropdown__list-item"))
            .map((itemElement) => new ListItem(this, itemElement));


        this.clearButton = this.containerElement.querySelector(".dropdown__clear-button");
        this.applyButton = this.containerElement.querySelector(".dropdown__apply-button");

        this._handlerDropdownClick = this._handlerDropdownClick.bind(this);
        this._handlerDropdownEnter = this._handlerDropdownEnter.bind(this);
        this._handlerDropdownLeave = this._handlerDropdownLeave.bind(this);

        this._handlerClear = this._handlerClear.bind(this);
        this._handlerApply = this._handlerApply.bind(this);

        this.initialize();
    }

    initialize() {
        this.input.onclick = this._handlerDropdownClick;
        this.dropdownArrow.onclick = this._handlerDropdownClick;
        // если обработчик выше повесить на контейнер, то дропдаун будет закрываться при клике по нему, т.к. находится в контейнере

        if (this.clearButton) {
            this.clearButton.style.display = "none";
            this.clearButton.onclick = this._handlerClear;
        }

        if (this.applyButton) this.applyButton.onclick = this._handlerApply;
    }

    changeDropdownInputValue() {
        let babiesCount = 0;
        const sum = this.dropdownList.reduce((sum, item) => {
            const itemText = item.name.textContent;
            if (itemText.toLowerCase() !== "младенцы") {
                return sum + Number.parseInt(item.value.textContent);
            } else {
                babiesCount = Number.parseInt(item.value.textContent);
                return sum;
            }
        }, 0);

        if (this.withTotalValue) {
            if (babiesCount !== 0) {
                const mainText = `${sum} ${this.doDeclensionOfWord(sum, "гость")}`;
                const fullText = `${mainText}, ${babiesCount} ${this.doDeclensionOfWord(babiesCount, "младенец")}`;
                this.input.value = fullText;
            } else {
                this.input.value = `${sum} ${this.doDeclensionOfWord(sum, "гость")}`;
            }
            this.totalValue = sum;
        } else {
            const result = this.dropdownList.reduce((fullString, item, index) => {
                const itemName = item.name.textContent;
                const itemValue = Number.parseInt(item.value.textContent);

                if (index !== this.dropdownList.length - 1) {
                    return `${fullString}${itemValue} ${this.doDeclensionOfWord(itemValue, itemName)}, `;
                } else {
                    return `${fullString}${itemValue} ${this.doDeclensionOfWord(itemValue, itemName)}`;
                }
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

    _handlerDropdownClick() {
        if (this.dropdownListElement.style.display === "none") {
            this.inputContainer.style.borderBottomLeftRadius = "0px";
            this.inputContainer.style.borderBottomRightRadius = "0px";
            this.dropdownListElement.style.display = "flex";
        }
        else {
            this.inputContainer.style.borderBottomLeftRadius = this.borderRadius;
            this.inputContainer.style.borderBottomRightRadius = this.borderRadius;
            this.dropdownListElement.style.display = "none";
        }
    }

    _handlerDropdownEnter() {
        if (this.dropdownListElement.style.display === "none") {
            this.inputContainer.style.borderBottomLeftRadius = "0px";
            this.inputContainer.style.borderBottomRightRadius = "0px";
            this.dropdownListElement.style.display = "flex";
        }
    }

    _handlerDropdownLeave() {
        if (this.dropdownListElement.style.display === "flex") {
            this.inputContainer.style.borderBottomLeftRadius = this.borderRadius;
            this.inputContainer.style.borderBottomRightRadius = this.borderRadius;
            this.dropdownListElement.style.display = "none";
        }
    }

    _handlerClear() {
        this.clearButton.style.display = "none";

        this.input.value = this.inputDefaultValue;
        this.dropdownList.forEach(item => {
            item.value.textContent = "0";
            item.minus.style.opacity = 0.38;
        });
    }

    _handlerApply() {
        this.inputContainer.style.borderBottomLeftRadius = this.borderRadius;
        this.inputContainer.style.borderBottomRightRadius = this.borderRadius;
        this.dropdownListElement.style.display = "none";

        this.changeDropdownInputValue();
    }
}

export default Dropdown;

