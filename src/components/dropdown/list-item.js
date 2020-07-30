class ListItem {
    constructor(dropdown, containerElement) {
        this.dropdown = dropdown;
        this.containerElement = containerElement;

        this.name = this.containerElement.querySelector(".dropdown__item-name");
        this.value = this.containerElement.querySelector(".dropdown__item-value");
        this.plus = this.containerElement.querySelector(".dropdown__item-plus");
        this.minus = this.containerElement.querySelector(".dropdown__item-minus");

        this._handlerDropdownItemPlus = this._handlerDropdownItemPlus.bind(this);
        this._handlerDropdownItemMinus = this._handlerDropdownItemMinus.bind(this);

        this.initialize();
    }

    initialize() {
        //e.addEventListener("click", handlerDropdownItemPlus);
        this.plus.onclick = this._handlerDropdownItemPlus;
        this.minus.onclick = this._handlerDropdownItemMinus;
    }

    _handlerDropdownItemPlus(event) {
        event.preventDefault();

        let curValue = Number.parseInt(this.value.textContent);
        curValue += 1;
        if (curValue !== 0)
            this.minus.style.opacity = 1;
        this.value.textContent = curValue.toString();

        if (this.dropdown.clearButton) {
            this.dropdown.clearButton.style.display = "flex";
        }

        this.dropdown.changeDropdownInputValue();
    }

    _handlerDropdownItemMinus(event) {
        event.preventDefault();

        let curValue = Number.parseInt(this.value.textContent);
        curValue -= 1;
        if (curValue < 0) curValue = 0;

        this.value.textContent = curValue.toString();

        if (curValue === 0) {
            event.currentTarget.style.opacity = 0.38;

            //проверка на наличие нулей в значениях всех элементов выпадающего списка
            const values = this.dropdown.dropdownList.map(item => item.value);
            const absoluteSum = values.reduce((sum, value) => {
                return sum + Math.abs(Number.parseInt(value.textContent));
            }, 0);

            if (absoluteSum === 0) {
                if (this.dropdown.clearButton) {
                    this.dropdown.clearButton.style.display = "none";
                }
            }
        }

        this.dropdown.changeDropdownInputValue();
    }
}

export default ListItem;
