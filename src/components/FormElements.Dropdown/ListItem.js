class ListItem {
    constructor(dropdown, containerElement) {
        this.dropdown = dropdown;
        this.containerElement = containerElement;

        this.name = this.containerElement.querySelector(".dropdown__droped-list-item-text");
        this.value = this.containerElement.querySelector(".dropdown__droped-list-item-handler-text");
        this.plus = this.containerElement.querySelector(".dropdown__droped-list-item-handler-plus");
        this.minus = this.containerElement.querySelector(".dropdown__droped-list-item-handler-minus");

        this.handlerDropdownItemPlus = this.handlerDropdownItemPlus.bind(this);
        this.handlerDropdownItemMinus = this.handlerDropdownItemMinus.bind(this);

        this.initialize();
    }

    initialize() {
        //e.addEventListener("click", handlerDropdownItemPlus);
        this.plus.onclick = this.handlerDropdownItemPlus;
        this.minus.onclick = this.handlerDropdownItemMinus;
    }

    handlerDropdownItemPlus(event) {
        event.preventDefault();

        let curValue = Number.parseInt(this.value.textContent);
        curValue++;
        if (curValue !== 0)
            this.minus.style.opacity = 1;
        this.value.textContent = curValue.toString();

        if (this.dropdown.clearButton) {
            this.dropdown.clearButton.style.display = "flex";
        }

        this.dropdown.changeDropdownInputValue();// //
    }

    handlerDropdownItemMinus(event) {
        event.preventDefault();

        let curValue = Number.parseInt(this.value.textContent);
        curValue--;
        if (curValue < 0) curValue = 0;

        this.value.textContent = curValue.toString();

        if (curValue === 0) {
            event.currentTarget.style.opacity = 0.38;// ///////

            //проверка на наличие нулей в значениях всех элементов выпадающего списка
            const allValues = this.dropdown.dropdownList.map(item => item.value);
            const absSum = allValues.reduce((sum, value) => {
                return sum + Math.abs(Number.parseInt(value.textContent));
            }, 0);

            if (absSum === 0) {
                if (this.dropdown.clearButton) {
                    this.dropdown.clearButton.style.display = "none";
                }
            }
        }

        this.dropdown.changeDropdownInputValue();
    }
}

export default ListItem;
