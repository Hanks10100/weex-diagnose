// { "framework": "Vue" }

// http://dotwe.org/vue/37342fb601ca1ff68d8459fdf5c35175
// ┌──────────────┬──────────────┬──────────────┬───────────────┬─────────────┐
// |  bundleSize  |  totalCount  |  totalDepth  |  messageSize  |  timecost   |
// ├──────────────┼──────────────┼──────────────┼───────────────┼─────────────┤
// |  7200 Byte   |  3295        |  4           |  812.61 KB    |  59.498 ms  |
// └──────────────┴──────────────┴──────────────┴───────────────┴─────────────┘

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _App = __webpack_require__(1);

	var _App2 = _interopRequireDefault(_App);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_App2.default.el = '#root';
	new Vue(_App2.default);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = []

	/* script */
	__vue_exports__ = __webpack_require__(2)

	/* template */
	var __vue_template__ = __webpack_require__(7)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/Hanks/Codes/work/weex-vue-examples/src/App.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__.style = __vue_options__.style || {}
	__vue_styles__.forEach(function (module) {
	  for (var name in module) {
	    __vue_options__.style[name] = module[name]
	  }
	})
	if (typeof __register_static_styles__ === "function") {
	  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
	}

	module.exports = __vue_exports__


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _flatten = __webpack_require__(3);

	var _flatten2 = _interopRequireDefault(_flatten);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  components: { Example: _flatten2.default }
	}; //
	//
	//
	//

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = []

	/* styles */
	__vue_styles__.push(__webpack_require__(4)
	)

	/* script */
	__vue_exports__ = __webpack_require__(5)

	/* template */
	var __vue_template__ = __webpack_require__(6)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/Hanks/Codes/work/weex-vue-examples/src/features/named/flatten.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-10a1bc16"
	__vue_options__.style = __vue_options__.style || {}
	__vue_styles__.forEach(function (module) {
	  for (var name in module) {
	    __vue_options__.style[name] = module[name]
	  }
	})
	if (typeof __register_static_styles__ === "function") {
	  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
	}

	module.exports = __vue_exports__


/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = {
	  "row": {
	    "flexDirection": "row"
	  },
	  "cell": {
	    "justifyContent": "center",
	    "marginTop": 2,
	    "marginBottom": 2,
	    "marginLeft": 2,
	    "marginRight": 2,
	    "borderWidth": 2,
	    "borderStyle": "solid",
	    "borderColor": "rgb(65,184,131)",
	    "backgroundColor": "rgba(65,184,131,0.25)"
	  },
	  "text": {
	    "color": "rgb(65,184,131)",
	    "textAlign": "center",
	    "fontWeight": "200"
	  }
	}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	'use strict';

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	var VIEWPORT = 750;
	var COLUMN = 30;
	var ROW = Math.ceil(COLUMN * WXEnvironment.deviceHeight / WXEnvironment.deviceWidth);

	module.exports = {
	  data: function data() {
	    var matrix = [];
	    for (var i = 0; i < ROW; i++) {
	      matrix.push([]);
	      for (var j = 0; j < COLUMN; j++) {
	        matrix[i].push(Math.floor(Math.random() * 10));
	      }
	    }
	    return {
	      cellSize: VIEWPORT / COLUMN - 4 + 'px',
	      fontSize: Math.round(VIEWPORT / COLUMN / 2) + 'px',
	      matrix: matrix
	    };
	  }
	};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: ["canvas"]
	  }, _vm._l((_vm.matrix), function(vector) {
	    return _c('div', {
	      staticClass: ["row"]
	    }, _vm._l((vector), function(number) {
	      return _c('div', {
	        staticClass: ["cell"],
	        style: {
	          width: _vm.cellSize,
	          height: _vm.cellSize
	        }
	      }, [_c('text', {
	        staticClass: ["text"],
	        style: {
	          fontSize: _vm.fontSize
	        }
	      }, [_vm._v(_vm._s(number))])])
	    }))
	  }))
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('example')
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ })
/******/ ]);
