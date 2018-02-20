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

module.exports = [{"title":"Clase introducción","description":"Introducción al curso y bases","udate":"13-02-2018","cdata":"06-02-2018","url":"https://github.com/williamegomez/Machine-Learning-Teaching/tree/master/lessons/2018-1/introduction"},{"title":"Clase lógica difusa","description":"Conceptos de la lógica difusa, sistemas de inferencia","udate":"20-02-2018","cdata":"13-02-2018","url":"https://github.com/williamegomez/Machine-Learning-Teaching/blob/master/lessons/2018-1/Fuzzy%20Logic"}]

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzA5NWM5NzU2OTY5MzQwYWJiZDYiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3B1Zy1ydW50aW1lL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9tYWluLmpzIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL01haW5NZW51L01haW5NZW51LmpzIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL01haW5NZW51L01haW5NZW51LnB1ZyIsIndlYnBhY2s6Ly8vZnMgKGlnbm9yZWQpIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL01haW5NZW51L01haW5NZW51LnNjc3MiLCJ3ZWJwYWNrOi8vLy4vZGF0YS9NYWluTWVudS5qc29uIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL1BhZ2luYXRvci9QYWdpbmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZHVsZXMvUG9zdC1jYXJkL1Bvc3QtY2FyZC5zY3NzIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL1BhZ2luYXRvci9QYWdpbmF0b3Iuc2NzcyIsIndlYnBhY2s6Ly8vLi9kYXRhL0NhcmRzTWFpbi5qc29uIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL1BhZ2luYXRvci9QYWdpbmF0b3IucHVnIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL1Bvc3QtY2FyZC9Qb3N0LWNhcmQucHVnIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixF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QUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTs7Ozs7OztBQzNCQSx5Qzs7Ozs7O0FDQUEseUM7Ozs7OztBQ0FBLG1CQUFtQixnT0FBZ08sRUFBRSwwUEFBMFAsQzs7Ozs7O0FDQS9lOztBQUVBLDJCQUEyQixrQ0FBa0MsYUFBYSxrUUFBa1EsZ0pBQWdKLDJDQUEyQztBQUN2Z0IsMEI7Ozs7OztBQ0hBOztBQUVBLDJCQUEyQixrQ0FBa0MsY0FBYyxtQ0FBbUMsRUFBRSw0Q0FBNEMsazdCQUFrN0IsOFlBQThZO0FBQzU5QywwQiIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNzA5NWM5NzU2OTY5MzQwYWJiZDYiLCIndXNlIHN0cmljdCc7XG5cbnZhciBwdWdfaGFzX293bl9wcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogTWVyZ2UgdHdvIGF0dHJpYnV0ZSBvYmplY3RzIGdpdmluZyBwcmVjZWRlbmNlXG4gKiB0byB2YWx1ZXMgaW4gb2JqZWN0IGBiYC4gQ2xhc3NlcyBhcmUgc3BlY2lhbC1jYXNlZFxuICogYWxsb3dpbmcgZm9yIGFycmF5cyBhbmQgbWVyZ2luZy9qb2luaW5nIGFwcHJvcHJpYXRlbHlcbiAqIHJlc3VsdGluZyBpbiBhIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYVxuICogQHBhcmFtIHtPYmplY3R9IGJcbiAqIEByZXR1cm4ge09iamVjdH0gYVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5tZXJnZSA9IHB1Z19tZXJnZTtcbmZ1bmN0aW9uIHB1Z19tZXJnZShhLCBiKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgdmFyIGF0dHJzID0gYVswXTtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGF0dHJzID0gcHVnX21lcmdlKGF0dHJzLCBhW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIGF0dHJzO1xuICB9XG5cbiAgZm9yICh2YXIga2V5IGluIGIpIHtcbiAgICBpZiAoa2V5ID09PSAnY2xhc3MnKSB7XG4gICAgICB2YXIgdmFsQSA9IGFba2V5XSB8fCBbXTtcbiAgICAgIGFba2V5XSA9IChBcnJheS5pc0FycmF5KHZhbEEpID8gdmFsQSA6IFt2YWxBXSkuY29uY2F0KGJba2V5XSB8fCBbXSk7XG4gICAgfSBlbHNlIGlmIChrZXkgPT09ICdzdHlsZScpIHtcbiAgICAgIHZhciB2YWxBID0gcHVnX3N0eWxlKGFba2V5XSk7XG4gICAgICB2YXIgdmFsQiA9IHB1Z19zdHlsZShiW2tleV0pO1xuICAgICAgYVtrZXldID0gdmFsQSArIHZhbEI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFba2V5XSA9IGJba2V5XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYTtcbn07XG5cbi8qKlxuICogUHJvY2VzcyBhcnJheSwgb2JqZWN0LCBvciBzdHJpbmcgYXMgYSBzdHJpbmcgb2YgY2xhc3NlcyBkZWxpbWl0ZWQgYnkgYSBzcGFjZS5cbiAqXG4gKiBJZiBgdmFsYCBpcyBhbiBhcnJheSwgYWxsIG1lbWJlcnMgb2YgaXQgYW5kIGl0cyBzdWJhcnJheXMgYXJlIGNvdW50ZWQgYXNcbiAqIGNsYXNzZXMuIElmIGBlc2NhcGluZ2AgaXMgYW4gYXJyYXksIHRoZW4gd2hldGhlciBvciBub3QgdGhlIGl0ZW0gaW4gYHZhbGAgaXNcbiAqIGVzY2FwZWQgZGVwZW5kcyBvbiB0aGUgY29ycmVzcG9uZGluZyBpdGVtIGluIGBlc2NhcGluZ2AuIElmIGBlc2NhcGluZ2AgaXNcbiAqIG5vdCBhbiBhcnJheSwgbm8gZXNjYXBpbmcgaXMgZG9uZS5cbiAqXG4gKiBJZiBgdmFsYCBpcyBhbiBvYmplY3QsIGFsbCB0aGUga2V5cyB3aG9zZSB2YWx1ZSBpcyB0cnV0aHkgYXJlIGNvdW50ZWQgYXNcbiAqIGNsYXNzZXMuIE5vIGVzY2FwaW5nIGlzIGRvbmUuXG4gKlxuICogSWYgYHZhbGAgaXMgYSBzdHJpbmcsIGl0IGlzIGNvdW50ZWQgYXMgYSBjbGFzcy4gTm8gZXNjYXBpbmcgaXMgZG9uZS5cbiAqXG4gKiBAcGFyYW0geyhBcnJheS48c3RyaW5nPnxPYmplY3QuPHN0cmluZywgYm9vbGVhbj58c3RyaW5nKX0gdmFsXG4gKiBAcGFyYW0gez9BcnJheS48c3RyaW5nPn0gZXNjYXBpbmdcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5jbGFzc2VzID0gcHVnX2NsYXNzZXM7XG5mdW5jdGlvbiBwdWdfY2xhc3Nlc19hcnJheSh2YWwsIGVzY2FwaW5nKSB7XG4gIHZhciBjbGFzc1N0cmluZyA9ICcnLCBjbGFzc05hbWUsIHBhZGRpbmcgPSAnJywgZXNjYXBlRW5hYmxlZCA9IEFycmF5LmlzQXJyYXkoZXNjYXBpbmcpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbC5sZW5ndGg7IGkrKykge1xuICAgIGNsYXNzTmFtZSA9IHB1Z19jbGFzc2VzKHZhbFtpXSk7XG4gICAgaWYgKCFjbGFzc05hbWUpIGNvbnRpbnVlO1xuICAgIGVzY2FwZUVuYWJsZWQgJiYgZXNjYXBpbmdbaV0gJiYgKGNsYXNzTmFtZSA9IHB1Z19lc2NhcGUoY2xhc3NOYW1lKSk7XG4gICAgY2xhc3NTdHJpbmcgPSBjbGFzc1N0cmluZyArIHBhZGRpbmcgKyBjbGFzc05hbWU7XG4gICAgcGFkZGluZyA9ICcgJztcbiAgfVxuICByZXR1cm4gY2xhc3NTdHJpbmc7XG59XG5mdW5jdGlvbiBwdWdfY2xhc3Nlc19vYmplY3QodmFsKSB7XG4gIHZhciBjbGFzc1N0cmluZyA9ICcnLCBwYWRkaW5nID0gJyc7XG4gIGZvciAodmFyIGtleSBpbiB2YWwpIHtcbiAgICBpZiAoa2V5ICYmIHZhbFtrZXldICYmIHB1Z19oYXNfb3duX3Byb3BlcnR5LmNhbGwodmFsLCBrZXkpKSB7XG4gICAgICBjbGFzc1N0cmluZyA9IGNsYXNzU3RyaW5nICsgcGFkZGluZyArIGtleTtcbiAgICAgIHBhZGRpbmcgPSAnICc7XG4gICAgfVxuICB9XG4gIHJldHVybiBjbGFzc1N0cmluZztcbn1cbmZ1bmN0aW9uIHB1Z19jbGFzc2VzKHZhbCwgZXNjYXBpbmcpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSkge1xuICAgIHJldHVybiBwdWdfY2xhc3Nlc19hcnJheSh2YWwsIGVzY2FwaW5nKTtcbiAgfSBlbHNlIGlmICh2YWwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gcHVnX2NsYXNzZXNfb2JqZWN0KHZhbCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHZhbCB8fCAnJztcbiAgfVxufVxuXG4vKipcbiAqIENvbnZlcnQgb2JqZWN0IG9yIHN0cmluZyB0byBhIHN0cmluZyBvZiBDU1Mgc3R5bGVzIGRlbGltaXRlZCBieSBhIHNlbWljb2xvbi5cbiAqXG4gKiBAcGFyYW0geyhPYmplY3QuPHN0cmluZywgc3RyaW5nPnxzdHJpbmcpfSB2YWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuXG5leHBvcnRzLnN0eWxlID0gcHVnX3N0eWxlO1xuZnVuY3Rpb24gcHVnX3N0eWxlKHZhbCkge1xuICBpZiAoIXZhbCkgcmV0dXJuICcnO1xuICBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICB2YXIgb3V0ID0gJyc7XG4gICAgZm9yICh2YXIgc3R5bGUgaW4gdmFsKSB7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgaWYgKHB1Z19oYXNfb3duX3Byb3BlcnR5LmNhbGwodmFsLCBzdHlsZSkpIHtcbiAgICAgICAgb3V0ID0gb3V0ICsgc3R5bGUgKyAnOicgKyB2YWxbc3R5bGVdICsgJzsnO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb3V0O1xuICB9IGVsc2Uge1xuICAgIHZhbCArPSAnJztcbiAgICBpZiAodmFsW3ZhbC5sZW5ndGggLSAxXSAhPT0gJzsnKSBcbiAgICAgIHJldHVybiB2YWwgKyAnOyc7XG4gICAgcmV0dXJuIHZhbDtcbiAgfVxufTtcblxuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGF0dHJpYnV0ZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGVzY2FwZWRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdGVyc2VcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5hdHRyID0gcHVnX2F0dHI7XG5mdW5jdGlvbiBwdWdfYXR0cihrZXksIHZhbCwgZXNjYXBlZCwgdGVyc2UpIHtcbiAgaWYgKHZhbCA9PT0gZmFsc2UgfHwgdmFsID09IG51bGwgfHwgIXZhbCAmJiAoa2V5ID09PSAnY2xhc3MnIHx8IGtleSA9PT0gJ3N0eWxlJykpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbiAgaWYgKHZhbCA9PT0gdHJ1ZSkge1xuICAgIHJldHVybiAnICcgKyAodGVyc2UgPyBrZXkgOiBrZXkgKyAnPVwiJyArIGtleSArICdcIicpO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsLnRvSlNPTiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHZhbCA9IHZhbC50b0pTT04oKTtcbiAgfVxuICBpZiAodHlwZW9mIHZhbCAhPT0gJ3N0cmluZycpIHtcbiAgICB2YWwgPSBKU09OLnN0cmluZ2lmeSh2YWwpO1xuICAgIGlmICghZXNjYXBlZCAmJiB2YWwuaW5kZXhPZignXCInKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiAnICcgKyBrZXkgKyAnPVxcJycgKyB2YWwucmVwbGFjZSgvJy9nLCAnJiMzOTsnKSArICdcXCcnO1xuICAgIH1cbiAgfVxuICBpZiAoZXNjYXBlZCkgdmFsID0gcHVnX2VzY2FwZSh2YWwpO1xuICByZXR1cm4gJyAnICsga2V5ICsgJz1cIicgKyB2YWwgKyAnXCInO1xufTtcblxuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGF0dHJpYnV0ZXMgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7T2JqZWN0fSB0ZXJzZSB3aGV0aGVyIHRvIHVzZSBIVE1MNSB0ZXJzZSBib29sZWFuIGF0dHJpYnV0ZXNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5hdHRycyA9IHB1Z19hdHRycztcbmZ1bmN0aW9uIHB1Z19hdHRycyhvYmosIHRlcnNlKXtcbiAgdmFyIGF0dHJzID0gJyc7XG5cbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIGlmIChwdWdfaGFzX293bl9wcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgdmFyIHZhbCA9IG9ialtrZXldO1xuXG4gICAgICBpZiAoJ2NsYXNzJyA9PT0ga2V5KSB7XG4gICAgICAgIHZhbCA9IHB1Z19jbGFzc2VzKHZhbCk7XG4gICAgICAgIGF0dHJzID0gcHVnX2F0dHIoa2V5LCB2YWwsIGZhbHNlLCB0ZXJzZSkgKyBhdHRycztcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAoJ3N0eWxlJyA9PT0ga2V5KSB7XG4gICAgICAgIHZhbCA9IHB1Z19zdHlsZSh2YWwpO1xuICAgICAgfVxuICAgICAgYXR0cnMgKz0gcHVnX2F0dHIoa2V5LCB2YWwsIGZhbHNlLCB0ZXJzZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGF0dHJzO1xufTtcblxuLyoqXG4gKiBFc2NhcGUgdGhlIGdpdmVuIHN0cmluZyBvZiBgaHRtbGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGh0bWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbnZhciBwdWdfbWF0Y2hfaHRtbCA9IC9bXCImPD5dLztcbmV4cG9ydHMuZXNjYXBlID0gcHVnX2VzY2FwZTtcbmZ1bmN0aW9uIHB1Z19lc2NhcGUoX2h0bWwpe1xuICB2YXIgaHRtbCA9ICcnICsgX2h0bWw7XG4gIHZhciByZWdleFJlc3VsdCA9IHB1Z19tYXRjaF9odG1sLmV4ZWMoaHRtbCk7XG4gIGlmICghcmVnZXhSZXN1bHQpIHJldHVybiBfaHRtbDtcblxuICB2YXIgcmVzdWx0ID0gJyc7XG4gIHZhciBpLCBsYXN0SW5kZXgsIGVzY2FwZTtcbiAgZm9yIChpID0gcmVnZXhSZXN1bHQuaW5kZXgsIGxhc3RJbmRleCA9IDA7IGkgPCBodG1sLmxlbmd0aDsgaSsrKSB7XG4gICAgc3dpdGNoIChodG1sLmNoYXJDb2RlQXQoaSkpIHtcbiAgICAgIGNhc2UgMzQ6IGVzY2FwZSA9ICcmcXVvdDsnOyBicmVhaztcbiAgICAgIGNhc2UgMzg6IGVzY2FwZSA9ICcmYW1wOyc7IGJyZWFrO1xuICAgICAgY2FzZSA2MDogZXNjYXBlID0gJyZsdDsnOyBicmVhaztcbiAgICAgIGNhc2UgNjI6IGVzY2FwZSA9ICcmZ3Q7JzsgYnJlYWs7XG4gICAgICBkZWZhdWx0OiBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKGxhc3RJbmRleCAhPT0gaSkgcmVzdWx0ICs9IGh0bWwuc3Vic3RyaW5nKGxhc3RJbmRleCwgaSk7XG4gICAgbGFzdEluZGV4ID0gaSArIDE7XG4gICAgcmVzdWx0ICs9IGVzY2FwZTtcbiAgfVxuICBpZiAobGFzdEluZGV4ICE9PSBpKSByZXR1cm4gcmVzdWx0ICsgaHRtbC5zdWJzdHJpbmcobGFzdEluZGV4LCBpKTtcbiAgZWxzZSByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBSZS10aHJvdyB0aGUgZ2l2ZW4gYGVycmAgaW4gY29udGV4dCB0byB0aGVcbiAqIHRoZSBwdWcgaW4gYGZpbGVuYW1lYCBhdCB0aGUgZ2l2ZW4gYGxpbmVub2AuXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyXG4gKiBAcGFyYW0ge1N0cmluZ30gZmlsZW5hbWVcbiAqIEBwYXJhbSB7U3RyaW5nfSBsaW5lbm9cbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgb3JpZ2luYWwgc291cmNlXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLnJldGhyb3cgPSBwdWdfcmV0aHJvdztcbmZ1bmN0aW9uIHB1Z19yZXRocm93KGVyciwgZmlsZW5hbWUsIGxpbmVubywgc3RyKXtcbiAgaWYgKCEoZXJyIGluc3RhbmNlb2YgRXJyb3IpKSB0aHJvdyBlcnI7XG4gIGlmICgodHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyB8fCAhZmlsZW5hbWUpICYmICFzdHIpIHtcbiAgICBlcnIubWVzc2FnZSArPSAnIG9uIGxpbmUgJyArIGxpbmVubztcbiAgICB0aHJvdyBlcnI7XG4gIH1cbiAgdHJ5IHtcbiAgICBzdHIgPSBzdHIgfHwgcmVxdWlyZSgnZnMnKS5yZWFkRmlsZVN5bmMoZmlsZW5hbWUsICd1dGY4JylcbiAgfSBjYXRjaCAoZXgpIHtcbiAgICBwdWdfcmV0aHJvdyhlcnIsIG51bGwsIGxpbmVubylcbiAgfVxuICB2YXIgY29udGV4dCA9IDNcbiAgICAsIGxpbmVzID0gc3RyLnNwbGl0KCdcXG4nKVxuICAgICwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSBjb250ZXh0LCAwKVxuICAgICwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyBjb250ZXh0KTtcblxuICAvLyBFcnJvciBjb250ZXh0XG4gIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gJyAgPiAnIDogJyAgICAnKVxuICAgICAgKyBjdXJyXG4gICAgICArICd8ICdcbiAgICAgICsgbGluZTtcbiAgfSkuam9pbignXFxuJyk7XG5cbiAgLy8gQWx0ZXIgZXhjZXB0aW9uIG1lc3NhZ2VcbiAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgJ1B1ZycpICsgJzonICsgbGluZW5vXG4gICAgKyAnXFxuJyArIGNvbnRleHQgKyAnXFxuXFxuJyArIGVyci5tZXNzYWdlO1xuICB0aHJvdyBlcnI7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHVnLXJ1bnRpbWUvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IE1haW5NZW51IGZyb20gJy4vbW9kdWxlcy9NYWluTWVudS9NYWluTWVudSdcbmltcG9ydCBQYWdpbmF0b3IgZnJvbSAnLi9tb2R1bGVzL1BhZ2luYXRvci9QYWdpbmF0b3InXG5cbi8qIGVzbGludC1kaXNhYmxlICovXG5uZXcgTWFpbk1lbnUoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLU1haW5NZW51LTEnKSlcbm5ldyBQYWdpbmF0b3IoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLVBhZ2luYXRvci0xJykpXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbWFpbi5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi9NYWluTWVudS5wdWcnXG5pbXBvcnQgJy4vTWFpbk1lbnUuc2NzcydcbmltcG9ydCBqc29uRGF0YSBmcm9tICcuLy4uLy4uLy4uL2RhdGEvTWFpbk1lbnUuanNvbidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbk1lbnUge1xuICBjb25zdHJ1Y3RvciAobm9kZSkge1xuICAgIHRoaXMubm9kZSA9IG5vZGVcbiAgICB0aGlzLmluZGV4U3VibGlzdCA9IC0xXG4gICAgdGhpcy5ub2RlLmlubmVySFRNTCA9IHRlbXBsYXRlKGpzb25EYXRhKVxuICAgIHRoaXMuZ2V0Tm9kZXMoKVxuICAgIHRoaXMuc2V0RXZlbnRzKClcbiAgfVxuXG4gIHN0YXRpYyBnZXQgc3RhdGVzICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3ViTWVudU9wZW46ICdtYWluLW1lbnVfX3N1Ymxpc3QtLW9wZW4nLFxuICAgICAgbWVudU9wZW46ICdtYWluLW1lbnVfX2xpc3QtLW9wZW4nLFxuICAgICAgYnVyZ2VyVG9wT3BlbjogJ21haW4tbWVudV9faGFtYnVyZ2VyLXRvcC0tb3BlbicsXG4gICAgICBidXJnZXJCb3R0b21PcGVuOiAnbWFpbi1tZW51X19oYW1idXJnZXItYm90dG9tLS1vcGVuJ1xuICAgIH1cbiAgfVxuXG4gIGdldE5vZGVzICgpIHtcbiAgICB0aGlzLmxpc3QgPSB0aGlzLm5vZGUucXVlcnlTZWxlY3RvcignLm1haW4tbWVudV9fbGlzdCcpXG4gICAgdGhpcy5idXR0b25zID0gdGhpcy5ub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoJy5tYWluLW1lbnVfX2J1dHRvbicpXG4gICAgdGhpcy5oYW1idXJnZXIgPSB0aGlzLm5vZGUucXVlcnlTZWxlY3RvcignLm1haW4tbWVudV9faGFtYnVyZ2VyJylcbiAgICB0aGlzLmhhbWJ1cmdlclRvcCA9IHRoaXMubm9kZS5xdWVyeVNlbGVjdG9yKCcubWFpbi1tZW51X19oYW1idXJnZXItdG9wJylcbiAgICB0aGlzLmhhbWJ1cmdlckJvdHRvbSA9IHRoaXMubm9kZS5xdWVyeVNlbGVjdG9yKCcubWFpbi1tZW51X19oYW1idXJnZXItYm90dG9tJylcbiAgICB0aGlzLnN1Ymxpc3RzID0gdGhpcy5ub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoJy5tYWluLW1lbnVfX3N1Ymxpc3QnKVxuICB9XG5cbiAgc2V0RXZlbnRzICgpIHtcbiAgICB0aGlzLmxpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUNsaWNrTGlzdC5iaW5kKHRoaXMpKVxuICAgIHRoaXMuaGFtYnVyZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVIYW1idXJnZXIuYmluZCh0aGlzKSlcbiAgfVxuXG4gIGhhbmRsZUNsaWNrTGlzdCAoZXZlbnQpIHtcbiAgICB0aGlzLm5ld0luZGV4U3VibGlzdCA9IEFycmF5LmZyb20odGhpcy5idXR0b25zKS5pbmRleE9mKGV2ZW50LnRhcmdldClcbiAgICBpZiAodGhpcy5pbmRleFN1Ymxpc3QgIT09IC0xKSB7XG4gICAgICB0aGlzLnN1Ymxpc3RzW3RoaXMuaW5kZXhTdWJsaXN0XS5jbGFzc0xpc3QucmVtb3ZlKE1haW5NZW51LnN0YXRlcy5zdWJNZW51T3BlbilcbiAgICAgIHRoaXMuc3VibGlzdHNbdGhpcy5uZXdJbmRleFN1Ymxpc3RdLmNsYXNzTGlzdC5hZGQoTWFpbk1lbnUuc3RhdGVzLnN1Yk1lbnVPcGVuKVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5zdWJsaXN0c1t0aGlzLm5ld0luZGV4U3VibGlzdF0uY2xhc3NMaXN0LmNvbnRhaW5zKE1haW5NZW51LnN0YXRlcy5zdWJNZW51T3BlbikpIHtcbiAgICAgICAgdGhpcy5zdWJsaXN0c1t0aGlzLm5ld0luZGV4U3VibGlzdF0uY2xhc3NMaXN0LnJlbW92ZShNYWluTWVudS5zdGF0ZXMuc3ViTWVudU9wZW4pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN1Ymxpc3RzW3RoaXMubmV3SW5kZXhTdWJsaXN0XS5jbGFzc0xpc3QuYWRkKE1haW5NZW51LnN0YXRlcy5zdWJNZW51T3BlbilcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYW5kbGVIYW1idXJnZXIgKGV2ZW50KSB7XG4gICAgdGhpcy5saXN0LmNsYXNzTGlzdC50b2dnbGUoTWFpbk1lbnUuc3RhdGVzLm1lbnVPcGVuKVxuICAgIHRoaXMuaGFtYnVyZ2VyVG9wLmNsYXNzTGlzdC50b2dnbGUoTWFpbk1lbnUuc3RhdGVzLmJ1cmdlclRvcE9wZW4pXG4gICAgdGhpcy5oYW1idXJnZXJCb3R0b20uY2xhc3NMaXN0LnRvZ2dsZShNYWluTWVudS5zdGF0ZXMuYnVyZ2VyQm90dG9tT3BlbilcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbW9kdWxlcy9NYWluTWVudS9NYWluTWVudS5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgcHVnID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcHVnLXJ1bnRpbWUvaW5kZXguanNcIik7XG5cbmZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge3ZhciBwdWdfaHRtbCA9IFwiXCIsIHB1Z19taXhpbnMgPSB7fSwgcHVnX2ludGVycDs7dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAoT2JqZWN0LCBsaW5rcywgbG9nbykge3B1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NkaXYgY2xhc3M9XFxcIm1haW4tbWVudV9fdXBwZXJcXFwiXFx1MDAzRVxcdTAwM0NhIGNsYXNzPVxcXCJtYWluLW1lbnVfX2xvZ29cXFwiXFx1MDAzRVxcdTAwM0NpbWdcIiArIChcIiBjbGFzcz1cXFwibWFpbi1tZW51X19pbWFnZWxvZ29cXFwiXCIrcHVnLmF0dHIoXCJzcmNcIiwgbG9nby5pbWcsIGZhbHNlLCB0cnVlKStwdWcuYXR0cihcImhyZWZcIiwgbG9nby5saW5rLCBmYWxzZSwgdHJ1ZSkpICsgXCJcXHUwMDNFXFx1MDAzQ1xcdTAwMkZhXFx1MDAzRVxcdTAwM0NkaXYgY2xhc3M9XFxcIm1haW4tbWVudV9faGFtYnVyZ2VyXFxcIlxcdTAwM0VcXHUwMDNDc3BhbiBjbGFzcz1cXFwibWFpbi1tZW51X19oYW1idXJnZXItdG9wXFxcIlxcdTAwM0VcXHUwMDNDXFx1MDAyRnNwYW5cXHUwMDNFXFx1MDAzQ3NwYW4gY2xhc3M9XFxcIm1haW4tbWVudV9faGFtYnVyZ2VyLWJvdHRvbVxcXCJcXHUwMDNFXFx1MDAzQ1xcdTAwMkZzcGFuXFx1MDAzRVxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVxcdTAwM0N1bCBjbGFzcz1cXFwibWFpbi1tZW51X19saXN0XFxcIlxcdTAwM0VcIjtcbi8vIGl0ZXJhdGUgbGlua3NcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gbGlua3M7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG4gICAgICBmb3IgKHZhciBwdWdfaW5kZXgwID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyBwdWdfaW5kZXgwIDwgJCRsOyBwdWdfaW5kZXgwKyspIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSAkJG9ialtwdWdfaW5kZXgwXTtcbmlmIChPYmplY3Qua2V5cyhlbGVtZW50KS5pbmNsdWRlcygnaHJlZicpKSB7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDbGkgY2xhc3M9XFxcIm1haW4tbWVudV9faXRlbVxcXCJcXHUwMDNFXFx1MDAzQ2FcIiArIChcIiBjbGFzcz1cXFwibWFpbi1tZW51X19saW5rXFxcIlwiK3B1Zy5hdHRyKFwiaHJlZlwiLCBlbGVtZW50LmhyZWYsIGZhbHNlLCB0cnVlKSkgKyBcIlxcdTAwM0VcIiArIChudWxsID09IChwdWdfaW50ZXJwID0gZWxlbWVudC5sYWJlbCkgPyBcIlwiIDogcHVnX2ludGVycCkgKyBcIlxcdTAwM0NcXHUwMDJGYVxcdTAwM0VcXHUwMDNDXFx1MDAyRmxpXFx1MDAzRVwiO1xufVxuZWxzZSB7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDbGkgY2xhc3M9XFxcIm1haW4tbWVudV9faXRlbVxcXCJcXHUwMDNFXFx1MDAzQ2J1dHRvbiBjbGFzcz1cXFwibWFpbi1tZW51X19idXR0b25cXFwiXFx1MDAzRVwiICsgKG51bGwgPT0gKHB1Z19pbnRlcnAgPSBlbGVtZW50LmxhYmVsKSA/IFwiXCIgOiBwdWdfaW50ZXJwKSArIFwiXFx1MDAzQ1xcdTAwMkZidXR0b25cXHUwMDNFXFx1MDAzQ3VsIGNsYXNzPVxcXCJtYWluLW1lbnVfX3N1Ymxpc3RcXFwiXFx1MDAzRVwiO1xuLy8gaXRlcmF0ZSBlbGVtZW50LmxpbmtzXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IGVsZW1lbnQubGlua3M7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG4gICAgICBmb3IgKHZhciBwdWdfaW5kZXgxID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyBwdWdfaW5kZXgxIDwgJCRsOyBwdWdfaW5kZXgxKyspIHtcbiAgICAgICAgdmFyIHN1YmVsZW1lbnQgPSAkJG9ialtwdWdfaW5kZXgxXTtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NsaSBjbGFzcz1cXFwibWFpbi1tZW51X19zdWJpdGVtXFxcIlxcdTAwM0UgXFx1MDAzQ2FcIiArIChcIiBjbGFzcz1cXFwibWFpbi1tZW51X19saW5rIG1haW4tbWVudV9fbGluay0tc3VibGlzdFxcXCJcIitwdWcuYXR0cihcImhyZWZcIiwgc3ViZWxlbWVudC5ocmVmLCBmYWxzZSwgdHJ1ZSkpICsgXCJcXHUwMDNFXCIgKyAobnVsbCA9PSAocHVnX2ludGVycCA9IHN1YmVsZW1lbnQubGFiZWwpID8gXCJcIiA6IHB1Z19pbnRlcnApICsgXCJcXHUwMDNDXFx1MDAyRmFcXHUwMDNFXFx1MDAzQ1xcdTAwMkZsaVxcdTAwM0VcIjtcbiAgICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciBwdWdfaW5kZXgxIGluICQkb2JqKSB7XG4gICAgICAkJGwrKztcbiAgICAgIHZhciBzdWJlbGVtZW50ID0gJCRvYmpbcHVnX2luZGV4MV07XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDbGkgY2xhc3M9XFxcIm1haW4tbWVudV9fc3ViaXRlbVxcXCJcXHUwMDNFIFxcdTAwM0NhXCIgKyAoXCIgY2xhc3M9XFxcIm1haW4tbWVudV9fbGluayBtYWluLW1lbnVfX2xpbmstLXN1Ymxpc3RcXFwiXCIrcHVnLmF0dHIoXCJocmVmXCIsIHN1YmVsZW1lbnQuaHJlZiwgZmFsc2UsIHRydWUpKSArIFwiXFx1MDAzRVwiICsgKG51bGwgPT0gKHB1Z19pbnRlcnAgPSBzdWJlbGVtZW50LmxhYmVsKSA/IFwiXCIgOiBwdWdfaW50ZXJwKSArIFwiXFx1MDAzQ1xcdTAwMkZhXFx1MDAzRVxcdTAwM0NcXHUwMDJGbGlcXHUwMDNFXCI7XG4gICAgfVxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDXFx1MDAyRnVsXFx1MDAzRVxcdTAwM0NcXHUwMDJGbGlcXHUwMDNFXCI7XG59XG4gICAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgcHVnX2luZGV4MCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7XG4gICAgICB2YXIgZWxlbWVudCA9ICQkb2JqW3B1Z19pbmRleDBdO1xuaWYgKE9iamVjdC5rZXlzKGVsZW1lbnQpLmluY2x1ZGVzKCdocmVmJykpIHtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NsaSBjbGFzcz1cXFwibWFpbi1tZW51X19pdGVtXFxcIlxcdTAwM0VcXHUwMDNDYVwiICsgKFwiIGNsYXNzPVxcXCJtYWluLW1lbnVfX2xpbmtcXFwiXCIrcHVnLmF0dHIoXCJocmVmXCIsIGVsZW1lbnQuaHJlZiwgZmFsc2UsIHRydWUpKSArIFwiXFx1MDAzRVwiICsgKG51bGwgPT0gKHB1Z19pbnRlcnAgPSBlbGVtZW50LmxhYmVsKSA/IFwiXCIgOiBwdWdfaW50ZXJwKSArIFwiXFx1MDAzQ1xcdTAwMkZhXFx1MDAzRVxcdTAwM0NcXHUwMDJGbGlcXHUwMDNFXCI7XG59XG5lbHNlIHtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NsaSBjbGFzcz1cXFwibWFpbi1tZW51X19pdGVtXFxcIlxcdTAwM0VcXHUwMDNDYnV0dG9uIGNsYXNzPVxcXCJtYWluLW1lbnVfX2J1dHRvblxcXCJcXHUwMDNFXCIgKyAobnVsbCA9PSAocHVnX2ludGVycCA9IGVsZW1lbnQubGFiZWwpID8gXCJcIiA6IHB1Z19pbnRlcnApICsgXCJcXHUwMDNDXFx1MDAyRmJ1dHRvblxcdTAwM0VcXHUwMDNDdWwgY2xhc3M9XFxcIm1haW4tbWVudV9fc3VibGlzdFxcXCJcXHUwMDNFXCI7XG4vLyBpdGVyYXRlIGVsZW1lbnQubGlua3NcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gZWxlbWVudC5saW5rcztcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcbiAgICAgIGZvciAodmFyIHB1Z19pbmRleDIgPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7IHB1Z19pbmRleDIgPCAkJGw7IHB1Z19pbmRleDIrKykge1xuICAgICAgICB2YXIgc3ViZWxlbWVudCA9ICQkb2JqW3B1Z19pbmRleDJdO1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiXFx1MDAzQ2xpIGNsYXNzPVxcXCJtYWluLW1lbnVfX3N1Yml0ZW1cXFwiXFx1MDAzRSBcXHUwMDNDYVwiICsgKFwiIGNsYXNzPVxcXCJtYWluLW1lbnVfX2xpbmsgbWFpbi1tZW51X19saW5rLS1zdWJsaXN0XFxcIlwiK3B1Zy5hdHRyKFwiaHJlZlwiLCBzdWJlbGVtZW50LmhyZWYsIGZhbHNlLCB0cnVlKSkgKyBcIlxcdTAwM0VcIiArIChudWxsID09IChwdWdfaW50ZXJwID0gc3ViZWxlbWVudC5sYWJlbCkgPyBcIlwiIDogcHVnX2ludGVycCkgKyBcIlxcdTAwM0NcXHUwMDJGYVxcdTAwM0VcXHUwMDNDXFx1MDAyRmxpXFx1MDAzRVwiO1xuICAgICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyIHB1Z19pbmRleDIgaW4gJCRvYmopIHtcbiAgICAgICQkbCsrO1xuICAgICAgdmFyIHN1YmVsZW1lbnQgPSAkJG9ialtwdWdfaW5kZXgyXTtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NsaSBjbGFzcz1cXFwibWFpbi1tZW51X19zdWJpdGVtXFxcIlxcdTAwM0UgXFx1MDAzQ2FcIiArIChcIiBjbGFzcz1cXFwibWFpbi1tZW51X19saW5rIG1haW4tbWVudV9fbGluay0tc3VibGlzdFxcXCJcIitwdWcuYXR0cihcImhyZWZcIiwgc3ViZWxlbWVudC5ocmVmLCBmYWxzZSwgdHJ1ZSkpICsgXCJcXHUwMDNFXCIgKyAobnVsbCA9PSAocHVnX2ludGVycCA9IHN1YmVsZW1lbnQubGFiZWwpID8gXCJcIiA6IHB1Z19pbnRlcnApICsgXCJcXHUwMDNDXFx1MDAyRmFcXHUwMDNFXFx1MDAzQ1xcdTAwMkZsaVxcdTAwM0VcIjtcbiAgICB9XG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NcXHUwMDJGdWxcXHUwMDNFXFx1MDAzQ1xcdTAwMkZsaVxcdTAwM0VcIjtcbn1cbiAgICB9XG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NcXHUwMDJGdWxcXHUwMDNFXCI7fS5jYWxsKHRoaXMsXCJPYmplY3RcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLk9iamVjdDp0eXBlb2YgT2JqZWN0IT09XCJ1bmRlZmluZWRcIj9PYmplY3Q6dW5kZWZpbmVkLFwibGlua3NcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmxpbmtzOnR5cGVvZiBsaW5rcyE9PVwidW5kZWZpbmVkXCI/bGlua3M6dW5kZWZpbmVkLFwibG9nb1wiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgubG9nbzp0eXBlb2YgbG9nbyE9PVwidW5kZWZpbmVkXCI/bG9nbzp1bmRlZmluZWQpKTs7cmV0dXJuIHB1Z19odG1sO307XG5tb2R1bGUuZXhwb3J0cyA9IHRlbXBsYXRlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL21vZHVsZXMvTWFpbk1lbnUvTWFpbk1lbnUucHVnXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIChpZ25vcmVkKSAqL1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGZzIChpZ25vcmVkKVxuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL21vZHVsZXMvTWFpbk1lbnUvTWFpbk1lbnUuc2Nzc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHtcImxvZ29cIjp7XCJpbWdcIjpcImFzc2V0cy9pbWFnZXMvbG9nby1maXR0ZWQucG5nXCIsXCJsaW5rXCI6XCIvXCJ9LFwibGlua3NcIjpbe1wibGFiZWxcIjpcIkhvbWVcIixcImhyZWZcIjpcIi9cIn0se1wibGFiZWxcIjpcIlJlcG9zaXRvcnlcIixcImhyZWZcIjpcImh0dHBzOi8vZ2l0aHViLmNvbS93aWxsaWFtZWdvbWV6L01hY2hpbmUtTGVhcm5pbmctVGVhY2hpbmdcIn0se1wibGFiZWxcIjpcIlByb2plY3RzXCIsXCJsaW5rc1wiOlt7XCJsYWJlbFwiOlwiMjAxOC0xXCIsXCJocmVmXCI6XCIvXCJ9XX1dfVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZGF0YS9NYWluTWVudS5qc29uXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAnLi8uLi9Qb3N0LWNhcmQvUG9zdC1jYXJkLnNjc3MnXG5pbXBvcnQgJy4vUGFnaW5hdG9yLnNjc3MnXG5pbXBvcnQganNvbkNhcmRzIGZyb20gJy4vLi4vLi4vLi4vZGF0YS9DYXJkc01haW4uanNvbidcbmltcG9ydCB0ZW1wbGF0ZUNvbnRhaW5lciBmcm9tICcuL1BhZ2luYXRvci5wdWcnXG5pbXBvcnQgdGVtcGxhdGVDYXJkIGZyb20gJy4vLi4vUG9zdC1jYXJkL1Bvc3QtY2FyZC5wdWcnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhZ2luYXRvciB7XG4gIGNvbnN0cnVjdG9yIChub2RlLCBqc29uUGFnZXMpIHtcbiAgICB0aGlzLm5vZGUgPSBub2RlXG4gICAgdGhpcy5ub2RlLmlubmVySFRNTCA9IHRlbXBsYXRlQ29udGFpbmVyKClcbiAgICB0aGlzLmpzb25QYWdlcyA9IGpzb25QYWdlc1xuICAgIHRoaXMuaW5kZXhQYWdlID0gMFxuICAgIHRoaXMuY2FyZENvbnRhaW5lciA9IHRoaXMubm9kZS5xdWVyeVNlbGVjdG9yKCcucGFnaW5hdG9yX19wb3N0cycpXG4gICAgdGhpcy5maWxsUGFnaW5hdG9yKClcbiAgfVxuXG4gIGZpbGxQYWdpbmF0b3IgKCkge1xuICAgIGpzb25DYXJkcy5mb3JFYWNoKChjYXJkKSA9PiB7XG4gICAgICB0aGlzLmFkZENhcmQoY2FyZClcbiAgICB9KVxuICB9XG5cbiAgYWRkQ2FyZCAoanNvbikge1xuICAgIHZhciBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKClcbiAgICB2YXIgY2FyZCA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcodGVtcGxhdGVDYXJkKGpzb24pLCAndGV4dC9odG1sJykuYm9keS5jaGlsZHJlblswXVxuICAgIHRoaXMuY2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChjYXJkKVxuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9tb2R1bGVzL1BhZ2luYXRvci9QYWdpbmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9tb2R1bGVzL1Bvc3QtY2FyZC9Qb3N0LWNhcmQuc2Nzc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL21vZHVsZXMvUGFnaW5hdG9yL1BhZ2luYXRvci5zY3NzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gW3tcInRpdGxlXCI6XCJDbGFzZSBpbnRyb2R1Y2Npw7NuXCIsXCJkZXNjcmlwdGlvblwiOlwiSW50cm9kdWNjacOzbiBhbCBjdXJzbyB5IGJhc2VzXCIsXCJ1ZGF0ZVwiOlwiMTMtMDItMjAxOFwiLFwiY2RhdGFcIjpcIjA2LTAyLTIwMThcIixcInVybFwiOlwiaHR0cHM6Ly9naXRodWIuY29tL3dpbGxpYW1lZ29tZXovTWFjaGluZS1MZWFybmluZy1UZWFjaGluZy90cmVlL21hc3Rlci9sZXNzb25zLzIwMTgtMS9pbnRyb2R1Y3Rpb25cIn0se1widGl0bGVcIjpcIkNsYXNlIGzDs2dpY2EgZGlmdXNhXCIsXCJkZXNjcmlwdGlvblwiOlwiQ29uY2VwdG9zIGRlIGxhIGzDs2dpY2EgZGlmdXNhLCBzaXN0ZW1hcyBkZSBpbmZlcmVuY2lhXCIsXCJ1ZGF0ZVwiOlwiMjAtMDItMjAxOFwiLFwiY2RhdGFcIjpcIjEzLTAyLTIwMThcIixcInVybFwiOlwiaHR0cHM6Ly9naXRodWIuY29tL3dpbGxpYW1lZ29tZXovTWFjaGluZS1MZWFybmluZy1UZWFjaGluZy9ibG9iL21hc3Rlci9sZXNzb25zLzIwMTgtMS9GdXp6eSUyMExvZ2ljXCJ9XVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZGF0YS9DYXJkc01haW4uanNvblxuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHB1ZyA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3B1Zy1ydW50aW1lL2luZGV4LmpzXCIpO1xuXG5mdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHt2YXIgcHVnX2h0bWwgPSBcIlwiLCBwdWdfbWl4aW5zID0ge30sIHB1Z19pbnRlcnA7cHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiXFx1MDAzQ2gxIGNsYXNzPVxcXCJwYWdpbmF0b3JfX3RpdGxlXFxcIlxcdTAwM0VQb3N0c1xcdTAwM0NcXHUwMDJGaDFcXHUwMDNFXFx1MDAzQ3NlY3Rpb24gY2xhc3M9XFxcInBhZ2luYXRvcl9fcG9zdHNcXFwiXFx1MDAzRVxcdTAwM0NcXHUwMDJGc2VjdGlvblxcdTAwM0VcXHUwMDNDdWwgY2xhc3M9XFxcInBhZ2luYXRvcl9fY29udHJvbFxcXCJcXHUwMDNFXFx1MDAzQ2xpIGNsYXNzPVxcXCJwYWdpbmF0b3JfX2NvbnRyb2wtaXRlbVxcXCJcXHUwMDNFJmxhcXVvO1xcdTAwM0NcXHUwMDJGbGlcXHUwMDNFXFx1MDAzQ2xpIGNsYXNzPVxcXCJwYWdpbmF0b3JfX2NvbnRyb2wtaXRlbVxcXCJcXHUwMDNFMVxcdTAwM0NcXHUwMDJGbGlcXHUwMDNFXFx1MDAzQ2xpIGNsYXNzPVxcXCJwYWdpbmF0b3JfX2NvbnRyb2wtaXRlbVxcXCJcXHUwMDNFJnJhcXVvO1xcdTAwM0NcXHUwMDJGbGlcXHUwMDNFXFx1MDAzQ1xcdTAwMkZ1bFxcdTAwM0VcIjs7cmV0dXJuIHB1Z19odG1sO307XG5tb2R1bGUuZXhwb3J0cyA9IHRlbXBsYXRlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL21vZHVsZXMvUGFnaW5hdG9yL1BhZ2luYXRvci5wdWdcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBwdWcgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wdWctcnVudGltZS9pbmRleC5qc1wiKTtcblxuZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7dmFyIHB1Z19odG1sID0gXCJcIiwgcHVnX21peGlucyA9IHt9LCBwdWdfaW50ZXJwOzt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChkZXNjcmlwdGlvbiwgdGl0bGUsIHVkYXRlLCB1cmwpIHtwdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDYXJ0aWNsZSBjbGFzcz1cXFwicG9zdC1jYXJkXFxcIlxcdTAwM0VcXHUwMDNDYVwiICsgKFwiIGNsYXNzPVxcXCJwb3N0LWNhcmRfX2Fjb250YWluZXJcXFwiXCIrcHVnLmF0dHIoXCJocmVmXCIsIHVybCwgZmFsc2UsIHRydWUpKSArIFwiXFx1MDAzRVxcdTAwM0NoMSBjbGFzcz1cXFwicG9zdC1jYXJkX190aXRsZVxcXCJcXHUwMDNFXCIgKyAobnVsbCA9PSAocHVnX2ludGVycCA9IHRpdGxlKSA/IFwiXCIgOiBwdWdfaW50ZXJwKSArIFwiXFx1MDAzQ1xcdTAwMkZoMVxcdTAwM0VcXHUwMDNDcCBjbGFzcz1cXFwicG9zdC1jYXJkX19kZXNjcmlwdGlvblxcXCJcXHUwMDNFXCIgKyAobnVsbCA9PSAocHVnX2ludGVycCA9IGRlc2NyaXB0aW9uKSA/IFwiXCIgOiBwdWdfaW50ZXJwKSArIFwiXFx1MDAzQ1xcdTAwMkZwXFx1MDAzRVxcdTAwM0NkaXYgY2xhc3M9XFxcInBvc3QtY2FyZF9fZGF0ZVxcXCJcXHUwMDNFXFx1MDAzQ3NwYW4gY2xhc3M9XFxcInBvc3QtY2FyZF9fZGF0ZS1jbGFiZWxcXFwiXFx1MDAzRUZlY2hhIGRlIGNyZWFjacOzbjpcXHUwMDNDXFx1MDAyRnNwYW5cXHUwMDNFXFx1MDAzQ3NwYW4gY2xhc3M9XFxcInBvc3QtY2FyZF9fZGF0ZS1jcmVhdGVkXFxcIlxcdTAwM0VcIiArIChudWxsID09IChwdWdfaW50ZXJwID0gdWRhdGUpID8gXCJcIiA6IHB1Z19pbnRlcnApICsgXCJcXHUwMDNDXFx1MDAyRnNwYW5cXHUwMDNFXFx1MDAzQ3NwYW4gY2xhc3M9XFxcInBvc3QtY2FyZF9fZGF0ZS11bGFiZWxcXFwiXFx1MDAzRUZlY2hhIGRlIGFjdHVhbGl6YWNpw7NuOlxcdTAwM0NcXHUwMDJGc3BhblxcdTAwM0VcXHUwMDNDc3BhbiBjbGFzcz1cXFwicG9zdC1jYXJkX19kYXRlLXVwZGF0ZWRcXFwiXFx1MDAzRVwiICsgKG51bGwgPT0gKHB1Z19pbnRlcnAgPSB1ZGF0ZSkgPyBcIlwiIDogcHVnX2ludGVycCkgKyBcIlxcdTAwM0NcXHUwMDJGc3BhblxcdTAwM0VcXHUwMDNDXFx1MDAyRmRpdlxcdTAwM0VcXHUwMDNDXFx1MDAyRmFcXHUwMDNFXFx1MDAzQ1xcdTAwMkZhcnRpY2xlXFx1MDAzRVwiO30uY2FsbCh0aGlzLFwiZGVzY3JpcHRpb25cIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmRlc2NyaXB0aW9uOnR5cGVvZiBkZXNjcmlwdGlvbiE9PVwidW5kZWZpbmVkXCI/ZGVzY3JpcHRpb246dW5kZWZpbmVkLFwidGl0bGVcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnRpdGxlOnR5cGVvZiB0aXRsZSE9PVwidW5kZWZpbmVkXCI/dGl0bGU6dW5kZWZpbmVkLFwidWRhdGVcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnVkYXRlOnR5cGVvZiB1ZGF0ZSE9PVwidW5kZWZpbmVkXCI/dWRhdGU6dW5kZWZpbmVkLFwidXJsXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC51cmw6dHlwZW9mIHVybCE9PVwidW5kZWZpbmVkXCI/dXJsOnVuZGVmaW5lZCkpOztyZXR1cm4gcHVnX2h0bWw7fTtcbm1vZHVsZS5leHBvcnRzID0gdGVtcGxhdGU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbW9kdWxlcy9Qb3N0LWNhcmQvUG9zdC1jYXJkLnB1Z1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==