"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var functions = _interopRequireWildcard(require("firebase-functions"));

var _fs = _interopRequireDefault(require("fs"));

var _react = _interopRequireDefault(require("react"));

var _server = require("react-dom/server");

var _express = _interopRequireDefault(require("express"));

var _App = _interopRequireDefault(require("./src/App"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var INDEX = _fs["default"].readFileSync(__dirname + "/src/index.html", "utf-8");

var app = (0, _express["default"])();
app.use("/static", _express["default"]["static"]("static"));
app.get("/", function (req, res) {
  var HTML = INDEX.replace("<!--app-->", (0, _server.renderToString)( /*#__PURE__*/_react["default"].createElement(_App["default"], null)));
  res.send(HTML);
});
exports.app = functions.https.onRequest(app);