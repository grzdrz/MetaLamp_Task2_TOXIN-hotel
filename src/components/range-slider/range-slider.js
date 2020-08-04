import "ion-rangeslider";
import "ion-rangeslider/css/ion.rangeSlider.css";
import jQuery from "jquery";

const $ = jQuery;
global.jQuery = $;
global.$ = $;

class RangeSlider {
    constructor(outerContainerElement) {
        this.outerContainerElement = outerContainerElement;

        this.renderTitle = this.renderTitle.bind(this);

        this.data = {
            type: "double",
            min: 1000,
            max: 15000,
            from: 5000,
            to: 10000,
            step: 100,
            hide_min_max: true,
            hide_from_to: true,
            onStart: this.renderTitle,
            onUpdate: this.renderTitle,
            onChange: this.renderTitle,
        };

        this.initialize();
    }

    initialize() {
        this.containerElement = this.outerContainerElement.querySelector(".range-slider");
        this.content = this.containerElement.querySelector(".range-slider__content");
        this.currentValues = this.containerElement.querySelector(".range-slider__current-values");

        this.jqSlider = $(this.content).ionRangeSlider(this.data);
    }

    renderTitle(data) {
        this.currentValues.textContent = `${this.formateNumber(data.from)}₽ - ${this.formateNumber(data.to)}₽`;
    }

    formateNumber(number) {
        return number.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1 ");
    }
}

export default RangeSlider;
