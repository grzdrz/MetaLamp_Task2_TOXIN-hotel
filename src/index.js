import "./index.scss";


/* import jQueryTest from 'jquery';

const $ = jQueryTest;
global.jQuery = $;
global.$ = $;

import "./jquery-rate-picker.js"; 
import "./test.js"; */

//dropdown
import { dropdownScript } from "./FormElements.FormInput/Dropdown.js";
dropdownScript();

//dropdown
import { expandableCheckboxListScript } from "./FormElements.CheckboxList/ExpandableCheckboxList.js";
expandableCheckboxListScript();

//rate button
import { rateButtonScript } from "./FormElements.RateButton/RateButton.js";
rateButtonScript();


//pagination
import { paginationScript } from "./FormElements.Pagination/Pagination.js";
paginationScript();


//rangeSlider
import { rangeSliderScript} from "./FormElements.RangeSlider/RangeSlider.js";
rangeSliderScript();



/* function queryParentElementByClass(targetElement, classSelector){
    let curParentElem = targetElement.parentElement;

    while(true){
        if (curParentElem){
            let classes = curParentElem.className;
            if (classes){
                if (classes.split(/\s/i).includes(classSelector)){
                    return curParentElem;
                }
            }
        }
        else return null;

        curParentElem = curParentElem.parentElement;
    }
} */