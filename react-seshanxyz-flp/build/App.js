"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _HTMLRoot = _interopRequireDefault(require("./Pages/HTMLRoot"));

var _HomeScreen = _interopRequireDefault(require("./Pages/HomeScreen"));

var _EspiContact = _interopRequireDefault(require("./Pages/EspiDev/EspiContact"));

var _EspiHome = _interopRequireDefault(require("./Pages/EspiDev/EspiHome"));

var _NotFound = _interopRequireDefault(require("./Pages/NotFound"));

var _Blog = require("./Pages/Blog");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Test =
/*#__PURE__*/
function (_Component) {
  _inherits(Test, _Component);

  function Test() {
    _classCallCheck(this, Test);

    return _possibleConstructorReturn(this, _getPrototypeOf(Test).apply(this, arguments));
  }

  _createClass(Test, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("p", null, "This is a test route.");
    }
  }]);

  return Test;
}(_react.Component);

var App =
/*#__PURE__*/
function (_Component2) {
  _inherits(App, _Component2);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, _getPrototypeOf(App).apply(this, arguments));
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(_HTMLRoot.default, {
        title: 'Home'
      }, _react.default.createElement("h1", null, "RSXYZ-FLP"), _react.default.createElement("h2", null, "Seshan.XYZ"), _react.default.createElement("ul", null, _react.default.createElement("li", null, _react.default.createElement("a", {
        href: '/'
      }, "Home")), _react.default.createElement("li", null, _react.default.createElement("a", {
        href: '/blog'
      }, "Blog"))), _react.default.createElement("h2", null, "Espi.Dev"), _react.default.createElement("ul", null, _react.default.createElement("li", null, _react.default.createElement("a", {
        href: '/espi/'
      }, "Home")), _react.default.createElement("li", null, _react.default.createElement("a", {
        href: '/espi/contact'
      }, "Contact"))), _react.default.createElement("hr", null), _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
        exact: true,
        path: "/",
        component: _HomeScreen.default
      }), _react.default.createElement(_reactRouterDom.Route, {
        exact: true,
        path: "/blog",
        component: _Blog.BlogList
      }), _react.default.createElement(_reactRouterDom.Route, {
        path: "/blog/:id",
        component: _Blog.ViewPost
      }), _react.default.createElement(_reactRouterDom.Route, {
        exact: true,
        path: "/espi",
        component: _EspiHome.default
      }), _react.default.createElement(_reactRouterDom.Route, {
        path: "/espi/contact",
        component: _EspiContact.default
      }), _react.default.createElement(_reactRouterDom.Route, {
        component: _NotFound.default
      })), _react.default.createElement("hr", null), _react.default.createElement("p", null, "This is React Seshan.XYZ - Fundamentals for Legacy PCs."), _react.default.createElement("p", null, "Running React ", _react.default.version));
    }
  }]);

  return App;
}(_react.Component);

exports.default = App;