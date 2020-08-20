import 'ion-rangeslider';
import 'ion-rangeslider/css/ion.rangeSlider.css';
import jQuery from 'jquery';

const $ = jQuery;
global.jQuery = $;
global.$ = $;

class RangeSlider {
    constructor(outerContainerElement) {
        this.outerContainerElement = outerContainerElement;

        this._renderTitle = this._renderTitle.bind(this);
        this.data = {
            type: 'double',
            min: 1000,
            max: 15000,
            from: 5000,
            to: 10000,
            step: 100,
            hide_min_max: true,
            hide_from_to: true,
            onStart: this._renderTitle,
            onUpdate: this._renderTitle,
            onChange: this._renderTitle,
        };

        this._initialize();
    }

    _initialize() {
        this.containerElement = this.outerContainerElement.querySelector('.js-range-slider');
        this.content = this.containerElement.querySelector('.js-range-slider__content');
        this.currentValues = this.containerElement.querySelector('.js-range-slider__current-values');

        this.$slider = $(this.content).ionRangeSlider(this.data);
    }

    _renderTitle(data) {
        this.currentValues.textContent = `${this._formateNumber(data.from)}₽ - ${this._formateNumber(data.to)}₽`;
    }

    _formateNumber(number) {
        return number.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
    }
}

export default RangeSlider;
