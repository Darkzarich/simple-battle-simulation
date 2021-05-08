// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/Score.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Score = /*#__PURE__*/function () {
  function Score(sides) {
    var _this = this;

    _classCallCheck(this, Score);

    this.score = {};
    this.sides = sides;
    sides.forEach(function (side) {
      _this.score[side.color] = 0;
    });
  }

  _createClass(Score, [{
    key: "getScore",
    value: function getScore() {
      return this.score;
    }
  }, {
    key: "changeScore",
    value: function changeScore(player, value) {
      this.score[player] += value;
    }
  }]);

  return Score;
}();

exports.default = Score;
},{}],"src/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DIRECTION_LEFT = exports.DIRECTION_RIGHT = exports.UNIT_POWER_GROWTH = exports.COLLISION_WIDTH = exports.COLLISION_COLOR = exports.PLAYER2_COLOR = exports.PLAYER1_COLOR = exports.UNIT_BASE_SPEED = exports.UNIT_SIZE = exports.SCORE_SEPARATOR_WIDTH = exports.SCORE_WIDTH = exports.BORDER = void 0;
var BORDER = 400;
exports.BORDER = BORDER;
var SCORE_WIDTH = 100;
exports.SCORE_WIDTH = SCORE_WIDTH;
var SCORE_SEPARATOR_WIDTH = 4;
exports.SCORE_SEPARATOR_WIDTH = SCORE_SEPARATOR_WIDTH;
var UNIT_SIZE = 14;
exports.UNIT_SIZE = UNIT_SIZE;
var UNIT_BASE_SPEED = 1;
exports.UNIT_BASE_SPEED = UNIT_BASE_SPEED;
var PLAYER1_COLOR = 'green';
exports.PLAYER1_COLOR = PLAYER1_COLOR;
var PLAYER2_COLOR = 'maroon';
exports.PLAYER2_COLOR = PLAYER2_COLOR;
var COLLISION_COLOR = 'yellow';
exports.COLLISION_COLOR = COLLISION_COLOR;
var COLLISION_WIDTH = 2;
exports.COLLISION_WIDTH = COLLISION_WIDTH;
var UNIT_POWER_GROWTH = 1;
exports.UNIT_POWER_GROWTH = UNIT_POWER_GROWTH;
var DIRECTION_RIGHT = 1;
exports.DIRECTION_RIGHT = DIRECTION_RIGHT;
var DIRECTION_LEFT = -1;
exports.DIRECTION_LEFT = DIRECTION_LEFT;
},{}],"src/UI.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constants = require("./constants");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UI = /*#__PURE__*/function () {
  function UI(ctx, score) {
    _classCallCheck(this, UI);

    this.$ctx = ctx;
    this.score = score;
  }

  _createClass(UI, [{
    key: "clearFrame",
    value: function clearFrame() {
      this.$ctx.fillStyle = 'black';
      this.$ctx.fillRect(0, 0, canv.width, canv.height);
    }
  }, {
    key: "drawInterface",
    value: function drawInterface() {
      var _this = this;

      // Draw separator
      this.$ctx.fillStyle = 'white';
      this.$ctx.fillRect(_constants.BORDER, 0, _constants.SCORE_SEPARATOR_WIDTH, _constants.BORDER); // Calc score appearance

      var totalScore = Object.keys(this.score.score).reduce(function (prev, cur) {
        return prev + _this.score.score[cur];
      }, 0);
      var scoreOffset = 0;
      Object.keys(this.score.score).forEach(function (color) {
        var percentFromTotal = _this.score.score[color] / totalScore;
        _this.$ctx.fillStyle = color;

        _this.$ctx.fillRect(_constants.BORDER + _constants.SCORE_SEPARATOR_WIDTH, scoreOffset, _constants.SCORE_WIDTH, _constants.BORDER * percentFromTotal);

        _this.$ctx.font = '25px arial';
        _this.$ctx.fillStyle = 'white';

        _this.$ctx.fillText(String("".concat(Math.ceil(percentFromTotal * 100), "%")), _constants.BORDER + _constants.SCORE_SEPARATOR_WIDTH + _constants.SCORE_WIDTH / 4, _constants.BORDER * percentFromTotal / 2 + scoreOffset);

        scoreOffset = scoreOffset + Math.ceil(_constants.BORDER * percentFromTotal) + 2;
      });
    }
  }]);

  return UI;
}();

exports.default = UI;
},{"./constants":"src/constants.js"}],"assets/loop.mp3":[function(require,module,exports) {
module.exports = "/loop.cabe397f.mp3";
},{}],"assets/bump.mp3":[function(require,module,exports) {
module.exports = "/bump.ca2ff121.mp3";
},{}],"src/AudioPlayer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var sounds = {
  background: new Audio(require('../assets/loop.mp3')),
  bump: new Audio(require('../assets/bump.mp3'))
};

var AudioPlayer = /*#__PURE__*/function () {
  function AudioPlayer() {
    _classCallCheck(this, AudioPlayer);
  }

  _createClass(AudioPlayer, null, [{
    key: "playBackgroundMusic",
    value: function playBackgroundMusic() {
      AudioPlayer.play(sounds['background'], 0.7, true);
    }
  }, {
    key: "bump",
    value: function bump() {
      AudioPlayer.play(sounds['bump'], 0.3, false);
    }
  }, {
    key: "play",
    value: function play(audio, volume, loop) {
      var newAudio = audio.cloneNode(true);
      newAudio.loop = loop;
      newAudio.volume = volume;
      newAudio.play();
    }
  }]);

  return AudioPlayer;
}();

exports.default = AudioPlayer;
},{"../assets/loop.mp3":"assets/loop.mp3","../assets/bump.mp3":"assets/bump.mp3"}],"src/Unit.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constants = require("./constants");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Unit = /*#__PURE__*/function () {
  function Unit(_ref, ctx) {
    var x = _ref.x,
        y = _ref.y,
        side = _ref.side;

    _classCallCheck(this, Unit);

    this.x = x;
    this.y = y;
    this.side = side;
    this.collided = false;
    this.direction = side.direction;
    this.$ctx = ctx;
    this.power = 0;
    this.speed = _constants.UNIT_BASE_SPEED;
  }

  _createClass(Unit, [{
    key: "move",
    value: function move() {
      this.renderUnit(this.x, this.y, this.side);
      this.handleOutOfBorder();
      this.speed = Math.max(1, Math.floor(this.power / 50) + 1); // every 50 power +1 speed

      this.x = this.x + this.speed * this.direction;
    }
  }, {
    key: "handleOutOfBorder",
    value: function handleOutOfBorder() {
      if (this.x > _constants.BORDER) {
        this.y = this.y + Math.floor(Math.random() * 100) % _constants.UNIT_SIZE * 2; // random drop down

        this.x = 0;
      }

      if (this.x < 0) {
        this.y = this.y + Math.floor(Math.random() * 100) % _constants.UNIT_SIZE * 2; // random drop down

        this.x = _constants.BORDER;
      }

      if (this.y > _constants.BORDER) {
        this.y = 0;
      }
    }
  }, {
    key: "setPower",
    value: function setPower(power) {
      this.power = power;
    }
  }, {
    key: "renderUnit",
    value: function renderUnit() {
      // draw trace
      for (var i = 1; i < this.side.trace.length + 1; i++) {
        this.$ctx.fillStyle = this.side.trace[i - 1];
        this.$ctx.fillRect(this.x - 3 * i * this.direction, this.y + 1 * i, _constants.UNIT_SIZE, _constants.UNIT_SIZE - 2 * i);
      } // draw unit


      this.$ctx.fillStyle = this.side.color;
      this.$ctx.fillRect(this.x, this.y, _constants.UNIT_SIZE, _constants.UNIT_SIZE); // collision border

      if (this.collided) {
        var offset = this.direction === 1 ? _constants.UNIT_SIZE - _constants.COLLISION_WIDTH : 0;
        this.$ctx.fillStyle = _constants.COLLISION_COLOR;
        this.$ctx.fillRect(this.x + offset, this.y, _constants.COLLISION_WIDTH + 10, _constants.UNIT_SIZE);
      }
    }
  }]);

  return Unit;
}();

exports.default = Unit;
},{"./constants":"src/constants.js"}],"src/Units.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constants = require("./constants");

var _AudioPlayer = _interopRequireDefault(require("./AudioPlayer"));

var _Unit = _interopRequireDefault(require("./Unit"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Units = /*#__PURE__*/function () {
  function Units(ctx, unitsTotal, sides, score) {
    _classCallCheck(this, Units);

    this.$ctx = ctx;
    this.units = this.generateRandomUnits(unitsTotal, sides);
    this.score = score;
  }

  _createClass(Units, [{
    key: "generateRandomUnits",
    value: function generateRandomUnits(unitsTotal, sides) {
      var _this = this;

      var i = 0;
      return new Array(unitsTotal).fill().map(function () {
        if (i < sides.length - 1) i = i + 1;else i = 0;
        return _this.generateRandomUnit(sides[i]);
      });
    }
  }, {
    key: "generateRandomUnit",
    value: function generateRandomUnit(side) {
      return new _Unit.default({
        x: Math.floor(Math.random() * 1000) % 400,
        y: Math.floor(Math.random() * 1000) % 400,
        side: side
      }, this.$ctx);
    }
  }, {
    key: "moveUnits",
    value: function moveUnits() {
      var _this2 = this;

      this.units.forEach(function (unit) {
        unit.move();

        var collidedUnit = _this2.getCollidedUnit(unit);

        if (collidedUnit) {
          // draw collision border
          collidedUnit.collided = true;
          unit.collided = true;

          _AudioPlayer.default.bump();

          if (unit.power >= collidedUnit.power) {
            unit.setPower(0);

            _this2.killUnit(collidedUnit);

            _this2.score.changeScore(unit.side.color, 1);
          } else {
            collidedUnit.setPower(0);

            _this2.killUnit(unit);

            _this2.score.changeScore(collidedUnit.side.color, 1);
          }

          return;
        }

        unit.collided = false;
        unit.setPower(unit.power + _constants.UNIT_POWER_GROWTH);
      });
    }
  }, {
    key: "killUnit",
    value: function killUnit(unit) {
      this.units = this.units.filter(function (u) {
        return u !== unit;
      });
      this.units.push(this.generateRandomUnit(unit.side));
    }
  }, {
    key: "getCollidedUnit",
    value: function getCollidedUnit(unit) {
      var _iterator = _createForOfIteratorHelper(this.units),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var otherUnit = _step.value;

          if (Math.abs(otherUnit.x - unit.x) <= _constants.UNIT_SIZE - _constants.COLLISION_WIDTH && Math.abs(otherUnit.y - unit.y) <= _constants.UNIT_SIZE - _constants.COLLISION_WIDTH && otherUnit.side.color !== unit.side.color) {
            return otherUnit;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }]);

  return Units;
}();

exports.default = Units;
},{"./constants":"src/constants.js","./AudioPlayer":"src/AudioPlayer.js","./Unit":"src/Unit.js"}],"src/Game.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Score = _interopRequireDefault(require("./Score"));

var _UI = _interopRequireDefault(require("./UI"));

var _Units = _interopRequireDefault(require("./Units"));

var _AudioPlayer = _interopRequireDefault(require("./AudioPlayer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Game = /*#__PURE__*/function () {
  function Game(ctx, unitsTotal, sides) {
    _classCallCheck(this, Game);

    this.$ctx = ctx;
    this.score = new _Score.default(sides);
    this.ui = new _UI.default(ctx, this.score);
    this.units = new _Units.default(ctx, unitsTotal, sides, this.score);
    this.init();
  }

  _createClass(Game, [{
    key: "init",
    value: function init() {
      _AudioPlayer.default.playBackgroundMusic();
    }
  }, {
    key: "startSimulation",
    value: function startSimulation() {
      this.ui.clearFrame();
      this.units.moveUnits();
      this.ui.drawInterface();
      window.requestAnimationFrame(this.startSimulation.bind(this));
    }
  }]);

  return Game;
}();

exports.default = Game;
},{"./Score":"src/Score.js","./UI":"src/UI.js","./Units":"src/Units.js","./AudioPlayer":"src/AudioPlayer.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _Game = _interopRequireDefault(require("./src/Game"));

var _constants = require("./src/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canv = document.getElementById('canv');
var $ctx = canv.getContext('2d');
var PLAYER1 = {
  color: _constants.PLAYER1_COLOR,
  trace: ['#008000a8', '#00800054'],
  direction: _constants.DIRECTION_RIGHT
};
var PLAYER2 = {
  color: _constants.PLAYER2_COLOR,
  trace: ['#800000a8', '#80000054'],
  direction: _constants.DIRECTION_LEFT
};
var startButton = document.querySelector('#start');
startButton.addEventListener('click', function () {
  new _Game.default($ctx, 50, [PLAYER1, PLAYER2]).startSimulation();
  startButton.remove();
});
},{"./src/Game":"src/Game.js","./src/constants":"src/constants.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "5884" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/simple-battle-simulation.e31bb0bc.js.map