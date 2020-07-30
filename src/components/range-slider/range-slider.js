import jQueryTest from 'jquery';
const $ = jQueryTest;
global.jQuery = $;
global.$ = $;

import 'ion-rangeslider';
import 'ion-rangeslider/css/ion.rangeSlider.css';

class RangeSlider {
    constructor(oterContainerElement) {
        this.containerElement = oterContainerElement;

        this.jqSlider = $(this.containerElement).ionRangeSlider({
            type: "double",
            min: 0,
            max: 1000,
            from: 200,
            to: 500,
            grid: true
        });
    }
}

export default RangeSlider;
