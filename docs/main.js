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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_MainMenu_MainMenu__ = __webpack_require__(1);


/* eslint-disable */
new __WEBPACK_IMPORTED_MODULE_0__modules_MainMenu_MainMenu__["a" /* default */](document.querySelector('.js-MainMenu-1'))

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MainMenu_pug__ = __webpack_require__(2);
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(3);

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
/* 3 */
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

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNThlY2U2YTU0NjA3NWIzOTMxNWQiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZHVsZXMvTWFpbk1lbnUvTWFpbk1lbnUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZHVsZXMvTWFpbk1lbnUvTWFpbk1lbnUucHVnIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wdWctcnVudGltZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vZnMgKGlnbm9yZWQpIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL01haW5NZW51L01haW5NZW51LnNjc3MiLCJ3ZWJwYWNrOi8vLy4vZGF0YS9NYWluTWVudS5qc29uIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQzdEQTs7QUFFQTtBQUNBLHlIOzs7Ozs7Ozs7Ozs7O0FDSEE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVB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O0FBQzdEO0FBQ0EsK0JBQStCLEVBQUU7QUFDakMsOEJBQThCLEVBQUU7QUFDaEMsNkJBQTZCLEVBQUU7QUFDL0IsNkJBQTZCLEVBQUU7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDN1BBLGU7Ozs7OztBQ0FBLHlDOzs7Ozs7QUNBQSxrQkFBa0IsUUFBUSxpREFBaUQsV0FBVywwQkFBMEIsRUFBRSx5RkFBeUYsRUFBRSw2QkFBNkIsNEJBQTRCLEVBQUUsRSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNThlY2U2YTU0NjA3NWIzOTMxNWQiLCJpbXBvcnQgTWFpbk1lbnUgZnJvbSAnLi9tb2R1bGVzL01haW5NZW51L01haW5NZW51J1xuXG4vKiBlc2xpbnQtZGlzYWJsZSAqL1xubmV3IE1haW5NZW51KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1NYWluTWVudS0xJykpXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbWFpbi5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi9NYWluTWVudS5wdWcnXG5pbXBvcnQgJy4vTWFpbk1lbnUuc2NzcydcbmltcG9ydCBqc29uRGF0YSBmcm9tICcuLy4uLy4uLy4uL2RhdGEvTWFpbk1lbnUuanNvbidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbk1lbnUge1xuICBjb25zdHJ1Y3RvciAobm9kZSkge1xuICAgIHRoaXMubm9kZSA9IG5vZGVcbiAgICB0aGlzLmluZGV4U3VibGlzdCA9IC0xXG4gICAgdGhpcy5ub2RlLmlubmVySFRNTCA9IHRlbXBsYXRlKGpzb25EYXRhKVxuICAgIHRoaXMuZ2V0Tm9kZXMoKVxuICAgIHRoaXMuc2V0RXZlbnRzKClcbiAgfVxuXG4gIHN0YXRpYyBnZXQgc3RhdGVzICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3ViTWVudU9wZW46ICdtYWluLW1lbnVfX3N1Ymxpc3QtLW9wZW4nLFxuICAgICAgbWVudU9wZW46ICdtYWluLW1lbnVfX2xpc3QtLW9wZW4nLFxuICAgICAgYnVyZ2VyVG9wT3BlbjogJ21haW4tbWVudV9faGFtYnVyZ2VyLXRvcC0tb3BlbicsXG4gICAgICBidXJnZXJCb3R0b21PcGVuOiAnbWFpbi1tZW51X19oYW1idXJnZXItYm90dG9tLS1vcGVuJ1xuICAgIH1cbiAgfVxuXG4gIGdldE5vZGVzICgpIHtcbiAgICB0aGlzLmxpc3QgPSB0aGlzLm5vZGUucXVlcnlTZWxlY3RvcignLm1haW4tbWVudV9fbGlzdCcpXG4gICAgdGhpcy5idXR0b25zID0gdGhpcy5ub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoJy5tYWluLW1lbnVfX2J1dHRvbicpXG4gICAgdGhpcy5oYW1idXJnZXIgPSB0aGlzLm5vZGUucXVlcnlTZWxlY3RvcignLm1haW4tbWVudV9faGFtYnVyZ2VyJylcbiAgICB0aGlzLmhhbWJ1cmdlclRvcCA9IHRoaXMubm9kZS5xdWVyeVNlbGVjdG9yKCcubWFpbi1tZW51X19oYW1idXJnZXItdG9wJylcbiAgICB0aGlzLmhhbWJ1cmdlckJvdHRvbSA9IHRoaXMubm9kZS5xdWVyeVNlbGVjdG9yKCcubWFpbi1tZW51X19oYW1idXJnZXItYm90dG9tJylcbiAgICB0aGlzLnN1Ymxpc3RzID0gdGhpcy5ub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoJy5tYWluLW1lbnVfX3N1Ymxpc3QnKVxuICB9XG5cbiAgc2V0RXZlbnRzICgpIHtcbiAgICB0aGlzLmxpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUNsaWNrTGlzdC5iaW5kKHRoaXMpKVxuICAgIHRoaXMuaGFtYnVyZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVIYW1idXJnZXIuYmluZCh0aGlzKSlcbiAgfVxuXG4gIGhhbmRsZUNsaWNrTGlzdCAoZXZlbnQpIHtcbiAgICB0aGlzLm5ld0luZGV4U3VibGlzdCA9IEFycmF5LmZyb20odGhpcy5idXR0b25zKS5pbmRleE9mKGV2ZW50LnRhcmdldClcbiAgICBpZiAodGhpcy5pbmRleFN1Ymxpc3QgIT09IC0xKSB7XG4gICAgICB0aGlzLnN1Ymxpc3RzW3RoaXMuaW5kZXhTdWJsaXN0XS5jbGFzc0xpc3QucmVtb3ZlKE1haW5NZW51LnN0YXRlcy5zdWJNZW51T3BlbilcbiAgICAgIHRoaXMuc3VibGlzdHNbdGhpcy5uZXdJbmRleFN1Ymxpc3RdLmNsYXNzTGlzdC5hZGQoTWFpbk1lbnUuc3RhdGVzLnN1Yk1lbnVPcGVuKVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5zdWJsaXN0c1t0aGlzLm5ld0luZGV4U3VibGlzdF0uY2xhc3NMaXN0LmNvbnRhaW5zKE1haW5NZW51LnN0YXRlcy5zdWJNZW51T3BlbikpIHtcbiAgICAgICAgdGhpcy5zdWJsaXN0c1t0aGlzLm5ld0luZGV4U3VibGlzdF0uY2xhc3NMaXN0LnJlbW92ZShNYWluTWVudS5zdGF0ZXMuc3ViTWVudU9wZW4pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN1Ymxpc3RzW3RoaXMubmV3SW5kZXhTdWJsaXN0XS5jbGFzc0xpc3QuYWRkKE1haW5NZW51LnN0YXRlcy5zdWJNZW51T3BlbilcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYW5kbGVIYW1idXJnZXIgKGV2ZW50KSB7XG4gICAgdGhpcy5saXN0LmNsYXNzTGlzdC50b2dnbGUoTWFpbk1lbnUuc3RhdGVzLm1lbnVPcGVuKVxuICAgIHRoaXMuaGFtYnVyZ2VyVG9wLmNsYXNzTGlzdC50b2dnbGUoTWFpbk1lbnUuc3RhdGVzLmJ1cmdlclRvcE9wZW4pXG4gICAgdGhpcy5oYW1idXJnZXJCb3R0b20uY2xhc3NMaXN0LnRvZ2dsZShNYWluTWVudS5zdGF0ZXMuYnVyZ2VyQm90dG9tT3BlbilcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbW9kdWxlcy9NYWluTWVudS9NYWluTWVudS5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgcHVnID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcHVnLXJ1bnRpbWUvaW5kZXguanNcIik7XG5cbmZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge3ZhciBwdWdfaHRtbCA9IFwiXCIsIHB1Z19taXhpbnMgPSB7fSwgcHVnX2ludGVycDs7dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAoT2JqZWN0LCBsaW5rcywgbG9nbykge3B1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NkaXYgY2xhc3M9XFxcIm1haW4tbWVudV9fdXBwZXJcXFwiXFx1MDAzRVxcdTAwM0NhIGNsYXNzPVxcXCJtYWluLW1lbnVfX2xvZ29cXFwiXFx1MDAzRVxcdTAwM0NpbWdcIiArIChcIiBjbGFzcz1cXFwibWFpbi1tZW51X19pbWFnZWxvZ29cXFwiXCIrcHVnLmF0dHIoXCJzcmNcIiwgbG9nby5pbWcsIGZhbHNlLCB0cnVlKStwdWcuYXR0cihcImhyZWZcIiwgbG9nby5saW5rLCBmYWxzZSwgdHJ1ZSkpICsgXCJcXHUwMDNFXFx1MDAzQ1xcdTAwMkZhXFx1MDAzRVxcdTAwM0NkaXYgY2xhc3M9XFxcIm1haW4tbWVudV9faGFtYnVyZ2VyXFxcIlxcdTAwM0VcXHUwMDNDc3BhbiBjbGFzcz1cXFwibWFpbi1tZW51X19oYW1idXJnZXItdG9wXFxcIlxcdTAwM0VcXHUwMDNDXFx1MDAyRnNwYW5cXHUwMDNFXFx1MDAzQ3NwYW4gY2xhc3M9XFxcIm1haW4tbWVudV9faGFtYnVyZ2VyLWJvdHRvbVxcXCJcXHUwMDNFXFx1MDAzQ1xcdTAwMkZzcGFuXFx1MDAzRVxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVxcdTAwM0N1bCBjbGFzcz1cXFwibWFpbi1tZW51X19saXN0XFxcIlxcdTAwM0VcIjtcbi8vIGl0ZXJhdGUgbGlua3NcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gbGlua3M7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG4gICAgICBmb3IgKHZhciBwdWdfaW5kZXgwID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyBwdWdfaW5kZXgwIDwgJCRsOyBwdWdfaW5kZXgwKyspIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSAkJG9ialtwdWdfaW5kZXgwXTtcbmlmIChPYmplY3Qua2V5cyhlbGVtZW50KS5pbmNsdWRlcygnaHJlZicpKSB7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDbGkgY2xhc3M9XFxcIm1haW4tbWVudV9faXRlbVxcXCJcXHUwMDNFXFx1MDAzQ2FcIiArIChcIiBjbGFzcz1cXFwibWFpbi1tZW51X19saW5rXFxcIlwiK3B1Zy5hdHRyKFwiaHJlZlwiLCBlbGVtZW50LmhyZWYsIGZhbHNlLCB0cnVlKSkgKyBcIlxcdTAwM0VcIiArIChudWxsID09IChwdWdfaW50ZXJwID0gZWxlbWVudC5sYWJlbCkgPyBcIlwiIDogcHVnX2ludGVycCkgKyBcIlxcdTAwM0NcXHUwMDJGYVxcdTAwM0VcXHUwMDNDXFx1MDAyRmxpXFx1MDAzRVwiO1xufVxuZWxzZSB7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDbGkgY2xhc3M9XFxcIm1haW4tbWVudV9faXRlbVxcXCJcXHUwMDNFXFx1MDAzQ2J1dHRvbiBjbGFzcz1cXFwibWFpbi1tZW51X19idXR0b25cXFwiXFx1MDAzRVwiICsgKG51bGwgPT0gKHB1Z19pbnRlcnAgPSBlbGVtZW50LmxhYmVsKSA/IFwiXCIgOiBwdWdfaW50ZXJwKSArIFwiXFx1MDAzQ1xcdTAwMkZidXR0b25cXHUwMDNFXFx1MDAzQ3VsIGNsYXNzPVxcXCJtYWluLW1lbnVfX3N1Ymxpc3RcXFwiXFx1MDAzRVwiO1xuLy8gaXRlcmF0ZSBlbGVtZW50LmxpbmtzXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IGVsZW1lbnQubGlua3M7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG4gICAgICBmb3IgKHZhciBwdWdfaW5kZXgxID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyBwdWdfaW5kZXgxIDwgJCRsOyBwdWdfaW5kZXgxKyspIHtcbiAgICAgICAgdmFyIHN1YmVsZW1lbnQgPSAkJG9ialtwdWdfaW5kZXgxXTtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NsaSBjbGFzcz1cXFwibWFpbi1tZW51X19zdWJpdGVtXFxcIlxcdTAwM0UgXFx1MDAzQ2FcIiArIChcIiBjbGFzcz1cXFwibWFpbi1tZW51X19saW5rIG1haW4tbWVudV9fbGluay0tc3VibGlzdFxcXCJcIitwdWcuYXR0cihcImhyZWZcIiwgc3ViZWxlbWVudC5ocmVmLCBmYWxzZSwgdHJ1ZSkpICsgXCJcXHUwMDNFXCIgKyAobnVsbCA9PSAocHVnX2ludGVycCA9IHN1YmVsZW1lbnQubGFiZWwpID8gXCJcIiA6IHB1Z19pbnRlcnApICsgXCJcXHUwMDNDXFx1MDAyRmFcXHUwMDNFXFx1MDAzQ1xcdTAwMkZsaVxcdTAwM0VcIjtcbiAgICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciBwdWdfaW5kZXgxIGluICQkb2JqKSB7XG4gICAgICAkJGwrKztcbiAgICAgIHZhciBzdWJlbGVtZW50ID0gJCRvYmpbcHVnX2luZGV4MV07XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDbGkgY2xhc3M9XFxcIm1haW4tbWVudV9fc3ViaXRlbVxcXCJcXHUwMDNFIFxcdTAwM0NhXCIgKyAoXCIgY2xhc3M9XFxcIm1haW4tbWVudV9fbGluayBtYWluLW1lbnVfX2xpbmstLXN1Ymxpc3RcXFwiXCIrcHVnLmF0dHIoXCJocmVmXCIsIHN1YmVsZW1lbnQuaHJlZiwgZmFsc2UsIHRydWUpKSArIFwiXFx1MDAzRVwiICsgKG51bGwgPT0gKHB1Z19pbnRlcnAgPSBzdWJlbGVtZW50LmxhYmVsKSA/IFwiXCIgOiBwdWdfaW50ZXJwKSArIFwiXFx1MDAzQ1xcdTAwMkZhXFx1MDAzRVxcdTAwM0NcXHUwMDJGbGlcXHUwMDNFXCI7XG4gICAgfVxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDXFx1MDAyRnVsXFx1MDAzRVxcdTAwM0NcXHUwMDJGbGlcXHUwMDNFXCI7XG59XG4gICAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgcHVnX2luZGV4MCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7XG4gICAgICB2YXIgZWxlbWVudCA9ICQkb2JqW3B1Z19pbmRleDBdO1xuaWYgKE9iamVjdC5rZXlzKGVsZW1lbnQpLmluY2x1ZGVzKCdocmVmJykpIHtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NsaSBjbGFzcz1cXFwibWFpbi1tZW51X19pdGVtXFxcIlxcdTAwM0VcXHUwMDNDYVwiICsgKFwiIGNsYXNzPVxcXCJtYWluLW1lbnVfX2xpbmtcXFwiXCIrcHVnLmF0dHIoXCJocmVmXCIsIGVsZW1lbnQuaHJlZiwgZmFsc2UsIHRydWUpKSArIFwiXFx1MDAzRVwiICsgKG51bGwgPT0gKHB1Z19pbnRlcnAgPSBlbGVtZW50LmxhYmVsKSA/IFwiXCIgOiBwdWdfaW50ZXJwKSArIFwiXFx1MDAzQ1xcdTAwMkZhXFx1MDAzRVxcdTAwM0NcXHUwMDJGbGlcXHUwMDNFXCI7XG59XG5lbHNlIHtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NsaSBjbGFzcz1cXFwibWFpbi1tZW51X19pdGVtXFxcIlxcdTAwM0VcXHUwMDNDYnV0dG9uIGNsYXNzPVxcXCJtYWluLW1lbnVfX2J1dHRvblxcXCJcXHUwMDNFXCIgKyAobnVsbCA9PSAocHVnX2ludGVycCA9IGVsZW1lbnQubGFiZWwpID8gXCJcIiA6IHB1Z19pbnRlcnApICsgXCJcXHUwMDNDXFx1MDAyRmJ1dHRvblxcdTAwM0VcXHUwMDNDdWwgY2xhc3M9XFxcIm1haW4tbWVudV9fc3VibGlzdFxcXCJcXHUwMDNFXCI7XG4vLyBpdGVyYXRlIGVsZW1lbnQubGlua3NcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gZWxlbWVudC5saW5rcztcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcbiAgICAgIGZvciAodmFyIHB1Z19pbmRleDIgPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7IHB1Z19pbmRleDIgPCAkJGw7IHB1Z19pbmRleDIrKykge1xuICAgICAgICB2YXIgc3ViZWxlbWVudCA9ICQkb2JqW3B1Z19pbmRleDJdO1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiXFx1MDAzQ2xpIGNsYXNzPVxcXCJtYWluLW1lbnVfX3N1Yml0ZW1cXFwiXFx1MDAzRSBcXHUwMDNDYVwiICsgKFwiIGNsYXNzPVxcXCJtYWluLW1lbnVfX2xpbmsgbWFpbi1tZW51X19saW5rLS1zdWJsaXN0XFxcIlwiK3B1Zy5hdHRyKFwiaHJlZlwiLCBzdWJlbGVtZW50LmhyZWYsIGZhbHNlLCB0cnVlKSkgKyBcIlxcdTAwM0VcIiArIChudWxsID09IChwdWdfaW50ZXJwID0gc3ViZWxlbWVudC5sYWJlbCkgPyBcIlwiIDogcHVnX2ludGVycCkgKyBcIlxcdTAwM0NcXHUwMDJGYVxcdTAwM0VcXHUwMDNDXFx1MDAyRmxpXFx1MDAzRVwiO1xuICAgICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyIHB1Z19pbmRleDIgaW4gJCRvYmopIHtcbiAgICAgICQkbCsrO1xuICAgICAgdmFyIHN1YmVsZW1lbnQgPSAkJG9ialtwdWdfaW5kZXgyXTtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NsaSBjbGFzcz1cXFwibWFpbi1tZW51X19zdWJpdGVtXFxcIlxcdTAwM0UgXFx1MDAzQ2FcIiArIChcIiBjbGFzcz1cXFwibWFpbi1tZW51X19saW5rIG1haW4tbWVudV9fbGluay0tc3VibGlzdFxcXCJcIitwdWcuYXR0cihcImhyZWZcIiwgc3ViZWxlbWVudC5ocmVmLCBmYWxzZSwgdHJ1ZSkpICsgXCJcXHUwMDNFXCIgKyAobnVsbCA9PSAocHVnX2ludGVycCA9IHN1YmVsZW1lbnQubGFiZWwpID8gXCJcIiA6IHB1Z19pbnRlcnApICsgXCJcXHUwMDNDXFx1MDAyRmFcXHUwMDNFXFx1MDAzQ1xcdTAwMkZsaVxcdTAwM0VcIjtcbiAgICB9XG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NcXHUwMDJGdWxcXHUwMDNFXFx1MDAzQ1xcdTAwMkZsaVxcdTAwM0VcIjtcbn1cbiAgICB9XG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NcXHUwMDJGdWxcXHUwMDNFXCI7fS5jYWxsKHRoaXMsXCJPYmplY3RcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLk9iamVjdDp0eXBlb2YgT2JqZWN0IT09XCJ1bmRlZmluZWRcIj9PYmplY3Q6dW5kZWZpbmVkLFwibGlua3NcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmxpbmtzOnR5cGVvZiBsaW5rcyE9PVwidW5kZWZpbmVkXCI/bGlua3M6dW5kZWZpbmVkLFwibG9nb1wiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgubG9nbzp0eXBlb2YgbG9nbyE9PVwidW5kZWZpbmVkXCI/bG9nbzp1bmRlZmluZWQpKTs7cmV0dXJuIHB1Z19odG1sO307XG5tb2R1bGUuZXhwb3J0cyA9IHRlbXBsYXRlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL21vZHVsZXMvTWFpbk1lbnUvTWFpbk1lbnUucHVnXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIHB1Z19oYXNfb3duX3Byb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBNZXJnZSB0d28gYXR0cmlidXRlIG9iamVjdHMgZ2l2aW5nIHByZWNlZGVuY2VcbiAqIHRvIHZhbHVlcyBpbiBvYmplY3QgYGJgLiBDbGFzc2VzIGFyZSBzcGVjaWFsLWNhc2VkXG4gKiBhbGxvd2luZyBmb3IgYXJyYXlzIGFuZCBtZXJnaW5nL2pvaW5pbmcgYXBwcm9wcmlhdGVseVxuICogcmVzdWx0aW5nIGluIGEgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhXG4gKiBAcGFyYW0ge09iamVjdH0gYlxuICogQHJldHVybiB7T2JqZWN0fSBhXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLm1lcmdlID0gcHVnX21lcmdlO1xuZnVuY3Rpb24gcHVnX21lcmdlKGEsIGIpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICB2YXIgYXR0cnMgPSBhWzBdO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgICAgYXR0cnMgPSBwdWdfbWVyZ2UoYXR0cnMsIGFbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gYXR0cnM7XG4gIH1cblxuICBmb3IgKHZhciBrZXkgaW4gYikge1xuICAgIGlmIChrZXkgPT09ICdjbGFzcycpIHtcbiAgICAgIHZhciB2YWxBID0gYVtrZXldIHx8IFtdO1xuICAgICAgYVtrZXldID0gKEFycmF5LmlzQXJyYXkodmFsQSkgPyB2YWxBIDogW3ZhbEFdKS5jb25jYXQoYltrZXldIHx8IFtdKTtcbiAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ3N0eWxlJykge1xuICAgICAgdmFyIHZhbEEgPSBwdWdfc3R5bGUoYVtrZXldKTtcbiAgICAgIHZhciB2YWxCID0gcHVnX3N0eWxlKGJba2V5XSk7XG4gICAgICBhW2tleV0gPSB2YWxBICsgdmFsQjtcbiAgICB9IGVsc2Uge1xuICAgICAgYVtrZXldID0gYltrZXldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhO1xufTtcblxuLyoqXG4gKiBQcm9jZXNzIGFycmF5LCBvYmplY3QsIG9yIHN0cmluZyBhcyBhIHN0cmluZyBvZiBjbGFzc2VzIGRlbGltaXRlZCBieSBhIHNwYWNlLlxuICpcbiAqIElmIGB2YWxgIGlzIGFuIGFycmF5LCBhbGwgbWVtYmVycyBvZiBpdCBhbmQgaXRzIHN1YmFycmF5cyBhcmUgY291bnRlZCBhc1xuICogY2xhc3Nlcy4gSWYgYGVzY2FwaW5nYCBpcyBhbiBhcnJheSwgdGhlbiB3aGV0aGVyIG9yIG5vdCB0aGUgaXRlbSBpbiBgdmFsYCBpc1xuICogZXNjYXBlZCBkZXBlbmRzIG9uIHRoZSBjb3JyZXNwb25kaW5nIGl0ZW0gaW4gYGVzY2FwaW5nYC4gSWYgYGVzY2FwaW5nYCBpc1xuICogbm90IGFuIGFycmF5LCBubyBlc2NhcGluZyBpcyBkb25lLlxuICpcbiAqIElmIGB2YWxgIGlzIGFuIG9iamVjdCwgYWxsIHRoZSBrZXlzIHdob3NlIHZhbHVlIGlzIHRydXRoeSBhcmUgY291bnRlZCBhc1xuICogY2xhc3Nlcy4gTm8gZXNjYXBpbmcgaXMgZG9uZS5cbiAqXG4gKiBJZiBgdmFsYCBpcyBhIHN0cmluZywgaXQgaXMgY291bnRlZCBhcyBhIGNsYXNzLiBObyBlc2NhcGluZyBpcyBkb25lLlxuICpcbiAqIEBwYXJhbSB7KEFycmF5LjxzdHJpbmc+fE9iamVjdC48c3RyaW5nLCBib29sZWFuPnxzdHJpbmcpfSB2YWxcbiAqIEBwYXJhbSB7P0FycmF5LjxzdHJpbmc+fSBlc2NhcGluZ1xuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmNsYXNzZXMgPSBwdWdfY2xhc3NlcztcbmZ1bmN0aW9uIHB1Z19jbGFzc2VzX2FycmF5KHZhbCwgZXNjYXBpbmcpIHtcbiAgdmFyIGNsYXNzU3RyaW5nID0gJycsIGNsYXNzTmFtZSwgcGFkZGluZyA9ICcnLCBlc2NhcGVFbmFibGVkID0gQXJyYXkuaXNBcnJheShlc2NhcGluZyk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsLmxlbmd0aDsgaSsrKSB7XG4gICAgY2xhc3NOYW1lID0gcHVnX2NsYXNzZXModmFsW2ldKTtcbiAgICBpZiAoIWNsYXNzTmFtZSkgY29udGludWU7XG4gICAgZXNjYXBlRW5hYmxlZCAmJiBlc2NhcGluZ1tpXSAmJiAoY2xhc3NOYW1lID0gcHVnX2VzY2FwZShjbGFzc05hbWUpKTtcbiAgICBjbGFzc1N0cmluZyA9IGNsYXNzU3RyaW5nICsgcGFkZGluZyArIGNsYXNzTmFtZTtcbiAgICBwYWRkaW5nID0gJyAnO1xuICB9XG4gIHJldHVybiBjbGFzc1N0cmluZztcbn1cbmZ1bmN0aW9uIHB1Z19jbGFzc2VzX29iamVjdCh2YWwpIHtcbiAgdmFyIGNsYXNzU3RyaW5nID0gJycsIHBhZGRpbmcgPSAnJztcbiAgZm9yICh2YXIga2V5IGluIHZhbCkge1xuICAgIGlmIChrZXkgJiYgdmFsW2tleV0gJiYgcHVnX2hhc19vd25fcHJvcGVydHkuY2FsbCh2YWwsIGtleSkpIHtcbiAgICAgIGNsYXNzU3RyaW5nID0gY2xhc3NTdHJpbmcgKyBwYWRkaW5nICsga2V5O1xuICAgICAgcGFkZGluZyA9ICcgJztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNsYXNzU3RyaW5nO1xufVxuZnVuY3Rpb24gcHVnX2NsYXNzZXModmFsLCBlc2NhcGluZykge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgcmV0dXJuIHB1Z19jbGFzc2VzX2FycmF5KHZhbCwgZXNjYXBpbmcpO1xuICB9IGVsc2UgaWYgKHZhbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBwdWdfY2xhc3Nlc19vYmplY3QodmFsKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdmFsIHx8ICcnO1xuICB9XG59XG5cbi8qKlxuICogQ29udmVydCBvYmplY3Qgb3Igc3RyaW5nIHRvIGEgc3RyaW5nIG9mIENTUyBzdHlsZXMgZGVsaW1pdGVkIGJ5IGEgc2VtaWNvbG9uLlxuICpcbiAqIEBwYXJhbSB7KE9iamVjdC48c3RyaW5nLCBzdHJpbmc+fHN0cmluZyl9IHZhbFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5cbmV4cG9ydHMuc3R5bGUgPSBwdWdfc3R5bGU7XG5mdW5jdGlvbiBwdWdfc3R5bGUodmFsKSB7XG4gIGlmICghdmFsKSByZXR1cm4gJyc7XG4gIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgIHZhciBvdXQgPSAnJztcbiAgICBmb3IgKHZhciBzdHlsZSBpbiB2YWwpIHtcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICBpZiAocHVnX2hhc19vd25fcHJvcGVydHkuY2FsbCh2YWwsIHN0eWxlKSkge1xuICAgICAgICBvdXQgPSBvdXQgKyBzdHlsZSArICc6JyArIHZhbFtzdHlsZV0gKyAnOyc7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvdXQ7XG4gIH0gZWxzZSB7XG4gICAgdmFsICs9ICcnO1xuICAgIGlmICh2YWxbdmFsLmxlbmd0aCAtIDFdICE9PSAnOycpIFxuICAgICAgcmV0dXJuIHZhbCArICc7JztcbiAgICByZXR1cm4gdmFsO1xuICB9XG59O1xuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gYXR0cmlidXRlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWxcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZXNjYXBlZFxuICogQHBhcmFtIHtCb29sZWFufSB0ZXJzZVxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmF0dHIgPSBwdWdfYXR0cjtcbmZ1bmN0aW9uIHB1Z19hdHRyKGtleSwgdmFsLCBlc2NhcGVkLCB0ZXJzZSkge1xuICBpZiAodmFsID09PSBmYWxzZSB8fCB2YWwgPT0gbnVsbCB8fCAhdmFsICYmIChrZXkgPT09ICdjbGFzcycgfHwga2V5ID09PSAnc3R5bGUnKSkge1xuICAgIHJldHVybiAnJztcbiAgfVxuICBpZiAodmFsID09PSB0cnVlKSB7XG4gICAgcmV0dXJuICcgJyArICh0ZXJzZSA/IGtleSA6IGtleSArICc9XCInICsga2V5ICsgJ1wiJyk7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWwudG9KU09OID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdmFsID0gdmFsLnRvSlNPTigpO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsICE9PSAnc3RyaW5nJykge1xuICAgIHZhbCA9IEpTT04uc3RyaW5naWZ5KHZhbCk7XG4gICAgaWYgKCFlc2NhcGVkICYmIHZhbC5pbmRleE9mKCdcIicpICE9PSAtMSkge1xuICAgICAgcmV0dXJuICcgJyArIGtleSArICc9XFwnJyArIHZhbC5yZXBsYWNlKC8nL2csICcmIzM5OycpICsgJ1xcJyc7XG4gICAgfVxuICB9XG4gIGlmIChlc2NhcGVkKSB2YWwgPSBwdWdfZXNjYXBlKHZhbCk7XG4gIHJldHVybiAnICcgKyBrZXkgKyAnPVwiJyArIHZhbCArICdcIic7XG59O1xuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gYXR0cmlidXRlcyBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHtPYmplY3R9IHRlcnNlIHdoZXRoZXIgdG8gdXNlIEhUTUw1IHRlcnNlIGJvb2xlYW4gYXR0cmlidXRlc1xuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmF0dHJzID0gcHVnX2F0dHJzO1xuZnVuY3Rpb24gcHVnX2F0dHJzKG9iaiwgdGVyc2Upe1xuICB2YXIgYXR0cnMgPSAnJztcblxuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKHB1Z19oYXNfb3duX3Byb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICB2YXIgdmFsID0gb2JqW2tleV07XG5cbiAgICAgIGlmICgnY2xhc3MnID09PSBrZXkpIHtcbiAgICAgICAgdmFsID0gcHVnX2NsYXNzZXModmFsKTtcbiAgICAgICAgYXR0cnMgPSBwdWdfYXR0cihrZXksIHZhbCwgZmFsc2UsIHRlcnNlKSArIGF0dHJzO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICgnc3R5bGUnID09PSBrZXkpIHtcbiAgICAgICAgdmFsID0gcHVnX3N0eWxlKHZhbCk7XG4gICAgICB9XG4gICAgICBhdHRycyArPSBwdWdfYXR0cihrZXksIHZhbCwgZmFsc2UsIHRlcnNlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYXR0cnM7XG59O1xuXG4vKipcbiAqIEVzY2FwZSB0aGUgZ2l2ZW4gc3RyaW5nIG9mIGBodG1sYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaHRtbFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxudmFyIHB1Z19tYXRjaF9odG1sID0gL1tcIiY8Pl0vO1xuZXhwb3J0cy5lc2NhcGUgPSBwdWdfZXNjYXBlO1xuZnVuY3Rpb24gcHVnX2VzY2FwZShfaHRtbCl7XG4gIHZhciBodG1sID0gJycgKyBfaHRtbDtcbiAgdmFyIHJlZ2V4UmVzdWx0ID0gcHVnX21hdGNoX2h0bWwuZXhlYyhodG1sKTtcbiAgaWYgKCFyZWdleFJlc3VsdCkgcmV0dXJuIF9odG1sO1xuXG4gIHZhciByZXN1bHQgPSAnJztcbiAgdmFyIGksIGxhc3RJbmRleCwgZXNjYXBlO1xuICBmb3IgKGkgPSByZWdleFJlc3VsdC5pbmRleCwgbGFzdEluZGV4ID0gMDsgaSA8IGh0bWwubGVuZ3RoOyBpKyspIHtcbiAgICBzd2l0Y2ggKGh0bWwuY2hhckNvZGVBdChpKSkge1xuICAgICAgY2FzZSAzNDogZXNjYXBlID0gJyZxdW90Oyc7IGJyZWFrO1xuICAgICAgY2FzZSAzODogZXNjYXBlID0gJyZhbXA7JzsgYnJlYWs7XG4gICAgICBjYXNlIDYwOiBlc2NhcGUgPSAnJmx0Oyc7IGJyZWFrO1xuICAgICAgY2FzZSA2MjogZXNjYXBlID0gJyZndDsnOyBicmVhaztcbiAgICAgIGRlZmF1bHQ6IGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAobGFzdEluZGV4ICE9PSBpKSByZXN1bHQgKz0gaHRtbC5zdWJzdHJpbmcobGFzdEluZGV4LCBpKTtcbiAgICBsYXN0SW5kZXggPSBpICsgMTtcbiAgICByZXN1bHQgKz0gZXNjYXBlO1xuICB9XG4gIGlmIChsYXN0SW5kZXggIT09IGkpIHJldHVybiByZXN1bHQgKyBodG1sLnN1YnN0cmluZyhsYXN0SW5kZXgsIGkpO1xuICBlbHNlIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIFJlLXRocm93IHRoZSBnaXZlbiBgZXJyYCBpbiBjb250ZXh0IHRvIHRoZVxuICogdGhlIHB1ZyBpbiBgZmlsZW5hbWVgIGF0IHRoZSBnaXZlbiBgbGluZW5vYC5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWxlbmFtZVxuICogQHBhcmFtIHtTdHJpbmd9IGxpbmVub1xuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBvcmlnaW5hbCBzb3VyY2VcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMucmV0aHJvdyA9IHB1Z19yZXRocm93O1xuZnVuY3Rpb24gcHVnX3JldGhyb3coZXJyLCBmaWxlbmFtZSwgbGluZW5vLCBzdHIpe1xuICBpZiAoIShlcnIgaW5zdGFuY2VvZiBFcnJvcikpIHRocm93IGVycjtcbiAgaWYgKCh0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnIHx8ICFmaWxlbmFtZSkgJiYgIXN0cikge1xuICAgIGVyci5tZXNzYWdlICs9ICcgb24gbGluZSAnICsgbGluZW5vO1xuICAgIHRocm93IGVycjtcbiAgfVxuICB0cnkge1xuICAgIHN0ciA9IHN0ciB8fCByZXF1aXJlKCdmcycpLnJlYWRGaWxlU3luYyhmaWxlbmFtZSwgJ3V0ZjgnKVxuICB9IGNhdGNoIChleCkge1xuICAgIHB1Z19yZXRocm93KGVyciwgbnVsbCwgbGluZW5vKVxuICB9XG4gIHZhciBjb250ZXh0ID0gM1xuICAgICwgbGluZXMgPSBzdHIuc3BsaXQoJ1xcbicpXG4gICAgLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIGNvbnRleHQsIDApXG4gICAgLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIGNvbnRleHQpO1xuXG4gIC8vIEVycm9yIGNvbnRleHRcbiAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSl7XG4gICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyAnICA+ICcgOiAnICAgICcpXG4gICAgICArIGN1cnJcbiAgICAgICsgJ3wgJ1xuICAgICAgKyBsaW5lO1xuICB9KS5qb2luKCdcXG4nKTtcblxuICAvLyBBbHRlciBleGNlcHRpb24gbWVzc2FnZVxuICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCAnUHVnJykgKyAnOicgKyBsaW5lbm9cbiAgICArICdcXG4nICsgY29udGV4dCArICdcXG5cXG4nICsgZXJyLm1lc3NhZ2U7XG4gIHRocm93IGVycjtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wdWctcnVudGltZS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiAoaWdub3JlZCkgKi9cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBmcyAoaWdub3JlZClcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9tb2R1bGVzL01haW5NZW51L01haW5NZW51LnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7XCJsb2dvXCI6e1wiaW1nXCI6XCJhc3NldHMvaW1hZ2VzL2xvZ28tZml0dGVkLnBuZ1wiLFwibGlua1wiOlwiL1wifSxcImxpbmtzXCI6W3tcImxhYmVsXCI6XCJIb21lXCIsXCJocmVmXCI6XCIvXCJ9LHtcImxhYmVsXCI6XCJSZXBvc2l0b3J5XCIsXCJocmVmXCI6XCJodHRwczovL2dpdGh1Yi5jb20vd2lsbGlhbWVnb21lei9NYWNoaW5lLUxlYXJuaW5nLVRlYWNoaW5nXCJ9LHtcImxhYmVsXCI6XCJQcm9qZWN0c1wiLFwibGlua3NcIjpbe1wibGFiZWxcIjpcIjIwMTgtMVwiLFwiaHJlZlwiOlwiL1wifV19XX1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2RhdGEvTWFpbk1lbnUuanNvblxuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9