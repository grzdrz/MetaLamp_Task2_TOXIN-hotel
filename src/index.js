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

//rate button
import { rateButtonScript } from "./FormElements.RateButton/RateButton.js";
rateButtonScript();


//pagination
import { paginationScript } from "./FormElements.Pagination/Pagination.js";
paginationScript();


//rangeSlider
import { rangeSliderScript} from "./FormElements.RangeSlider/RangeSlider.js";
rangeSliderScript();