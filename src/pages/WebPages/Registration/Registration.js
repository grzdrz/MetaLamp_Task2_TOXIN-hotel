require.context('../../../', true, /\.(png|svg|jpg)$/);

import 'material-design-icons/iconfont/material-icons.css';

//dropdown
import { dropdownScript } from "../../../components/FormElements.Dropdown/Dropdown.js";
dropdownScript();

import { dateInputScript } from "../../../components/FormElements.DateInput/DateInput.js";
dateInputScript();

import "./Registration.scss";
