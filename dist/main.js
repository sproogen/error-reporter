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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * error-reporter
 * https://github.com/sproogen/error-reporter
 * by James Grant
 */

/*
 * Render an error element in the error container
 *
 * @param string errorText    The error text
 * @param string errorDetails The error details
 */
var showError = function showError(errorText, errorDetails) {
    var errorElement = document.createElement('div');
    errorElement.setAttribute('class', 'error');

    var closeElement = document.createElement('a');
    closeElement.setAttribute('class', 'button');
    closeElement.innerHTML = 'x';
    closeElement.onclick = function () {
        errorElement.parentNode.removeChild(errorElement);
    };
    errorElement.appendChild(closeElement);

    var errorTextElement = document.createElement('div');
    errorTextElement.setAttribute('class', 'error-text');
    errorTextElement.innerHTML = errorText;
    errorElement.appendChild(errorTextElement);

    var errorDetailsElement = document.createElement('div');
    errorDetailsElement.setAttribute('class', 'error-details');
    errorDetailsElement.innerHTML = errorDetails;
    errorElement.appendChild(errorDetailsElement);

    document.getElementById("error-container").appendChild(errorElement);
};

/*
 * Inset the CSS into the header
 */
var insertCSS = function insertCSS() {
    /*
     * Sorry about incuding the CSS like this. Was just trying to keep it simple instead of compiling it through webpack.
     */
    var css = '#error-container{position:fixed;z-index:999999;bottom:0;right:0;width:100%;box-sizing:border-box;font-family:"Helvetica Neue",Helvetica,Arial,sans-serif}.error{width:96%;margin:10px auto;box-sizing:border-box;background-color:#505050;color:#fff;padding:15px;border-radius:3px;opacity:.8;-webkit-animation:fadein .5s;animation:fadein .5s}.error-details{font-size:.9em}.button{padding:0;cursor:pointer;background:0 0;border:0;-webkit-appearance:none;position:relative;right:-.3em;top:-.3em;float:right;font-size:20px;font-weight:700;color:#fff;text-decoration:none}@-webkit-keyframes fadein{from{margin-bottom:-40px;opacity:0}to{margin-bottom:10px;opacity:0.8}}@keyframes fadein{from{margin-bottom:-40px;opacity:0}to{margin-bottom:10px;opacity:0.8}}';
    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
};

/*
 * Inset the error container at the end on the body
 */
var insertContainer = function insertContainer() {
    var body = document.body || document.getElementsByTagName('body')[0];
    var errorContainer = document.createElement('div');
    errorContainer.setAttribute('id', 'error-container');
    body.appendChild(errorContainer);
};

/*
 * Window event listener to listen for error events
 */
window.addEventListener('error', function (event) {
    event.preventDefault();
    var messageParts = event.message.split(': ');
    var errorText = '';
    var errorDetails = null;
    var stacktrace = false;

    // Different browsers seem to format the message differently so this is trying to make the all the same format.
    if (messageParts.length === 2) {
        var errorType = messageParts[0].split(' ').pop();
        errorText = 'Detected ' + errorType;
        errorDetails = '\'' + messageParts[1] + '\' at ' + event.filename + ':' + event.lineno + ':' + event.colno;
        stacktrace = event.error.stack;
    } else {
        errorText = 'Detected ' + event.message;
    }

    // Display the error on screen.
    showError(errorText, errorDetails);

    // Log the error out, and if it exists the stacktract.
    console.log(errorText + ' - ' + errorDetails);
    if (stacktrace) {
        console.log(stacktrace);
    }
});

/*
 * Set up on window load
 */
window.onload = function () {
    insertContainer();
    insertCSS();
};

/***/ })
/******/ ]);