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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/favicons/favicons.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/file-loader/dist/cjs.js?name=/favicons/[name].[ext]!./src/favicons/android-chrome-192x192.png":
/*!********************************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js?name=/favicons/[name].[ext]!./src/favicons/android-chrome-192x192.png ***!
  \********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"/favicons/android-chrome-192x192.png\");\n\n//# sourceURL=webpack:///./src/favicons/android-chrome-192x192.png?./node_modules/file-loader/dist/cjs.js?name=/favicons/%5Bname%5D.%5Bext%5D");

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js?name=/favicons/[name].[ext]!./src/favicons/android-chrome-512x512.png":
/*!********************************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js?name=/favicons/[name].[ext]!./src/favicons/android-chrome-512x512.png ***!
  \********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"/favicons/android-chrome-512x512.png\");\n\n//# sourceURL=webpack:///./src/favicons/android-chrome-512x512.png?./node_modules/file-loader/dist/cjs.js?name=/favicons/%5Bname%5D.%5Bext%5D");

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js?name=/favicons/[name].[ext]!./src/favicons/apple-touch-icon.png":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js?name=/favicons/[name].[ext]!./src/favicons/apple-touch-icon.png ***!
  \**************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"/favicons/apple-touch-icon.png\");\n\n//# sourceURL=webpack:///./src/favicons/apple-touch-icon.png?./node_modules/file-loader/dist/cjs.js?name=/favicons/%5Bname%5D.%5Bext%5D");

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js?name=/favicons/[name].[ext]!./src/favicons/browserconfig.xml":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js?name=/favicons/[name].[ext]!./src/favicons/browserconfig.xml ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"/favicons/browserconfig.xml\");\n\n//# sourceURL=webpack:///./src/favicons/browserconfig.xml?./node_modules/file-loader/dist/cjs.js?name=/favicons/%5Bname%5D.%5Bext%5D");

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js?name=/favicons/[name].[ext]!./src/favicons/favicon-16x16.png":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js?name=/favicons/[name].[ext]!./src/favicons/favicon-16x16.png ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"/favicons/favicon-16x16.png\");\n\n//# sourceURL=webpack:///./src/favicons/favicon-16x16.png?./node_modules/file-loader/dist/cjs.js?name=/favicons/%5Bname%5D.%5Bext%5D");

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js?name=/favicons/[name].[ext]!./src/favicons/favicon-32x32.png":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js?name=/favicons/[name].[ext]!./src/favicons/favicon-32x32.png ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"/favicons/favicon-32x32.png\");\n\n//# sourceURL=webpack:///./src/favicons/favicon-32x32.png?./node_modules/file-loader/dist/cjs.js?name=/favicons/%5Bname%5D.%5Bext%5D");

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js?name=/favicons/[name].[ext]!./src/favicons/favicon.ico":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js?name=/favicons/[name].[ext]!./src/favicons/favicon.ico ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"/favicons/favicon.ico\");\n\n//# sourceURL=webpack:///./src/favicons/favicon.ico?./node_modules/file-loader/dist/cjs.js?name=/favicons/%5Bname%5D.%5Bext%5D");

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js?name=/favicons/[name].[ext]!./src/favicons/mstile-144x144.png":
/*!************************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js?name=/favicons/[name].[ext]!./src/favicons/mstile-144x144.png ***!
  \************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"/favicons/mstile-144x144.png\");\n\n//# sourceURL=webpack:///./src/favicons/mstile-144x144.png?./node_modules/file-loader/dist/cjs.js?name=/favicons/%5Bname%5D.%5Bext%5D");

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js?name=/favicons/[name].[ext]!./src/favicons/mstile-150x150.png":
/*!************************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js?name=/favicons/[name].[ext]!./src/favicons/mstile-150x150.png ***!
  \************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"/favicons/mstile-150x150.png\");\n\n//# sourceURL=webpack:///./src/favicons/mstile-150x150.png?./node_modules/file-loader/dist/cjs.js?name=/favicons/%5Bname%5D.%5Bext%5D");

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js?name=/favicons/[name].[ext]!./src/favicons/mstile-310x150.png":
/*!************************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js?name=/favicons/[name].[ext]!./src/favicons/mstile-310x150.png ***!
  \************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"/favicons/mstile-310x150.png\");\n\n//# sourceURL=webpack:///./src/favicons/mstile-310x150.png?./node_modules/file-loader/dist/cjs.js?name=/favicons/%5Bname%5D.%5Bext%5D");

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js?name=/favicons/[name].[ext]!./src/favicons/mstile-310x310.png":
/*!************************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js?name=/favicons/[name].[ext]!./src/favicons/mstile-310x310.png ***!
  \************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"/favicons/mstile-310x310.png\");\n\n//# sourceURL=webpack:///./src/favicons/mstile-310x310.png?./node_modules/file-loader/dist/cjs.js?name=/favicons/%5Bname%5D.%5Bext%5D");

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js?name=/favicons/[name].[ext]!./src/favicons/mstile-70x70.png":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js?name=/favicons/[name].[ext]!./src/favicons/mstile-70x70.png ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"/favicons/mstile-70x70.png\");\n\n//# sourceURL=webpack:///./src/favicons/mstile-70x70.png?./node_modules/file-loader/dist/cjs.js?name=/favicons/%5Bname%5D.%5Bext%5D");

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js?name=/favicons/[name].[ext]!./src/favicons/safari-pinned-tab.svg":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js?name=/favicons/[name].[ext]!./src/favicons/safari-pinned-tab.svg ***!
  \***************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"/favicons/safari-pinned-tab.svg\");\n\n//# sourceURL=webpack:///./src/favicons/safari-pinned-tab.svg?./node_modules/file-loader/dist/cjs.js?name=/favicons/%5Bname%5D.%5Bext%5D");

/***/ }),

/***/ "./src/favicons sync recursive ./!./!./node_modules/file-loader/dist/cjs.js?name=/favicons/[name].[ext]!./ \\.(svg|png|ico|xml|json)$":
/*!*************************************************************************************************************************!*\
  !*** ./src/favicons sync !./node_modules/file-loader/dist/cjs.js?name=/favicons/[name].[ext] \.(svg|png|ico|xml|json)$ ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var map = {\n\t\"./android-chrome-192x192.png\": \"./node_modules/file-loader/dist/cjs.js?name=/favicons/[name].[ext]!./src/favicons/android-chrome-192x192.png\",\n\t\"./android-chrome-512x512.png\": \"./node_modules/file-loader/dist/cjs.js?name=/favicons/[name].[ext]!./src/favicons/android-chrome-512x512.png\",\n\t\"./apple-touch-icon.png\": \"./node_modules/file-loader/dist/cjs.js?name=/favicons/[name].[ext]!./src/favicons/apple-touch-icon.png\",\n\t\"./browserconfig.xml\": \"./node_modules/file-loader/dist/cjs.js?name=/favicons/[name].[ext]!./src/favicons/browserconfig.xml\",\n\t\"./favicon-16x16.png\": \"./node_modules/file-loader/dist/cjs.js?name=/favicons/[name].[ext]!./src/favicons/favicon-16x16.png\",\n\t\"./favicon-32x32.png\": \"./node_modules/file-loader/dist/cjs.js?name=/favicons/[name].[ext]!./src/favicons/favicon-32x32.png\",\n\t\"./favicon.ico\": \"./node_modules/file-loader/dist/cjs.js?name=/favicons/[name].[ext]!./src/favicons/favicon.ico\",\n\t\"./mstile-144x144.png\": \"./node_modules/file-loader/dist/cjs.js?name=/favicons/[name].[ext]!./src/favicons/mstile-144x144.png\",\n\t\"./mstile-150x150.png\": \"./node_modules/file-loader/dist/cjs.js?name=/favicons/[name].[ext]!./src/favicons/mstile-150x150.png\",\n\t\"./mstile-310x150.png\": \"./node_modules/file-loader/dist/cjs.js?name=/favicons/[name].[ext]!./src/favicons/mstile-310x150.png\",\n\t\"./mstile-310x310.png\": \"./node_modules/file-loader/dist/cjs.js?name=/favicons/[name].[ext]!./src/favicons/mstile-310x310.png\",\n\t\"./mstile-70x70.png\": \"./node_modules/file-loader/dist/cjs.js?name=/favicons/[name].[ext]!./src/favicons/mstile-70x70.png\",\n\t\"./safari-pinned-tab.svg\": \"./node_modules/file-loader/dist/cjs.js?name=/favicons/[name].[ext]!./src/favicons/safari-pinned-tab.svg\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./src/favicons sync recursive ./!./!./node_modules/file-loader/dist/cjs.js?name=/favicons/[name].[ext]!./ \\\\.(svg|png|ico|xml|json)$\";\n\n//# sourceURL=webpack:///./node_modules/file-loader/dist/cjs.js?./src/favicons_sync_");

/***/ }),

/***/ "./src/favicons/favicons.js":
/*!**********************************!*\
  !*** ./src/favicons/favicons.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const faviconsContext = __webpack_require__(\"./src/favicons sync recursive ./!./!./node_modules/file-loader/dist/cjs.js?name=/favicons/[name].[ext]!./ \\\\.(svg|png|ico|xml|json)$\");\r\nfaviconsContext.keys().forEach(faviconsContext);\r\n\n\n//# sourceURL=webpack:///./src/favicons/favicons.js?");

/***/ })

/******/ });