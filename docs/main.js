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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var pug_has_own_property = Object.prototype.hasOwnProperty;

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = pug_merge;
function pug_merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = pug_merge(attrs, a[i]);
    }
    return attrs;
  }

  for (var key in b) {
    if (key === 'class') {
      var valA = a[key] || [];
      a[key] = (Array.isArray(valA) ? valA : [valA]).concat(b[key] || []);
    } else if (key === 'style') {
      var valA = pug_style(a[key]);
      var valB = pug_style(b[key]);
      a[key] = valA + valB;
    } else {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Process array, object, or string as a string of classes delimited by a space.
 *
 * If `val` is an array, all members of it and its subarrays are counted as
 * classes. If `escaping` is an array, then whether or not the item in `val` is
 * escaped depends on the corresponding item in `escaping`. If `escaping` is
 * not an array, no escaping is done.
 *
 * If `val` is an object, all the keys whose value is truthy are counted as
 * classes. No escaping is done.
 *
 * If `val` is a string, it is counted as a class. No escaping is done.
 *
 * @param {(Array.<string>|Object.<string, boolean>|string)} val
 * @param {?Array.<string>} escaping
 * @return {String}
 */
exports.classes = pug_classes;
function pug_classes_array(val, escaping) {
  var classString = '', className, padding = '', escapeEnabled = Array.isArray(escaping);
  for (var i = 0; i < val.length; i++) {
    className = pug_classes(val[i]);
    if (!className) continue;
    escapeEnabled && escaping[i] && (className = pug_escape(className));
    classString = classString + padding + className;
    padding = ' ';
  }
  return classString;
}
function pug_classes_object(val) {
  var classString = '', padding = '';
  for (var key in val) {
    if (key && val[key] && pug_has_own_property.call(val, key)) {
      classString = classString + padding + key;
      padding = ' ';
    }
  }
  return classString;
}
function pug_classes(val, escaping) {
  if (Array.isArray(val)) {
    return pug_classes_array(val, escaping);
  } else if (val && typeof val === 'object') {
    return pug_classes_object(val);
  } else {
    return val || '';
  }
}

/**
 * Convert object or string to a string of CSS styles delimited by a semicolon.
 *
 * @param {(Object.<string, string>|string)} val
 * @return {String}
 */

exports.style = pug_style;
function pug_style(val) {
  if (!val) return '';
  if (typeof val === 'object') {
    var out = '';
    for (var style in val) {
      /* istanbul ignore else */
      if (pug_has_own_property.call(val, style)) {
        out = out + style + ':' + val[style] + ';';
      }
    }
    return out;
  } else {
    val += '';
    if (val[val.length - 1] !== ';') 
      return val + ';';
    return val;
  }
};

/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = pug_attr;
function pug_attr(key, val, escaped, terse) {
  if (val === false || val == null || !val && (key === 'class' || key === 'style')) {
    return '';
  }
  if (val === true) {
    return ' ' + (terse ? key : key + '="' + key + '"');
  }
  if (typeof val.toJSON === 'function') {
    val = val.toJSON();
  }
  if (typeof val !== 'string') {
    val = JSON.stringify(val);
    if (!escaped && val.indexOf('"') !== -1) {
      return ' ' + key + '=\'' + val.replace(/'/g, '&#39;') + '\'';
    }
  }
  if (escaped) val = pug_escape(val);
  return ' ' + key + '="' + val + '"';
};

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} terse whether to use HTML5 terse boolean attributes
 * @return {String}
 */
exports.attrs = pug_attrs;
function pug_attrs(obj, terse){
  var attrs = '';

  for (var key in obj) {
    if (pug_has_own_property.call(obj, key)) {
      var val = obj[key];

      if ('class' === key) {
        val = pug_classes(val);
        attrs = pug_attr(key, val, false, terse) + attrs;
        continue;
      }
      if ('style' === key) {
        val = pug_style(val);
      }
      attrs += pug_attr(key, val, false, terse);
    }
  }

  return attrs;
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

var pug_match_html = /["&<>]/;
exports.escape = pug_escape;
function pug_escape(_html){
  var html = '' + _html;
  var regexResult = pug_match_html.exec(html);
  if (!regexResult) return _html;

  var result = '';
  var i, lastIndex, escape;
  for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
    switch (html.charCodeAt(i)) {
      case 34: escape = '&quot;'; break;
      case 38: escape = '&amp;'; break;
      case 60: escape = '&lt;'; break;
      case 62: escape = '&gt;'; break;
      default: continue;
    }
    if (lastIndex !== i) result += html.substring(lastIndex, i);
    lastIndex = i + 1;
    result += escape;
  }
  if (lastIndex !== i) return result + html.substring(lastIndex, i);
  else return result;
};

/**
 * Re-throw the given `err` in context to the
 * the pug in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @param {String} str original source
 * @api private
 */

exports.rethrow = pug_rethrow;
function pug_rethrow(err, filename, lineno, str){
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str = str || __webpack_require__(4).readFileSync(filename, 'utf8')
  } catch (ex) {
    pug_rethrow(err, null, lineno)
  }
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Pug') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_MainMenu_MainMenu__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_Paginator_Paginator__ = __webpack_require__(7);



/* eslint-disable */
new __WEBPACK_IMPORTED_MODULE_0__modules_MainMenu_MainMenu__["a" /* default */](document.querySelector('.js-MainMenu-1'))
new __WEBPACK_IMPORTED_MODULE_1__modules_Paginator_Paginator__["a" /* default */](document.querySelector('.js-Paginator-1'))

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MainMenu_pug__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MainMenu_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__MainMenu_pug__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__MainMenu_scss__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__MainMenu_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__MainMenu_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_MainMenu_json__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_MainMenu_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__data_MainMenu_json__);




class MainMenu {
  constructor (node) {
    this.node = node
    this.indexSublist = -1
    this.node.innerHTML = __WEBPACK_IMPORTED_MODULE_0__MainMenu_pug___default()(__WEBPACK_IMPORTED_MODULE_2__data_MainMenu_json___default.a)
    this.getNodes()
    this.setEvents()
  }

  static get states () {
    return {
      subMenuOpen: 'main-menu__sublist--open',
      menuOpen: 'main-menu__list--open',
      burgerTopOpen: 'main-menu__hamburger-top--open',
      burgerBottomOpen: 'main-menu__hamburger-bottom--open'
    }
  }

  getNodes () {
    this.list = this.node.querySelector('.main-menu__list')
    this.buttons = this.node.querySelectorAll('.main-menu__button')
    this.hamburger = this.node.querySelector('.main-menu__hamburger')
    this.hamburgerTop = this.node.querySelector('.main-menu__hamburger-top')
    this.hamburgerBottom = this.node.querySelector('.main-menu__hamburger-bottom')
    this.sublists = this.node.querySelectorAll('.main-menu__sublist')
  }

  setEvents () {
    this.list.addEventListener('click', this.handleClickList.bind(this))
    this.hamburger.addEventListener('click', this.handleHamburger.bind(this))
  }

  handleClickList (event) {
    this.newIndexSublist = Array.from(this.buttons).indexOf(event.target)
    if (this.indexSublist !== -1) {
      this.sublists[this.indexSublist].classList.remove(MainMenu.states.subMenuOpen)
      this.sublists[this.newIndexSublist].classList.add(MainMenu.states.subMenuOpen)
    } else {
      if (this.sublists[this.newIndexSublist].classList.contains(MainMenu.states.subMenuOpen)) {
        this.sublists[this.newIndexSublist].classList.remove(MainMenu.states.subMenuOpen)
      } else {
        this.sublists[this.newIndexSublist].classList.add(MainMenu.states.subMenuOpen)
      }
    }
  }

  handleHamburger (event) {
    this.list.classList.toggle(MainMenu.states.menuOpen)
    this.hamburgerTop.classList.toggle(MainMenu.states.burgerTopOpen)
    this.hamburgerBottom.classList.toggle(MainMenu.states.burgerBottomOpen)
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MainMenu;



/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (Object, links, logo) {pug_html = pug_html + "\u003Cdiv class=\"main-menu__upper\"\u003E\u003Ca class=\"main-menu__logo\"\u003E\u003Cimg" + (" class=\"main-menu__imagelogo\""+pug.attr("src", logo.img, false, true)+pug.attr("href", logo.link, false, true)) + "\u003E\u003C\u002Fa\u003E\u003Cdiv class=\"main-menu__hamburger\"\u003E\u003Cspan class=\"main-menu__hamburger-top\"\u003E\u003C\u002Fspan\u003E\u003Cspan class=\"main-menu__hamburger-bottom\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cul class=\"main-menu__list\"\u003E";
// iterate links
;(function(){
  var $$obj = links;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var element = $$obj[pug_index0];
if (Object.keys(element).includes('href')) {
pug_html = pug_html + "\u003Cli class=\"main-menu__item\"\u003E\u003Ca" + (" class=\"main-menu__link\""+pug.attr("href", element.href, false, true)) + "\u003E" + (null == (pug_interp = element.label) ? "" : pug_interp) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
}
else {
pug_html = pug_html + "\u003Cli class=\"main-menu__item\"\u003E\u003Cbutton class=\"main-menu__button\"\u003E" + (null == (pug_interp = element.label) ? "" : pug_interp) + "\u003C\u002Fbutton\u003E\u003Cul class=\"main-menu__sublist\"\u003E";
// iterate element.links
;(function(){
  var $$obj = element.links;
  if ('number' == typeof $$obj.length) {
      for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
        var subelement = $$obj[pug_index1];
pug_html = pug_html + "\u003Cli class=\"main-menu__subitem\"\u003E \u003Ca" + (" class=\"main-menu__link main-menu__link--sublist\""+pug.attr("href", subelement.href, false, true)) + "\u003E" + (null == (pug_interp = subelement.label) ? "" : pug_interp) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index1 in $$obj) {
      $$l++;
      var subelement = $$obj[pug_index1];
pug_html = pug_html + "\u003Cli class=\"main-menu__subitem\"\u003E \u003Ca" + (" class=\"main-menu__link main-menu__link--sublist\""+pug.attr("href", subelement.href, false, true)) + "\u003E" + (null == (pug_interp = subelement.label) ? "" : pug_interp) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E\u003C\u002Fli\u003E";
}
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var element = $$obj[pug_index0];
if (Object.keys(element).includes('href')) {
pug_html = pug_html + "\u003Cli class=\"main-menu__item\"\u003E\u003Ca" + (" class=\"main-menu__link\""+pug.attr("href", element.href, false, true)) + "\u003E" + (null == (pug_interp = element.label) ? "" : pug_interp) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
}
else {
pug_html = pug_html + "\u003Cli class=\"main-menu__item\"\u003E\u003Cbutton class=\"main-menu__button\"\u003E" + (null == (pug_interp = element.label) ? "" : pug_interp) + "\u003C\u002Fbutton\u003E\u003Cul class=\"main-menu__sublist\"\u003E";
// iterate element.links
;(function(){
  var $$obj = element.links;
  if ('number' == typeof $$obj.length) {
      for (var pug_index2 = 0, $$l = $$obj.length; pug_index2 < $$l; pug_index2++) {
        var subelement = $$obj[pug_index2];
pug_html = pug_html + "\u003Cli class=\"main-menu__subitem\"\u003E \u003Ca" + (" class=\"main-menu__link main-menu__link--sublist\""+pug.attr("href", subelement.href, false, true)) + "\u003E" + (null == (pug_interp = subelement.label) ? "" : pug_interp) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index2 in $$obj) {
      $$l++;
      var subelement = $$obj[pug_index2];
pug_html = pug_html + "\u003Cli class=\"main-menu__subitem\"\u003E \u003Ca" + (" class=\"main-menu__link main-menu__link--sublist\""+pug.attr("href", subelement.href, false, true)) + "\u003E" + (null == (pug_interp = subelement.label) ? "" : pug_interp) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E\u003C\u002Fli\u003E";
}
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E";}.call(this,"Object" in locals_for_with?locals_for_with.Object:typeof Object!=="undefined"?Object:undefined,"links" in locals_for_with?locals_for_with.links:typeof links!=="undefined"?links:undefined,"logo" in locals_for_with?locals_for_with.logo:typeof logo!=="undefined"?logo:undefined));;return pug_html;};
module.exports = template;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = {"logo":{"img":"assets/images/logo-fitted.png","link":"/"},"links":[{"label":"Home","href":"/"},{"label":"Repository","href":"https://github.com/williamegomez/Machine-Learning-Teaching"},{"label":"Projects","links":[{"label":"2018-1","href":"/"}]}]}

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Post_card_Post_card_scss__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Post_card_Post_card_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Post_card_Post_card_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Paginator_scss__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Paginator_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Paginator_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_CardsMain_json__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_CardsMain_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__data_CardsMain_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Paginator_pug__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Paginator_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Paginator_pug__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Post_card_Post_card_pug__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Post_card_Post_card_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__Post_card_Post_card_pug__);






class Paginator {
  constructor (node, jsonPages) {
    this.node = node
    this.node.innerHTML = __WEBPACK_IMPORTED_MODULE_3__Paginator_pug___default()()
    this.jsonPages = jsonPages
    this.indexPage = 0
    this.cardContainer = this.node.querySelector('.paginator__posts')
    this.fillPaginator()
  }

  fillPaginator () {
    __WEBPACK_IMPORTED_MODULE_2__data_CardsMain_json___default.a.forEach((card) => {
      this.addCard(card)
    })
  }

  addCard (json) {
    var parser = new DOMParser()
    var card = parser.parseFromString(__WEBPACK_IMPORTED_MODULE_4__Post_card_Post_card_pug___default()(json), 'text/html').body.children[0]
    this.cardContainer.appendChild(card)
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Paginator;



/***/ }),
/* 8 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 9 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = [{"title":"Clase introducción","description":"Introducción al curso y bases","udate":"13-02-2018","cdata":"06-02-2018","url":"https://github.com/williamegomez/Machine-Learning-Teaching/tree/master/lessons/2018-1/introduction"},{"title":"Clase lógica difusa","description":"Conceptos de la lógica difusa, sistemas de inferencia","udate":"20-02-2018","cdata":"13-02-2018","url":"https://github.com/williamegomez/Machine-Learning-Teaching/blob/master/lessons/2018-1/Fuzzy%20Logic"},{"title":"Redacción de objetivos para la investigación","description":"Redacción de objetivos generales y específicos.","udate":"22-02-2018","cdata":"22-02-2018","url":"https://github.com/williamegomez/Machine-Learning-Teaching/blob/master/lessons/2018-1/General%20Topics"},{"title":"Regresión y Clasificación","description":"Conceptos bases para entender los principios del aprendizaje supervisado","udate":"12-03-2018","cdata":"12-03-2018","url":"https://github.com/williamegomez/Machine-Learning-Teaching/tree/master/lessons/2018-1/Neural%20Networks"},{"title":"Redes Neuronales","description":"Introducción, conceptos y evolución","udate":"14-03-2018","cdata":"14-03-2018","url":"https://github.com/williamegomez/Machine-Learning-Teaching/tree/master/lessons/2018-1/Neural%20Networks"}]

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Ch1 class=\"paginator__title\"\u003EPosts\u003C\u002Fh1\u003E\u003Csection class=\"paginator__posts\"\u003E\u003C\u002Fsection\u003E\u003Cul class=\"paginator__control\"\u003E\u003Cli class=\"paginator__control-item\"\u003E&laquo;\u003C\u002Fli\u003E\u003Cli class=\"paginator__control-item\"\u003E1\u003C\u002Fli\u003E\u003Cli class=\"paginator__control-item\"\u003E&raquo;\u003C\u002Fli\u003E\u003C\u002Ful\u003E";;return pug_html;};
module.exports = template;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (description, title, udate, url) {pug_html = pug_html + "\u003Carticle class=\"post-card\"\u003E\u003Ca" + (" class=\"post-card__acontainer\""+pug.attr("href", url, false, true)) + "\u003E\u003Ch1 class=\"post-card__title\"\u003E" + (null == (pug_interp = title) ? "" : pug_interp) + "\u003C\u002Fh1\u003E\u003Cp class=\"post-card__description\"\u003E" + (null == (pug_interp = description) ? "" : pug_interp) + "\u003C\u002Fp\u003E\u003Cdiv class=\"post-card__date\"\u003E\u003Cspan class=\"post-card__date-clabel\"\u003EFecha de creación:\u003C\u002Fspan\u003E\u003Cspan class=\"post-card__date-created\"\u003E" + (null == (pug_interp = udate) ? "" : pug_interp) + "\u003C\u002Fspan\u003E\u003Cspan class=\"post-card__date-ulabel\"\u003EFecha de actualización:\u003C\u002Fspan\u003E\u003Cspan class=\"post-card__date-updated\"\u003E" + (null == (pug_interp = udate) ? "" : pug_interp) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003C\u002Fa\u003E\u003C\u002Farticle\u003E";}.call(this,"description" in locals_for_with?locals_for_with.description:typeof description!=="undefined"?description:undefined,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined,"udate" in locals_for_with?locals_for_with.udate:typeof udate!=="undefined"?udate:undefined,"url" in locals_for_with?locals_for_with.url:typeof url!=="undefined"?url:undefined));;return pug_html;};
module.exports = template;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDk1YjdlN2ZiNGZiMTMwMTNkZDkiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3B1Zy1ydW50aW1lL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9tYWluLmpzIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL01haW5NZW51L01haW5NZW51LmpzIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL01haW5NZW51L01haW5NZW51LnB1ZyIsIndlYnBhY2s6Ly8vZnMgKGlnbm9yZWQpIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL01haW5NZW51L01haW5NZW51LnNjc3MiLCJ3ZWJwYWNrOi8vLy4vZGF0YS9NYWluTWVudS5qc29uIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL1BhZ2luYXRvci9QYWdpbmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZHVsZXMvUG9zdC1jYXJkL1Bvc3QtY2FyZC5zY3NzIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL1BhZ2luYXRvci9QYWdpbmF0b3Iuc2NzcyIsIndlYnBhY2s6Ly8vLi9kYXRhL0NhcmRzTWFpbi5qc29uIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL1BhZ2luYXRvci9QYWdpbmF0b3IucHVnIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL1Bvc3QtY2FyZC9Qb3N0LWNhcmQucHVnIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixF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QUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTs7Ozs7OztBQzNCQSx5Qzs7Ozs7O0FDQUEseUM7Ozs7OztBQ0FBLG1CQUFtQixnT0FBZ08sRUFBRSwwUEFBMFAsRUFBRSxnUkFBZ1IsRUFBRSx1UkFBdVIsRUFBRSx5T0FBeU8sQzs7Ozs7O0FDQXJ3Qzs7QUFFQSwyQkFBMkIsa0NBQWtDLGFBQWEsa1FBQWtRLGdKQUFnSiwyQ0FBMkM7QUFDdmdCLDBCOzs7Ozs7QUNIQTs7QUFFQSwyQkFBMkIsa0NBQWtDLGNBQWMsbUNBQW1DLEVBQUUsNENBQTRDLGs3QkFBazdCLDhZQUE4WTtBQUM1OUMsMEIiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDA5NWI3ZTdmYjRmYjEzMDEzZGQ5IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcHVnX2hhc19vd25fcHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIE1lcmdlIHR3byBhdHRyaWJ1dGUgb2JqZWN0cyBnaXZpbmcgcHJlY2VkZW5jZVxuICogdG8gdmFsdWVzIGluIG9iamVjdCBgYmAuIENsYXNzZXMgYXJlIHNwZWNpYWwtY2FzZWRcbiAqIGFsbG93aW5nIGZvciBhcnJheXMgYW5kIG1lcmdpbmcvam9pbmluZyBhcHByb3ByaWF0ZWx5XG4gKiByZXN1bHRpbmcgaW4gYSBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGFcbiAqIEBwYXJhbSB7T2JqZWN0fSBiXG4gKiBAcmV0dXJuIHtPYmplY3R9IGFcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMubWVyZ2UgPSBwdWdfbWVyZ2U7XG5mdW5jdGlvbiBwdWdfbWVyZ2UoYSwgYikge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgIHZhciBhdHRycyA9IGFbMF07XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhdHRycyA9IHB1Z19tZXJnZShhdHRycywgYVtpXSk7XG4gICAgfVxuICAgIHJldHVybiBhdHRycztcbiAgfVxuXG4gIGZvciAodmFyIGtleSBpbiBiKSB7XG4gICAgaWYgKGtleSA9PT0gJ2NsYXNzJykge1xuICAgICAgdmFyIHZhbEEgPSBhW2tleV0gfHwgW107XG4gICAgICBhW2tleV0gPSAoQXJyYXkuaXNBcnJheSh2YWxBKSA/IHZhbEEgOiBbdmFsQV0pLmNvbmNhdChiW2tleV0gfHwgW10pO1xuICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnc3R5bGUnKSB7XG4gICAgICB2YXIgdmFsQSA9IHB1Z19zdHlsZShhW2tleV0pO1xuICAgICAgdmFyIHZhbEIgPSBwdWdfc3R5bGUoYltrZXldKTtcbiAgICAgIGFba2V5XSA9IHZhbEEgKyB2YWxCO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2tleV0gPSBiW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGE7XG59O1xuXG4vKipcbiAqIFByb2Nlc3MgYXJyYXksIG9iamVjdCwgb3Igc3RyaW5nIGFzIGEgc3RyaW5nIG9mIGNsYXNzZXMgZGVsaW1pdGVkIGJ5IGEgc3BhY2UuXG4gKlxuICogSWYgYHZhbGAgaXMgYW4gYXJyYXksIGFsbCBtZW1iZXJzIG9mIGl0IGFuZCBpdHMgc3ViYXJyYXlzIGFyZSBjb3VudGVkIGFzXG4gKiBjbGFzc2VzLiBJZiBgZXNjYXBpbmdgIGlzIGFuIGFycmF5LCB0aGVuIHdoZXRoZXIgb3Igbm90IHRoZSBpdGVtIGluIGB2YWxgIGlzXG4gKiBlc2NhcGVkIGRlcGVuZHMgb24gdGhlIGNvcnJlc3BvbmRpbmcgaXRlbSBpbiBgZXNjYXBpbmdgLiBJZiBgZXNjYXBpbmdgIGlzXG4gKiBub3QgYW4gYXJyYXksIG5vIGVzY2FwaW5nIGlzIGRvbmUuXG4gKlxuICogSWYgYHZhbGAgaXMgYW4gb2JqZWN0LCBhbGwgdGhlIGtleXMgd2hvc2UgdmFsdWUgaXMgdHJ1dGh5IGFyZSBjb3VudGVkIGFzXG4gKiBjbGFzc2VzLiBObyBlc2NhcGluZyBpcyBkb25lLlxuICpcbiAqIElmIGB2YWxgIGlzIGEgc3RyaW5nLCBpdCBpcyBjb3VudGVkIGFzIGEgY2xhc3MuIE5vIGVzY2FwaW5nIGlzIGRvbmUuXG4gKlxuICogQHBhcmFtIHsoQXJyYXkuPHN0cmluZz58T2JqZWN0LjxzdHJpbmcsIGJvb2xlYW4+fHN0cmluZyl9IHZhbFxuICogQHBhcmFtIHs/QXJyYXkuPHN0cmluZz59IGVzY2FwaW5nXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuY2xhc3NlcyA9IHB1Z19jbGFzc2VzO1xuZnVuY3Rpb24gcHVnX2NsYXNzZXNfYXJyYXkodmFsLCBlc2NhcGluZykge1xuICB2YXIgY2xhc3NTdHJpbmcgPSAnJywgY2xhc3NOYW1lLCBwYWRkaW5nID0gJycsIGVzY2FwZUVuYWJsZWQgPSBBcnJheS5pc0FycmF5KGVzY2FwaW5nKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWwubGVuZ3RoOyBpKyspIHtcbiAgICBjbGFzc05hbWUgPSBwdWdfY2xhc3Nlcyh2YWxbaV0pO1xuICAgIGlmICghY2xhc3NOYW1lKSBjb250aW51ZTtcbiAgICBlc2NhcGVFbmFibGVkICYmIGVzY2FwaW5nW2ldICYmIChjbGFzc05hbWUgPSBwdWdfZXNjYXBlKGNsYXNzTmFtZSkpO1xuICAgIGNsYXNzU3RyaW5nID0gY2xhc3NTdHJpbmcgKyBwYWRkaW5nICsgY2xhc3NOYW1lO1xuICAgIHBhZGRpbmcgPSAnICc7XG4gIH1cbiAgcmV0dXJuIGNsYXNzU3RyaW5nO1xufVxuZnVuY3Rpb24gcHVnX2NsYXNzZXNfb2JqZWN0KHZhbCkge1xuICB2YXIgY2xhc3NTdHJpbmcgPSAnJywgcGFkZGluZyA9ICcnO1xuICBmb3IgKHZhciBrZXkgaW4gdmFsKSB7XG4gICAgaWYgKGtleSAmJiB2YWxba2V5XSAmJiBwdWdfaGFzX293bl9wcm9wZXJ0eS5jYWxsKHZhbCwga2V5KSkge1xuICAgICAgY2xhc3NTdHJpbmcgPSBjbGFzc1N0cmluZyArIHBhZGRpbmcgKyBrZXk7XG4gICAgICBwYWRkaW5nID0gJyAnO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY2xhc3NTdHJpbmc7XG59XG5mdW5jdGlvbiBwdWdfY2xhc3Nlcyh2YWwsIGVzY2FwaW5nKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICByZXR1cm4gcHVnX2NsYXNzZXNfYXJyYXkodmFsLCBlc2NhcGluZyk7XG4gIH0gZWxzZSBpZiAodmFsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIHB1Z19jbGFzc2VzX29iamVjdCh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB2YWwgfHwgJyc7XG4gIH1cbn1cblxuLyoqXG4gKiBDb252ZXJ0IG9iamVjdCBvciBzdHJpbmcgdG8gYSBzdHJpbmcgb2YgQ1NTIHN0eWxlcyBkZWxpbWl0ZWQgYnkgYSBzZW1pY29sb24uXG4gKlxuICogQHBhcmFtIHsoT2JqZWN0LjxzdHJpbmcsIHN0cmluZz58c3RyaW5nKX0gdmFsXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cblxuZXhwb3J0cy5zdHlsZSA9IHB1Z19zdHlsZTtcbmZ1bmN0aW9uIHB1Z19zdHlsZSh2YWwpIHtcbiAgaWYgKCF2YWwpIHJldHVybiAnJztcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgdmFyIG91dCA9ICcnO1xuICAgIGZvciAodmFyIHN0eWxlIGluIHZhbCkge1xuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgIGlmIChwdWdfaGFzX293bl9wcm9wZXJ0eS5jYWxsKHZhbCwgc3R5bGUpKSB7XG4gICAgICAgIG91dCA9IG91dCArIHN0eWxlICsgJzonICsgdmFsW3N0eWxlXSArICc7JztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG91dDtcbiAgfSBlbHNlIHtcbiAgICB2YWwgKz0gJyc7XG4gICAgaWYgKHZhbFt2YWwubGVuZ3RoIC0gMV0gIT09ICc7JykgXG4gICAgICByZXR1cm4gdmFsICsgJzsnO1xuICAgIHJldHVybiB2YWw7XG4gIH1cbn07XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBhdHRyaWJ1dGUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICogQHBhcmFtIHtTdHJpbmd9IHZhbFxuICogQHBhcmFtIHtCb29sZWFufSBlc2NhcGVkXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHRlcnNlXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuYXR0ciA9IHB1Z19hdHRyO1xuZnVuY3Rpb24gcHVnX2F0dHIoa2V5LCB2YWwsIGVzY2FwZWQsIHRlcnNlKSB7XG4gIGlmICh2YWwgPT09IGZhbHNlIHx8IHZhbCA9PSBudWxsIHx8ICF2YWwgJiYgKGtleSA9PT0gJ2NsYXNzJyB8fCBrZXkgPT09ICdzdHlsZScpKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG4gIGlmICh2YWwgPT09IHRydWUpIHtcbiAgICByZXR1cm4gJyAnICsgKHRlcnNlID8ga2V5IDoga2V5ICsgJz1cIicgKyBrZXkgKyAnXCInKTtcbiAgfVxuICBpZiAodHlwZW9mIHZhbC50b0pTT04gPT09ICdmdW5jdGlvbicpIHtcbiAgICB2YWwgPSB2YWwudG9KU09OKCk7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWwgIT09ICdzdHJpbmcnKSB7XG4gICAgdmFsID0gSlNPTi5zdHJpbmdpZnkodmFsKTtcbiAgICBpZiAoIWVzY2FwZWQgJiYgdmFsLmluZGV4T2YoJ1wiJykgIT09IC0xKSB7XG4gICAgICByZXR1cm4gJyAnICsga2V5ICsgJz1cXCcnICsgdmFsLnJlcGxhY2UoLycvZywgJyYjMzk7JykgKyAnXFwnJztcbiAgICB9XG4gIH1cbiAgaWYgKGVzY2FwZWQpIHZhbCA9IHB1Z19lc2NhcGUodmFsKTtcbiAgcmV0dXJuICcgJyArIGtleSArICc9XCInICsgdmFsICsgJ1wiJztcbn07XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBhdHRyaWJ1dGVzIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge09iamVjdH0gdGVyc2Ugd2hldGhlciB0byB1c2UgSFRNTDUgdGVyc2UgYm9vbGVhbiBhdHRyaWJ1dGVzXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuYXR0cnMgPSBwdWdfYXR0cnM7XG5mdW5jdGlvbiBwdWdfYXR0cnMob2JqLCB0ZXJzZSl7XG4gIHZhciBhdHRycyA9ICcnO1xuXG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiAocHVnX2hhc19vd25fcHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgIHZhciB2YWwgPSBvYmpba2V5XTtcblxuICAgICAgaWYgKCdjbGFzcycgPT09IGtleSkge1xuICAgICAgICB2YWwgPSBwdWdfY2xhc3Nlcyh2YWwpO1xuICAgICAgICBhdHRycyA9IHB1Z19hdHRyKGtleSwgdmFsLCBmYWxzZSwgdGVyc2UpICsgYXR0cnM7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKCdzdHlsZScgPT09IGtleSkge1xuICAgICAgICB2YWwgPSBwdWdfc3R5bGUodmFsKTtcbiAgICAgIH1cbiAgICAgIGF0dHJzICs9IHB1Z19hdHRyKGtleSwgdmFsLCBmYWxzZSwgdGVyc2UpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhdHRycztcbn07XG5cbi8qKlxuICogRXNjYXBlIHRoZSBnaXZlbiBzdHJpbmcgb2YgYGh0bWxgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBodG1sXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG52YXIgcHVnX21hdGNoX2h0bWwgPSAvW1wiJjw+XS87XG5leHBvcnRzLmVzY2FwZSA9IHB1Z19lc2NhcGU7XG5mdW5jdGlvbiBwdWdfZXNjYXBlKF9odG1sKXtcbiAgdmFyIGh0bWwgPSAnJyArIF9odG1sO1xuICB2YXIgcmVnZXhSZXN1bHQgPSBwdWdfbWF0Y2hfaHRtbC5leGVjKGh0bWwpO1xuICBpZiAoIXJlZ2V4UmVzdWx0KSByZXR1cm4gX2h0bWw7XG5cbiAgdmFyIHJlc3VsdCA9ICcnO1xuICB2YXIgaSwgbGFzdEluZGV4LCBlc2NhcGU7XG4gIGZvciAoaSA9IHJlZ2V4UmVzdWx0LmluZGV4LCBsYXN0SW5kZXggPSAwOyBpIDwgaHRtbC5sZW5ndGg7IGkrKykge1xuICAgIHN3aXRjaCAoaHRtbC5jaGFyQ29kZUF0KGkpKSB7XG4gICAgICBjYXNlIDM0OiBlc2NhcGUgPSAnJnF1b3Q7JzsgYnJlYWs7XG4gICAgICBjYXNlIDM4OiBlc2NhcGUgPSAnJmFtcDsnOyBicmVhaztcbiAgICAgIGNhc2UgNjA6IGVzY2FwZSA9ICcmbHQ7JzsgYnJlYWs7XG4gICAgICBjYXNlIDYyOiBlc2NhcGUgPSAnJmd0Oyc7IGJyZWFrO1xuICAgICAgZGVmYXVsdDogY29udGludWU7XG4gICAgfVxuICAgIGlmIChsYXN0SW5kZXggIT09IGkpIHJlc3VsdCArPSBodG1sLnN1YnN0cmluZyhsYXN0SW5kZXgsIGkpO1xuICAgIGxhc3RJbmRleCA9IGkgKyAxO1xuICAgIHJlc3VsdCArPSBlc2NhcGU7XG4gIH1cbiAgaWYgKGxhc3RJbmRleCAhPT0gaSkgcmV0dXJuIHJlc3VsdCArIGh0bWwuc3Vic3RyaW5nKGxhc3RJbmRleCwgaSk7XG4gIGVsc2UgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICogUmUtdGhyb3cgdGhlIGdpdmVuIGBlcnJgIGluIGNvbnRleHQgdG8gdGhlXG4gKiB0aGUgcHVnIGluIGBmaWxlbmFtZWAgYXQgdGhlIGdpdmVuIGBsaW5lbm9gLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVyclxuICogQHBhcmFtIHtTdHJpbmd9IGZpbGVuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ30gbGluZW5vXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIG9yaWdpbmFsIHNvdXJjZVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5yZXRocm93ID0gcHVnX3JldGhyb3c7XG5mdW5jdGlvbiBwdWdfcmV0aHJvdyhlcnIsIGZpbGVuYW1lLCBsaW5lbm8sIHN0cil7XG4gIGlmICghKGVyciBpbnN0YW5jZW9mIEVycm9yKSkgdGhyb3cgZXJyO1xuICBpZiAoKHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgfHwgIWZpbGVuYW1lKSAmJiAhc3RyKSB7XG4gICAgZXJyLm1lc3NhZ2UgKz0gJyBvbiBsaW5lICcgKyBsaW5lbm87XG4gICAgdGhyb3cgZXJyO1xuICB9XG4gIHRyeSB7XG4gICAgc3RyID0gc3RyIHx8IHJlcXVpcmUoJ2ZzJykucmVhZEZpbGVTeW5jKGZpbGVuYW1lLCAndXRmOCcpXG4gIH0gY2F0Y2ggKGV4KSB7XG4gICAgcHVnX3JldGhyb3coZXJyLCBudWxsLCBsaW5lbm8pXG4gIH1cbiAgdmFyIGNvbnRleHQgPSAzXG4gICAgLCBsaW5lcyA9IHN0ci5zcGxpdCgnXFxuJylcbiAgICAsIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gY29udGV4dCwgMClcbiAgICAsIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgY29udGV4dCk7XG5cbiAgLy8gRXJyb3IgY29udGV4dFxuICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/ICcgID4gJyA6ICcgICAgJylcbiAgICAgICsgY3VyclxuICAgICAgKyAnfCAnXG4gICAgICArIGxpbmU7XG4gIH0pLmpvaW4oJ1xcbicpO1xuXG4gIC8vIEFsdGVyIGV4Y2VwdGlvbiBtZXNzYWdlXG4gIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8ICdQdWcnKSArICc6JyArIGxpbmVub1xuICAgICsgJ1xcbicgKyBjb250ZXh0ICsgJ1xcblxcbicgKyBlcnIubWVzc2FnZTtcbiAgdGhyb3cgZXJyO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3B1Zy1ydW50aW1lL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBNYWluTWVudSBmcm9tICcuL21vZHVsZXMvTWFpbk1lbnUvTWFpbk1lbnUnXG5pbXBvcnQgUGFnaW5hdG9yIGZyb20gJy4vbW9kdWxlcy9QYWdpbmF0b3IvUGFnaW5hdG9yJ1xuXG4vKiBlc2xpbnQtZGlzYWJsZSAqL1xubmV3IE1haW5NZW51KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1NYWluTWVudS0xJykpXG5uZXcgUGFnaW5hdG9yKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1QYWdpbmF0b3ItMScpKVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL21haW4uanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vTWFpbk1lbnUucHVnJ1xuaW1wb3J0ICcuL01haW5NZW51LnNjc3MnXG5pbXBvcnQganNvbkRhdGEgZnJvbSAnLi8uLi8uLi8uLi9kYXRhL01haW5NZW51Lmpzb24nXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW5NZW51IHtcbiAgY29uc3RydWN0b3IgKG5vZGUpIHtcbiAgICB0aGlzLm5vZGUgPSBub2RlXG4gICAgdGhpcy5pbmRleFN1Ymxpc3QgPSAtMVxuICAgIHRoaXMubm9kZS5pbm5lckhUTUwgPSB0ZW1wbGF0ZShqc29uRGF0YSlcbiAgICB0aGlzLmdldE5vZGVzKClcbiAgICB0aGlzLnNldEV2ZW50cygpXG4gIH1cblxuICBzdGF0aWMgZ2V0IHN0YXRlcyAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN1Yk1lbnVPcGVuOiAnbWFpbi1tZW51X19zdWJsaXN0LS1vcGVuJyxcbiAgICAgIG1lbnVPcGVuOiAnbWFpbi1tZW51X19saXN0LS1vcGVuJyxcbiAgICAgIGJ1cmdlclRvcE9wZW46ICdtYWluLW1lbnVfX2hhbWJ1cmdlci10b3AtLW9wZW4nLFxuICAgICAgYnVyZ2VyQm90dG9tT3BlbjogJ21haW4tbWVudV9faGFtYnVyZ2VyLWJvdHRvbS0tb3BlbidcbiAgICB9XG4gIH1cblxuICBnZXROb2RlcyAoKSB7XG4gICAgdGhpcy5saXN0ID0gdGhpcy5ub2RlLnF1ZXJ5U2VsZWN0b3IoJy5tYWluLW1lbnVfX2xpc3QnKVxuICAgIHRoaXMuYnV0dG9ucyA9IHRoaXMubm9kZS5xdWVyeVNlbGVjdG9yQWxsKCcubWFpbi1tZW51X19idXR0b24nKVxuICAgIHRoaXMuaGFtYnVyZ2VyID0gdGhpcy5ub2RlLnF1ZXJ5U2VsZWN0b3IoJy5tYWluLW1lbnVfX2hhbWJ1cmdlcicpXG4gICAgdGhpcy5oYW1idXJnZXJUb3AgPSB0aGlzLm5vZGUucXVlcnlTZWxlY3RvcignLm1haW4tbWVudV9faGFtYnVyZ2VyLXRvcCcpXG4gICAgdGhpcy5oYW1idXJnZXJCb3R0b20gPSB0aGlzLm5vZGUucXVlcnlTZWxlY3RvcignLm1haW4tbWVudV9faGFtYnVyZ2VyLWJvdHRvbScpXG4gICAgdGhpcy5zdWJsaXN0cyA9IHRoaXMubm9kZS5xdWVyeVNlbGVjdG9yQWxsKCcubWFpbi1tZW51X19zdWJsaXN0JylcbiAgfVxuXG4gIHNldEV2ZW50cyAoKSB7XG4gICAgdGhpcy5saXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVDbGlja0xpc3QuYmluZCh0aGlzKSlcbiAgICB0aGlzLmhhbWJ1cmdlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlSGFtYnVyZ2VyLmJpbmQodGhpcykpXG4gIH1cblxuICBoYW5kbGVDbGlja0xpc3QgKGV2ZW50KSB7XG4gICAgdGhpcy5uZXdJbmRleFN1Ymxpc3QgPSBBcnJheS5mcm9tKHRoaXMuYnV0dG9ucykuaW5kZXhPZihldmVudC50YXJnZXQpXG4gICAgaWYgKHRoaXMuaW5kZXhTdWJsaXN0ICE9PSAtMSkge1xuICAgICAgdGhpcy5zdWJsaXN0c1t0aGlzLmluZGV4U3VibGlzdF0uY2xhc3NMaXN0LnJlbW92ZShNYWluTWVudS5zdGF0ZXMuc3ViTWVudU9wZW4pXG4gICAgICB0aGlzLnN1Ymxpc3RzW3RoaXMubmV3SW5kZXhTdWJsaXN0XS5jbGFzc0xpc3QuYWRkKE1haW5NZW51LnN0YXRlcy5zdWJNZW51T3BlbilcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuc3VibGlzdHNbdGhpcy5uZXdJbmRleFN1Ymxpc3RdLmNsYXNzTGlzdC5jb250YWlucyhNYWluTWVudS5zdGF0ZXMuc3ViTWVudU9wZW4pKSB7XG4gICAgICAgIHRoaXMuc3VibGlzdHNbdGhpcy5uZXdJbmRleFN1Ymxpc3RdLmNsYXNzTGlzdC5yZW1vdmUoTWFpbk1lbnUuc3RhdGVzLnN1Yk1lbnVPcGVuKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zdWJsaXN0c1t0aGlzLm5ld0luZGV4U3VibGlzdF0uY2xhc3NMaXN0LmFkZChNYWluTWVudS5zdGF0ZXMuc3ViTWVudU9wZW4pXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlSGFtYnVyZ2VyIChldmVudCkge1xuICAgIHRoaXMubGlzdC5jbGFzc0xpc3QudG9nZ2xlKE1haW5NZW51LnN0YXRlcy5tZW51T3BlbilcbiAgICB0aGlzLmhhbWJ1cmdlclRvcC5jbGFzc0xpc3QudG9nZ2xlKE1haW5NZW51LnN0YXRlcy5idXJnZXJUb3BPcGVuKVxuICAgIHRoaXMuaGFtYnVyZ2VyQm90dG9tLmNsYXNzTGlzdC50b2dnbGUoTWFpbk1lbnUuc3RhdGVzLmJ1cmdlckJvdHRvbU9wZW4pXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL21vZHVsZXMvTWFpbk1lbnUvTWFpbk1lbnUuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHB1ZyA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3B1Zy1ydW50aW1lL2luZGV4LmpzXCIpO1xuXG5mdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHt2YXIgcHVnX2h0bWwgPSBcIlwiLCBwdWdfbWl4aW5zID0ge30sIHB1Z19pbnRlcnA7O3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKE9iamVjdCwgbGlua3MsIGxvZ28pIHtwdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDZGl2IGNsYXNzPVxcXCJtYWluLW1lbnVfX3VwcGVyXFxcIlxcdTAwM0VcXHUwMDNDYSBjbGFzcz1cXFwibWFpbi1tZW51X19sb2dvXFxcIlxcdTAwM0VcXHUwMDNDaW1nXCIgKyAoXCIgY2xhc3M9XFxcIm1haW4tbWVudV9faW1hZ2Vsb2dvXFxcIlwiK3B1Zy5hdHRyKFwic3JjXCIsIGxvZ28uaW1nLCBmYWxzZSwgdHJ1ZSkrcHVnLmF0dHIoXCJocmVmXCIsIGxvZ28ubGluaywgZmFsc2UsIHRydWUpKSArIFwiXFx1MDAzRVxcdTAwM0NcXHUwMDJGYVxcdTAwM0VcXHUwMDNDZGl2IGNsYXNzPVxcXCJtYWluLW1lbnVfX2hhbWJ1cmdlclxcXCJcXHUwMDNFXFx1MDAzQ3NwYW4gY2xhc3M9XFxcIm1haW4tbWVudV9faGFtYnVyZ2VyLXRvcFxcXCJcXHUwMDNFXFx1MDAzQ1xcdTAwMkZzcGFuXFx1MDAzRVxcdTAwM0NzcGFuIGNsYXNzPVxcXCJtYWluLW1lbnVfX2hhbWJ1cmdlci1ib3R0b21cXFwiXFx1MDAzRVxcdTAwM0NcXHUwMDJGc3BhblxcdTAwM0VcXHUwMDNDXFx1MDAyRmRpdlxcdTAwM0VcXHUwMDNDXFx1MDAyRmRpdlxcdTAwM0VcXHUwMDNDdWwgY2xhc3M9XFxcIm1haW4tbWVudV9fbGlzdFxcXCJcXHUwMDNFXCI7XG4vLyBpdGVyYXRlIGxpbmtzXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IGxpbmtzO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuICAgICAgZm9yICh2YXIgcHVnX2luZGV4MCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgcHVnX2luZGV4MCA8ICQkbDsgcHVnX2luZGV4MCsrKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gJCRvYmpbcHVnX2luZGV4MF07XG5pZiAoT2JqZWN0LmtleXMoZWxlbWVudCkuaW5jbHVkZXMoJ2hyZWYnKSkge1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiXFx1MDAzQ2xpIGNsYXNzPVxcXCJtYWluLW1lbnVfX2l0ZW1cXFwiXFx1MDAzRVxcdTAwM0NhXCIgKyAoXCIgY2xhc3M9XFxcIm1haW4tbWVudV9fbGlua1xcXCJcIitwdWcuYXR0cihcImhyZWZcIiwgZWxlbWVudC5ocmVmLCBmYWxzZSwgdHJ1ZSkpICsgXCJcXHUwMDNFXCIgKyAobnVsbCA9PSAocHVnX2ludGVycCA9IGVsZW1lbnQubGFiZWwpID8gXCJcIiA6IHB1Z19pbnRlcnApICsgXCJcXHUwMDNDXFx1MDAyRmFcXHUwMDNFXFx1MDAzQ1xcdTAwMkZsaVxcdTAwM0VcIjtcbn1cbmVsc2Uge1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiXFx1MDAzQ2xpIGNsYXNzPVxcXCJtYWluLW1lbnVfX2l0ZW1cXFwiXFx1MDAzRVxcdTAwM0NidXR0b24gY2xhc3M9XFxcIm1haW4tbWVudV9fYnV0dG9uXFxcIlxcdTAwM0VcIiArIChudWxsID09IChwdWdfaW50ZXJwID0gZWxlbWVudC5sYWJlbCkgPyBcIlwiIDogcHVnX2ludGVycCkgKyBcIlxcdTAwM0NcXHUwMDJGYnV0dG9uXFx1MDAzRVxcdTAwM0N1bCBjbGFzcz1cXFwibWFpbi1tZW51X19zdWJsaXN0XFxcIlxcdTAwM0VcIjtcbi8vIGl0ZXJhdGUgZWxlbWVudC5saW5rc1xuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSBlbGVtZW50LmxpbmtzO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuICAgICAgZm9yICh2YXIgcHVnX2luZGV4MSA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgcHVnX2luZGV4MSA8ICQkbDsgcHVnX2luZGV4MSsrKSB7XG4gICAgICAgIHZhciBzdWJlbGVtZW50ID0gJCRvYmpbcHVnX2luZGV4MV07XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDbGkgY2xhc3M9XFxcIm1haW4tbWVudV9fc3ViaXRlbVxcXCJcXHUwMDNFIFxcdTAwM0NhXCIgKyAoXCIgY2xhc3M9XFxcIm1haW4tbWVudV9fbGluayBtYWluLW1lbnVfX2xpbmstLXN1Ymxpc3RcXFwiXCIrcHVnLmF0dHIoXCJocmVmXCIsIHN1YmVsZW1lbnQuaHJlZiwgZmFsc2UsIHRydWUpKSArIFwiXFx1MDAzRVwiICsgKG51bGwgPT0gKHB1Z19pbnRlcnAgPSBzdWJlbGVtZW50LmxhYmVsKSA/IFwiXCIgOiBwdWdfaW50ZXJwKSArIFwiXFx1MDAzQ1xcdTAwMkZhXFx1MDAzRVxcdTAwM0NcXHUwMDJGbGlcXHUwMDNFXCI7XG4gICAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgcHVnX2luZGV4MSBpbiAkJG9iaikge1xuICAgICAgJCRsKys7XG4gICAgICB2YXIgc3ViZWxlbWVudCA9ICQkb2JqW3B1Z19pbmRleDFdO1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiXFx1MDAzQ2xpIGNsYXNzPVxcXCJtYWluLW1lbnVfX3N1Yml0ZW1cXFwiXFx1MDAzRSBcXHUwMDNDYVwiICsgKFwiIGNsYXNzPVxcXCJtYWluLW1lbnVfX2xpbmsgbWFpbi1tZW51X19saW5rLS1zdWJsaXN0XFxcIlwiK3B1Zy5hdHRyKFwiaHJlZlwiLCBzdWJlbGVtZW50LmhyZWYsIGZhbHNlLCB0cnVlKSkgKyBcIlxcdTAwM0VcIiArIChudWxsID09IChwdWdfaW50ZXJwID0gc3ViZWxlbWVudC5sYWJlbCkgPyBcIlwiIDogcHVnX2ludGVycCkgKyBcIlxcdTAwM0NcXHUwMDJGYVxcdTAwM0VcXHUwMDNDXFx1MDAyRmxpXFx1MDAzRVwiO1xuICAgIH1cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiXFx1MDAzQ1xcdTAwMkZ1bFxcdTAwM0VcXHUwMDNDXFx1MDAyRmxpXFx1MDAzRVwiO1xufVxuICAgICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyIHB1Z19pbmRleDAgaW4gJCRvYmopIHtcbiAgICAgICQkbCsrO1xuICAgICAgdmFyIGVsZW1lbnQgPSAkJG9ialtwdWdfaW5kZXgwXTtcbmlmIChPYmplY3Qua2V5cyhlbGVtZW50KS5pbmNsdWRlcygnaHJlZicpKSB7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDbGkgY2xhc3M9XFxcIm1haW4tbWVudV9faXRlbVxcXCJcXHUwMDNFXFx1MDAzQ2FcIiArIChcIiBjbGFzcz1cXFwibWFpbi1tZW51X19saW5rXFxcIlwiK3B1Zy5hdHRyKFwiaHJlZlwiLCBlbGVtZW50LmhyZWYsIGZhbHNlLCB0cnVlKSkgKyBcIlxcdTAwM0VcIiArIChudWxsID09IChwdWdfaW50ZXJwID0gZWxlbWVudC5sYWJlbCkgPyBcIlwiIDogcHVnX2ludGVycCkgKyBcIlxcdTAwM0NcXHUwMDJGYVxcdTAwM0VcXHUwMDNDXFx1MDAyRmxpXFx1MDAzRVwiO1xufVxuZWxzZSB7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDbGkgY2xhc3M9XFxcIm1haW4tbWVudV9faXRlbVxcXCJcXHUwMDNFXFx1MDAzQ2J1dHRvbiBjbGFzcz1cXFwibWFpbi1tZW51X19idXR0b25cXFwiXFx1MDAzRVwiICsgKG51bGwgPT0gKHB1Z19pbnRlcnAgPSBlbGVtZW50LmxhYmVsKSA/IFwiXCIgOiBwdWdfaW50ZXJwKSArIFwiXFx1MDAzQ1xcdTAwMkZidXR0b25cXHUwMDNFXFx1MDAzQ3VsIGNsYXNzPVxcXCJtYWluLW1lbnVfX3N1Ymxpc3RcXFwiXFx1MDAzRVwiO1xuLy8gaXRlcmF0ZSBlbGVtZW50LmxpbmtzXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IGVsZW1lbnQubGlua3M7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG4gICAgICBmb3IgKHZhciBwdWdfaW5kZXgyID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyBwdWdfaW5kZXgyIDwgJCRsOyBwdWdfaW5kZXgyKyspIHtcbiAgICAgICAgdmFyIHN1YmVsZW1lbnQgPSAkJG9ialtwdWdfaW5kZXgyXTtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NsaSBjbGFzcz1cXFwibWFpbi1tZW51X19zdWJpdGVtXFxcIlxcdTAwM0UgXFx1MDAzQ2FcIiArIChcIiBjbGFzcz1cXFwibWFpbi1tZW51X19saW5rIG1haW4tbWVudV9fbGluay0tc3VibGlzdFxcXCJcIitwdWcuYXR0cihcImhyZWZcIiwgc3ViZWxlbWVudC5ocmVmLCBmYWxzZSwgdHJ1ZSkpICsgXCJcXHUwMDNFXCIgKyAobnVsbCA9PSAocHVnX2ludGVycCA9IHN1YmVsZW1lbnQubGFiZWwpID8gXCJcIiA6IHB1Z19pbnRlcnApICsgXCJcXHUwMDNDXFx1MDAyRmFcXHUwMDNFXFx1MDAzQ1xcdTAwMkZsaVxcdTAwM0VcIjtcbiAgICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciBwdWdfaW5kZXgyIGluICQkb2JqKSB7XG4gICAgICAkJGwrKztcbiAgICAgIHZhciBzdWJlbGVtZW50ID0gJCRvYmpbcHVnX2luZGV4Ml07XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDbGkgY2xhc3M9XFxcIm1haW4tbWVudV9fc3ViaXRlbVxcXCJcXHUwMDNFIFxcdTAwM0NhXCIgKyAoXCIgY2xhc3M9XFxcIm1haW4tbWVudV9fbGluayBtYWluLW1lbnVfX2xpbmstLXN1Ymxpc3RcXFwiXCIrcHVnLmF0dHIoXCJocmVmXCIsIHN1YmVsZW1lbnQuaHJlZiwgZmFsc2UsIHRydWUpKSArIFwiXFx1MDAzRVwiICsgKG51bGwgPT0gKHB1Z19pbnRlcnAgPSBzdWJlbGVtZW50LmxhYmVsKSA/IFwiXCIgOiBwdWdfaW50ZXJwKSArIFwiXFx1MDAzQ1xcdTAwMkZhXFx1MDAzRVxcdTAwM0NcXHUwMDJGbGlcXHUwMDNFXCI7XG4gICAgfVxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDXFx1MDAyRnVsXFx1MDAzRVxcdTAwM0NcXHUwMDJGbGlcXHUwMDNFXCI7XG59XG4gICAgfVxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDXFx1MDAyRnVsXFx1MDAzRVwiO30uY2FsbCh0aGlzLFwiT2JqZWN0XCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5PYmplY3Q6dHlwZW9mIE9iamVjdCE9PVwidW5kZWZpbmVkXCI/T2JqZWN0OnVuZGVmaW5lZCxcImxpbmtzXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5saW5rczp0eXBlb2YgbGlua3MhPT1cInVuZGVmaW5lZFwiP2xpbmtzOnVuZGVmaW5lZCxcImxvZ29cIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmxvZ286dHlwZW9mIGxvZ28hPT1cInVuZGVmaW5lZFwiP2xvZ286dW5kZWZpbmVkKSk7O3JldHVybiBwdWdfaHRtbDt9O1xubW9kdWxlLmV4cG9ydHMgPSB0ZW1wbGF0ZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9tb2R1bGVzL01haW5NZW51L01haW5NZW51LnB1Z1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiAoaWdub3JlZCkgKi9cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBmcyAoaWdub3JlZClcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9tb2R1bGVzL01haW5NZW51L01haW5NZW51LnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7XCJsb2dvXCI6e1wiaW1nXCI6XCJhc3NldHMvaW1hZ2VzL2xvZ28tZml0dGVkLnBuZ1wiLFwibGlua1wiOlwiL1wifSxcImxpbmtzXCI6W3tcImxhYmVsXCI6XCJIb21lXCIsXCJocmVmXCI6XCIvXCJ9LHtcImxhYmVsXCI6XCJSZXBvc2l0b3J5XCIsXCJocmVmXCI6XCJodHRwczovL2dpdGh1Yi5jb20vd2lsbGlhbWVnb21lei9NYWNoaW5lLUxlYXJuaW5nLVRlYWNoaW5nXCJ9LHtcImxhYmVsXCI6XCJQcm9qZWN0c1wiLFwibGlua3NcIjpbe1wibGFiZWxcIjpcIjIwMTgtMVwiLFwiaHJlZlwiOlwiL1wifV19XX1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2RhdGEvTWFpbk1lbnUuanNvblxuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgJy4vLi4vUG9zdC1jYXJkL1Bvc3QtY2FyZC5zY3NzJ1xuaW1wb3J0ICcuL1BhZ2luYXRvci5zY3NzJ1xuaW1wb3J0IGpzb25DYXJkcyBmcm9tICcuLy4uLy4uLy4uL2RhdGEvQ2FyZHNNYWluLmpzb24nXG5pbXBvcnQgdGVtcGxhdGVDb250YWluZXIgZnJvbSAnLi9QYWdpbmF0b3IucHVnJ1xuaW1wb3J0IHRlbXBsYXRlQ2FyZCBmcm9tICcuLy4uL1Bvc3QtY2FyZC9Qb3N0LWNhcmQucHVnJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYWdpbmF0b3Ige1xuICBjb25zdHJ1Y3RvciAobm9kZSwganNvblBhZ2VzKSB7XG4gICAgdGhpcy5ub2RlID0gbm9kZVxuICAgIHRoaXMubm9kZS5pbm5lckhUTUwgPSB0ZW1wbGF0ZUNvbnRhaW5lcigpXG4gICAgdGhpcy5qc29uUGFnZXMgPSBqc29uUGFnZXNcbiAgICB0aGlzLmluZGV4UGFnZSA9IDBcbiAgICB0aGlzLmNhcmRDb250YWluZXIgPSB0aGlzLm5vZGUucXVlcnlTZWxlY3RvcignLnBhZ2luYXRvcl9fcG9zdHMnKVxuICAgIHRoaXMuZmlsbFBhZ2luYXRvcigpXG4gIH1cblxuICBmaWxsUGFnaW5hdG9yICgpIHtcbiAgICBqc29uQ2FyZHMuZm9yRWFjaCgoY2FyZCkgPT4ge1xuICAgICAgdGhpcy5hZGRDYXJkKGNhcmQpXG4gICAgfSlcbiAgfVxuXG4gIGFkZENhcmQgKGpzb24pIHtcbiAgICB2YXIgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpXG4gICAgdmFyIGNhcmQgPSBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKHRlbXBsYXRlQ2FyZChqc29uKSwgJ3RleHQvaHRtbCcpLmJvZHkuY2hpbGRyZW5bMF1cbiAgICB0aGlzLmNhcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoY2FyZClcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbW9kdWxlcy9QYWdpbmF0b3IvUGFnaW5hdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbW9kdWxlcy9Qb3N0LWNhcmQvUG9zdC1jYXJkLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9tb2R1bGVzL1BhZ2luYXRvci9QYWdpbmF0b3Iuc2Nzc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IFt7XCJ0aXRsZVwiOlwiQ2xhc2UgaW50cm9kdWNjacOzblwiLFwiZGVzY3JpcHRpb25cIjpcIkludHJvZHVjY2nDs24gYWwgY3Vyc28geSBiYXNlc1wiLFwidWRhdGVcIjpcIjEzLTAyLTIwMThcIixcImNkYXRhXCI6XCIwNi0wMi0yMDE4XCIsXCJ1cmxcIjpcImh0dHBzOi8vZ2l0aHViLmNvbS93aWxsaWFtZWdvbWV6L01hY2hpbmUtTGVhcm5pbmctVGVhY2hpbmcvdHJlZS9tYXN0ZXIvbGVzc29ucy8yMDE4LTEvaW50cm9kdWN0aW9uXCJ9LHtcInRpdGxlXCI6XCJDbGFzZSBsw7NnaWNhIGRpZnVzYVwiLFwiZGVzY3JpcHRpb25cIjpcIkNvbmNlcHRvcyBkZSBsYSBsw7NnaWNhIGRpZnVzYSwgc2lzdGVtYXMgZGUgaW5mZXJlbmNpYVwiLFwidWRhdGVcIjpcIjIwLTAyLTIwMThcIixcImNkYXRhXCI6XCIxMy0wMi0yMDE4XCIsXCJ1cmxcIjpcImh0dHBzOi8vZ2l0aHViLmNvbS93aWxsaWFtZWdvbWV6L01hY2hpbmUtTGVhcm5pbmctVGVhY2hpbmcvYmxvYi9tYXN0ZXIvbGVzc29ucy8yMDE4LTEvRnV6enklMjBMb2dpY1wifSx7XCJ0aXRsZVwiOlwiUmVkYWNjacOzbiBkZSBvYmpldGl2b3MgcGFyYSBsYSBpbnZlc3RpZ2FjacOzblwiLFwiZGVzY3JpcHRpb25cIjpcIlJlZGFjY2nDs24gZGUgb2JqZXRpdm9zIGdlbmVyYWxlcyB5IGVzcGVjw61maWNvcy5cIixcInVkYXRlXCI6XCIyMi0wMi0yMDE4XCIsXCJjZGF0YVwiOlwiMjItMDItMjAxOFwiLFwidXJsXCI6XCJodHRwczovL2dpdGh1Yi5jb20vd2lsbGlhbWVnb21lei9NYWNoaW5lLUxlYXJuaW5nLVRlYWNoaW5nL2Jsb2IvbWFzdGVyL2xlc3NvbnMvMjAxOC0xL0dlbmVyYWwlMjBUb3BpY3NcIn0se1widGl0bGVcIjpcIlJlZ3Jlc2nDs24geSBDbGFzaWZpY2FjacOzblwiLFwiZGVzY3JpcHRpb25cIjpcIkNvbmNlcHRvcyBiYXNlcyBwYXJhIGVudGVuZGVyIGxvcyBwcmluY2lwaW9zIGRlbCBhcHJlbmRpemFqZSBzdXBlcnZpc2Fkb1wiLFwidWRhdGVcIjpcIjEyLTAzLTIwMThcIixcImNkYXRhXCI6XCIxMi0wMy0yMDE4XCIsXCJ1cmxcIjpcImh0dHBzOi8vZ2l0aHViLmNvbS93aWxsaWFtZWdvbWV6L01hY2hpbmUtTGVhcm5pbmctVGVhY2hpbmcvdHJlZS9tYXN0ZXIvbGVzc29ucy8yMDE4LTEvTmV1cmFsJTIwTmV0d29ya3NcIn0se1widGl0bGVcIjpcIlJlZGVzIE5ldXJvbmFsZXNcIixcImRlc2NyaXB0aW9uXCI6XCJJbnRyb2R1Y2Npw7NuLCBjb25jZXB0b3MgeSBldm9sdWNpw7NuXCIsXCJ1ZGF0ZVwiOlwiMTQtMDMtMjAxOFwiLFwiY2RhdGFcIjpcIjE0LTAzLTIwMThcIixcInVybFwiOlwiaHR0cHM6Ly9naXRodWIuY29tL3dpbGxpYW1lZ29tZXovTWFjaGluZS1MZWFybmluZy1UZWFjaGluZy90cmVlL21hc3Rlci9sZXNzb25zLzIwMTgtMS9OZXVyYWwlMjBOZXR3b3Jrc1wifV1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2RhdGEvQ2FyZHNNYWluLmpzb25cbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBwdWcgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wdWctcnVudGltZS9pbmRleC5qc1wiKTtcblxuZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7dmFyIHB1Z19odG1sID0gXCJcIiwgcHVnX21peGlucyA9IHt9LCBwdWdfaW50ZXJwO3B1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NoMSBjbGFzcz1cXFwicGFnaW5hdG9yX190aXRsZVxcXCJcXHUwMDNFUG9zdHNcXHUwMDNDXFx1MDAyRmgxXFx1MDAzRVxcdTAwM0NzZWN0aW9uIGNsYXNzPVxcXCJwYWdpbmF0b3JfX3Bvc3RzXFxcIlxcdTAwM0VcXHUwMDNDXFx1MDAyRnNlY3Rpb25cXHUwMDNFXFx1MDAzQ3VsIGNsYXNzPVxcXCJwYWdpbmF0b3JfX2NvbnRyb2xcXFwiXFx1MDAzRVxcdTAwM0NsaSBjbGFzcz1cXFwicGFnaW5hdG9yX19jb250cm9sLWl0ZW1cXFwiXFx1MDAzRSZsYXF1bztcXHUwMDNDXFx1MDAyRmxpXFx1MDAzRVxcdTAwM0NsaSBjbGFzcz1cXFwicGFnaW5hdG9yX19jb250cm9sLWl0ZW1cXFwiXFx1MDAzRTFcXHUwMDNDXFx1MDAyRmxpXFx1MDAzRVxcdTAwM0NsaSBjbGFzcz1cXFwicGFnaW5hdG9yX19jb250cm9sLWl0ZW1cXFwiXFx1MDAzRSZyYXF1bztcXHUwMDNDXFx1MDAyRmxpXFx1MDAzRVxcdTAwM0NcXHUwMDJGdWxcXHUwMDNFXCI7O3JldHVybiBwdWdfaHRtbDt9O1xubW9kdWxlLmV4cG9ydHMgPSB0ZW1wbGF0ZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9tb2R1bGVzL1BhZ2luYXRvci9QYWdpbmF0b3IucHVnXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgcHVnID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcHVnLXJ1bnRpbWUvaW5kZXguanNcIik7XG5cbmZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge3ZhciBwdWdfaHRtbCA9IFwiXCIsIHB1Z19taXhpbnMgPSB7fSwgcHVnX2ludGVycDs7dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAoZGVzY3JpcHRpb24sIHRpdGxlLCB1ZGF0ZSwgdXJsKSB7cHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiXFx1MDAzQ2FydGljbGUgY2xhc3M9XFxcInBvc3QtY2FyZFxcXCJcXHUwMDNFXFx1MDAzQ2FcIiArIChcIiBjbGFzcz1cXFwicG9zdC1jYXJkX19hY29udGFpbmVyXFxcIlwiK3B1Zy5hdHRyKFwiaHJlZlwiLCB1cmwsIGZhbHNlLCB0cnVlKSkgKyBcIlxcdTAwM0VcXHUwMDNDaDEgY2xhc3M9XFxcInBvc3QtY2FyZF9fdGl0bGVcXFwiXFx1MDAzRVwiICsgKG51bGwgPT0gKHB1Z19pbnRlcnAgPSB0aXRsZSkgPyBcIlwiIDogcHVnX2ludGVycCkgKyBcIlxcdTAwM0NcXHUwMDJGaDFcXHUwMDNFXFx1MDAzQ3AgY2xhc3M9XFxcInBvc3QtY2FyZF9fZGVzY3JpcHRpb25cXFwiXFx1MDAzRVwiICsgKG51bGwgPT0gKHB1Z19pbnRlcnAgPSBkZXNjcmlwdGlvbikgPyBcIlwiIDogcHVnX2ludGVycCkgKyBcIlxcdTAwM0NcXHUwMDJGcFxcdTAwM0VcXHUwMDNDZGl2IGNsYXNzPVxcXCJwb3N0LWNhcmRfX2RhdGVcXFwiXFx1MDAzRVxcdTAwM0NzcGFuIGNsYXNzPVxcXCJwb3N0LWNhcmRfX2RhdGUtY2xhYmVsXFxcIlxcdTAwM0VGZWNoYSBkZSBjcmVhY2nDs246XFx1MDAzQ1xcdTAwMkZzcGFuXFx1MDAzRVxcdTAwM0NzcGFuIGNsYXNzPVxcXCJwb3N0LWNhcmRfX2RhdGUtY3JlYXRlZFxcXCJcXHUwMDNFXCIgKyAobnVsbCA9PSAocHVnX2ludGVycCA9IHVkYXRlKSA/IFwiXCIgOiBwdWdfaW50ZXJwKSArIFwiXFx1MDAzQ1xcdTAwMkZzcGFuXFx1MDAzRVxcdTAwM0NzcGFuIGNsYXNzPVxcXCJwb3N0LWNhcmRfX2RhdGUtdWxhYmVsXFxcIlxcdTAwM0VGZWNoYSBkZSBhY3R1YWxpemFjacOzbjpcXHUwMDNDXFx1MDAyRnNwYW5cXHUwMDNFXFx1MDAzQ3NwYW4gY2xhc3M9XFxcInBvc3QtY2FyZF9fZGF0ZS11cGRhdGVkXFxcIlxcdTAwM0VcIiArIChudWxsID09IChwdWdfaW50ZXJwID0gdWRhdGUpID8gXCJcIiA6IHB1Z19pbnRlcnApICsgXCJcXHUwMDNDXFx1MDAyRnNwYW5cXHUwMDNFXFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXFx1MDAzQ1xcdTAwMkZhXFx1MDAzRVxcdTAwM0NcXHUwMDJGYXJ0aWNsZVxcdTAwM0VcIjt9LmNhbGwodGhpcyxcImRlc2NyaXB0aW9uXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5kZXNjcmlwdGlvbjp0eXBlb2YgZGVzY3JpcHRpb24hPT1cInVuZGVmaW5lZFwiP2Rlc2NyaXB0aW9uOnVuZGVmaW5lZCxcInRpdGxlXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC50aXRsZTp0eXBlb2YgdGl0bGUhPT1cInVuZGVmaW5lZFwiP3RpdGxlOnVuZGVmaW5lZCxcInVkYXRlXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC51ZGF0ZTp0eXBlb2YgdWRhdGUhPT1cInVuZGVmaW5lZFwiP3VkYXRlOnVuZGVmaW5lZCxcInVybFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgudXJsOnR5cGVvZiB1cmwhPT1cInVuZGVmaW5lZFwiP3VybDp1bmRlZmluZWQpKTs7cmV0dXJuIHB1Z19odG1sO307XG5tb2R1bGUuZXhwb3J0cyA9IHRlbXBsYXRlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL21vZHVsZXMvUG9zdC1jYXJkL1Bvc3QtY2FyZC5wdWdcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=