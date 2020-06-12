/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/pages/HeadersAndFooters.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src sync recursive \\.(png|svg|jpg)$":
/*!***********************************!*\
  !*** ./src sync \.(png|svg|jpg)$ ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var map = {\n\t\"./FormElements.CheckboxList/img/checkMark.svg\": \"./src/FormElements.CheckboxList/img/checkMark.svg\",\n\t\"./FormElements.GuestRoomReviews/img/image1.png\": \"./src/FormElements.GuestRoomReviews/img/image1.png\",\n\t\"./FormElements.GuestRoomReviews/img/image2.png\": \"./src/FormElements.GuestRoomReviews/img/image2.png\",\n\t\"./FormElements.RadioButton/img/circle.svg\": \"./src/FormElements.RadioButton/img/circle.svg\",\n\t\"./FormElements.RadioButton/img/circleGrey.svg\": \"./src/FormElements.RadioButton/img/circleGrey.svg\",\n\t\"./GlobalLogo/img/logo.svg\": \"./src/GlobalLogo/img/logo.svg\",\n\t\"./HeadersAndFooters.FooterWidgetsAndCopyrightBar/copyrightBar/socialMedia/img/facebookIcon.svg\": \"./src/HeadersAndFooters.FooterWidgetsAndCopyrightBar/copyrightBar/socialMedia/img/facebookIcon.svg\",\n\t\"./HeadersAndFooters.FooterWidgetsAndCopyrightBar/copyrightBar/socialMedia/img/instagramIcon.svg\": \"./src/HeadersAndFooters.FooterWidgetsAndCopyrightBar/copyrightBar/socialMedia/img/instagramIcon.svg\",\n\t\"./HeadersAndFooters.FooterWidgetsAndCopyrightBar/copyrightBar/socialMedia/img/instagramIcon2.svg\": \"./src/HeadersAndFooters.FooterWidgetsAndCopyrightBar/copyrightBar/socialMedia/img/instagramIcon2.svg\",\n\t\"./HeadersAndFooters.FooterWidgetsAndCopyrightBar/copyrightBar/socialMedia/img/twitterIcon.svg\": \"./src/HeadersAndFooters.FooterWidgetsAndCopyrightBar/copyrightBar/socialMedia/img/twitterIcon.svg\",\n\t\"./HeadersAndFooters.LogoColored/img/TOXIN.svg\": \"./src/HeadersAndFooters.LogoColored/img/TOXIN.svg\",\n\t\"./HeadersAndFooters.LogoColored/img/logoColored.svg\": \"./src/HeadersAndFooters.LogoColored/img/logoColored.svg\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./src sync recursive \\\\.(png|svg|jpg)$\";\n\n//# sourceURL=webpack:///./src_sync_\\.(png%7Csvg%7Cjpg)$?");

/***/ }),

/***/ "./src/FormElements.CheckboxList/img/checkMark.svg":
/*!*********************************************************!*\
  !*** ./src/FormElements.CheckboxList/img/checkMark.svg ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"src/FormElements.CheckboxList/img/checkMark.svg\");\n\n//# sourceURL=webpack:///./src/FormElements.CheckboxList/img/checkMark.svg?");

/***/ }),

/***/ "./src/FormElements.GuestRoomReviews/img/image1.png":
/*!**********************************************************!*\
  !*** ./src/FormElements.GuestRoomReviews/img/image1.png ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"src/FormElements.GuestRoomReviews/img/image1.png\");\n\n//# sourceURL=webpack:///./src/FormElements.GuestRoomReviews/img/image1.png?");

/***/ }),

/***/ "./src/FormElements.GuestRoomReviews/img/image2.png":
/*!**********************************************************!*\
  !*** ./src/FormElements.GuestRoomReviews/img/image2.png ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"src/FormElements.GuestRoomReviews/img/image2.png\");\n\n//# sourceURL=webpack:///./src/FormElements.GuestRoomReviews/img/image2.png?");

/***/ }),

/***/ "./src/FormElements.RadioButton/img/circle.svg":
/*!*****************************************************!*\
  !*** ./src/FormElements.RadioButton/img/circle.svg ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"src/FormElements.RadioButton/img/circle.svg\");\n\n//# sourceURL=webpack:///./src/FormElements.RadioButton/img/circle.svg?");

/***/ }),

/***/ "./src/FormElements.RadioButton/img/circleGrey.svg":
/*!*********************************************************!*\
  !*** ./src/FormElements.RadioButton/img/circleGrey.svg ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"src/FormElements.RadioButton/img/circleGrey.svg\");\n\n//# sourceURL=webpack:///./src/FormElements.RadioButton/img/circleGrey.svg?");

/***/ }),

/***/ "./src/GlobalLogo/img/logo.svg":
/*!*************************************!*\
  !*** ./src/GlobalLogo/img/logo.svg ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"src/GlobalLogo/img/logo.svg\");\n\n//# sourceURL=webpack:///./src/GlobalLogo/img/logo.svg?");

/***/ }),

/***/ "./src/HeadersAndFooters.FooterWidgetsAndCopyrightBar/copyrightBar/socialMedia/img/facebookIcon.svg":
/*!**********************************************************************************************************!*\
  !*** ./src/HeadersAndFooters.FooterWidgetsAndCopyrightBar/copyrightBar/socialMedia/img/facebookIcon.svg ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"src/HeadersAndFooters.FooterWidgetsAndCopyrightBar/copyrightBar/socialMedia/img/facebookIcon.svg\");\n\n//# sourceURL=webpack:///./src/HeadersAndFooters.FooterWidgetsAndCopyrightBar/copyrightBar/socialMedia/img/facebookIcon.svg?");

/***/ }),

/***/ "./src/HeadersAndFooters.FooterWidgetsAndCopyrightBar/copyrightBar/socialMedia/img/instagramIcon.svg":
/*!***********************************************************************************************************!*\
  !*** ./src/HeadersAndFooters.FooterWidgetsAndCopyrightBar/copyrightBar/socialMedia/img/instagramIcon.svg ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"src/HeadersAndFooters.FooterWidgetsAndCopyrightBar/copyrightBar/socialMedia/img/instagramIcon.svg\");\n\n//# sourceURL=webpack:///./src/HeadersAndFooters.FooterWidgetsAndCopyrightBar/copyrightBar/socialMedia/img/instagramIcon.svg?");

/***/ }),

/***/ "./src/HeadersAndFooters.FooterWidgetsAndCopyrightBar/copyrightBar/socialMedia/img/instagramIcon2.svg":
/*!************************************************************************************************************!*\
  !*** ./src/HeadersAndFooters.FooterWidgetsAndCopyrightBar/copyrightBar/socialMedia/img/instagramIcon2.svg ***!
  \************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"src/HeadersAndFooters.FooterWidgetsAndCopyrightBar/copyrightBar/socialMedia/img/instagramIcon2.svg\");\n\n//# sourceURL=webpack:///./src/HeadersAndFooters.FooterWidgetsAndCopyrightBar/copyrightBar/socialMedia/img/instagramIcon2.svg?");

/***/ }),

/***/ "./src/HeadersAndFooters.FooterWidgetsAndCopyrightBar/copyrightBar/socialMedia/img/twitterIcon.svg":
/*!*********************************************************************************************************!*\
  !*** ./src/HeadersAndFooters.FooterWidgetsAndCopyrightBar/copyrightBar/socialMedia/img/twitterIcon.svg ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"src/HeadersAndFooters.FooterWidgetsAndCopyrightBar/copyrightBar/socialMedia/img/twitterIcon.svg\");\n\n//# sourceURL=webpack:///./src/HeadersAndFooters.FooterWidgetsAndCopyrightBar/copyrightBar/socialMedia/img/twitterIcon.svg?");

/***/ }),

/***/ "./src/HeadersAndFooters.LogoColored/img/TOXIN.svg":
/*!*********************************************************!*\
  !*** ./src/HeadersAndFooters.LogoColored/img/TOXIN.svg ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"src/HeadersAndFooters.LogoColored/img/TOXIN.svg\");\n\n//# sourceURL=webpack:///./src/HeadersAndFooters.LogoColored/img/TOXIN.svg?");

/***/ }),

/***/ "./src/HeadersAndFooters.LogoColored/img/logoColored.svg":
/*!***************************************************************!*\
  !*** ./src/HeadersAndFooters.LogoColored/img/logoColored.svg ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"src/HeadersAndFooters.LogoColored/img/logoColored.svg\");\n\n//# sourceURL=webpack:///./src/HeadersAndFooters.LogoColored/img/logoColored.svg?");

/***/ }),

/***/ "./src/HeadersAndFooters.scss":
/*!************************************!*\
  !*** ./src/HeadersAndFooters.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/HeadersAndFooters.scss?");

/***/ }),

/***/ "./src/pages/HeadersAndFooters.js":
/*!****************************************!*\
  !*** ./src/pages/HeadersAndFooters.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _HeadersAndFooters_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../HeadersAndFooters.scss */ \"./src/HeadersAndFooters.scss\");\n/* harmony import */ var _HeadersAndFooters_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HeadersAndFooters_scss__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\n__webpack_require__(\"./src sync recursive \\\\.(png|svg|jpg)$\");\n\n//# sourceURL=webpack:///./src/pages/HeadersAndFooters.js?");

/***/ })

/******/ });