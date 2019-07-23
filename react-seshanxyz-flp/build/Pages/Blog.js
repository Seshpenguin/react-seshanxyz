"use strict";

require("core-js/modules/es.string.match");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewPost = exports.BlogList = void 0;

var _react = _interopRequireWildcard(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

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

var BlogList =
/*#__PURE__*/
function (_Component) {
  _inherits(BlogList, _Component);

  function BlogList() {
    _classCallCheck(this, BlogList);

    return _possibleConstructorReturn(this, _getPrototypeOf(BlogList).apply(this, arguments));
  }

  _createClass(BlogList, [{
    key: "render",
    value: function render() {
      var postList = this.props.staticContext.WPData.postsList;
      var postListJSX = [];

      for (var i = 0; i < postList.length; i++) {
        postListJSX.push(_react.default.createElement("div", {
          key: i
        }, _react.default.createElement("hr", null), _react.default.createElement("h3", null, postList[i].title.rendered), _react.default.createElement("b", null, postList[i].date), _react.default.createElement("div", {
          dangerouslySetInnerHTML: {
            __html: postList[i].excerpt.rendered
          }
        }), _react.default.createElement("a", {
          href: '/blog/' + postList[i].id
        }, "View Full Post")));
      }

      return _react.default.createElement("div", null, _react.default.createElement("h2", null, "Blog Posts: "), postListJSX);
    }
  }]);

  return BlogList;
}(_react.Component);

exports.BlogList = BlogList;

var ViewPost =
/*#__PURE__*/
function (_Component2) {
  _inherits(ViewPost, _Component2);

  function ViewPost() {
    _classCallCheck(this, ViewPost);

    return _possibleConstructorReturn(this, _getPrototypeOf(ViewPost).apply(this, arguments));
  }

  _createClass(ViewPost, [{
    key: "render",
    value: function render() {
      var postList = this.props.staticContext.WPData.postsList;
      var id = this.props.match.params.id;

      var post = _lodash.default.find(postList, function (post) {
        return post.id === parseInt(id);
      });

      if (typeof post === "undefined") {
        return _react.default.createElement("p", null, "Error Loading Blog Post ", id, "...");
      }

      return _react.default.createElement("div", null, _react.default.createElement("hr", null), _react.default.createElement("h3", null, post.title.rendered), _react.default.createElement("b", null, post.date), _react.default.createElement("div", {
        dangerouslySetInnerHTML: {
          __html: post.content.rendered
        }
      }), _react.default.createElement("a", {
        href: '/blog/' + post.id
      }, "View Full Post"));
    }
  }]);

  return ViewPost;
}(_react.Component);

exports.ViewPost = ViewPost;