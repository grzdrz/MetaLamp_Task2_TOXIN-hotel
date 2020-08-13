import ListItem from "./list-item";

class Dropdown {
    constructor(outerContainerElement) {
        this.outerContainerElement = outerContainerElement;

        this.handlerDropdownClick = this.handlerDropdownClick.bind(this);
        this.handlerCloseDropdown = this.handlerCloseDropdown.bind(this);

        this.handlerClear = this.handlerClear.bind(this);
        this.handlerApply = this.handlerApply.bind(this);

        this.handlerDropdownLeave = this.handlerDropdownLeave.bind(this);

        this.initialize();
    }

    initialize() {
        this.containerElement = this.outerContainerElement.querySelector(".dropdown");

        this.withTotalValue = (!!this.containerElement.matches(".dropdown__with-total-value"));
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

        this.input.onclick = this.handlerDropdownClick;
        this.dropdownArrow.onclick = this.handlerDropdownClick;
        // если обработчик выше повесить на контейнер, то дропдаун будет закрываться при клике по нему, т.к. находится в контейнере

        if (this.clearButton) {
            this.clearButton.style.display = "none";
            this.clearButton.onclick = this.handlerClear;
        }

        if (this.applyButton) this.applyButton.onclick = this.handlerApply;

        document.addEventListener("click", this.handlerDropdownLeave);
    }

    changeDropdownInputValue() {
        let babiesCount = 0;
        const sum = this.dropdownList.reduce((previousValue, item) => {
            const itemText = item.name.textContent;
            if (itemText.toLowerCase() !== "младенцы") {
                return previousValue + Number.parseInt(item.value.textContent, 10);
            }
            babiesCount = Number.parseInt(item.value.textContent, 10);
            return previousValue;
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
                const itemValue = Number.parseInt(item.value.textContent, 10);

                if (index !== this.dropdownList.length - 1) {
                    return `${fullString}${itemValue} ${this.doDeclensionOfWord(itemValue, itemName)}, `;
                }
                return `${fullString}${itemValue} ${this.doDeclensionOfWord(itemValue, itemName)}`;
            }, "");
            this.input.value = result;
        }
    }

    // склонение слов
    doDeclensionOfWord(number, word) {
        let words;
        if (word === "гость") words = ["гость", "гостя", "гостей"];
        else if (word === "спальни") words = ["спальня", "спальни", "спален"];
        else if (word === "кровати") words = ["кровать", "кровати", "кроватей"];
        else if (word === "ванные комнаты") words = ["ванная комната", "ванные комнаты", "ванных комнат"];
        else if (word === "младенец") words = ["младенец", "младенца", "младенцев"];

        const isEndOnOne = number.toString()[number.toString().length - 1] === "1";
        const isNotEqualEleven = number !== 11;
        if (isEndOnOne && isNotEqualEleven) return words[0];

        const isEndNumberMoreThenOne = number.toString()[number.toString().length - 1] > 1;
        const isEndNumberLessThenFour = number.toString()[number.toString().length - 1] <= 4;
        const isEndNumberBetweenTwelveAndFourteen = number < 12 || number > 14;
        const isSecondWord = isEndNumberMoreThenOne && isEndNumberLessThenFour && isEndNumberBetweenTwelveAndFourteen;
        if (isSecondWord) return words[1];

        return words[2];
    }

    handlerDropdownClick() {
        if (this.dropdownListElement.style.display === "none") {
            this.inputContainer.style.borderBottomLeftRadius = "0rem";
            this.inputContainer.style.borderBottomRightRadius = "0rem";
            this.dropdownListElement.style.display = "flex";
        } else {
            this.inputContainer.style.borderBottomLeftRadius = this.borderRadius;
            this.inputContainer.style.borderBottomRightRadius = this.borderRadius;
            this.dropdownListElement.style.display = "none";
        }
    }

    handlerCloseDropdown() {
        if (this.dropdownListElement.style.display === "flex") {
            this.inputContainer.style.borderBottomLeftRadius = this.borderRadius;
            this.inputContainer.style.borderBottomRightRadius = this.borderRadius;
            this.dropdownListElement.style.display = "none";
        }
    }

    handlerClear() {
        this.clearButton.style.display = "none";

        this.dropdownList.forEach((item) => {
            item.minus.style.opacity = 0.38;
            item.value.textContent = 0;
        });

        this.changeDropdownInputValue();
    }

    handlerApply() {
        this.inputContainer.style.borderBottomLeftRadius = this.borderRadius;
        this.inputContainer.style.borderBottomRightRadius = this.borderRadius;
        this.dropdownListElement.style.display = "none";

        this.changeDropdownInputValue();
    }

    handlerDropdownLeave(event) {
        if (event.target.className.match) {
            const dropdowns = event.target.className.match(/(^dropdown$)|(^dropdown__)/);
            if (!dropdowns) {
                this.handlerCloseDropdown();
            }
        } else this.handlerCloseDropdown();
    }
}

export default Dropdown;
