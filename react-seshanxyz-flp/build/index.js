"use strict";

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.string.replace");

require("regenerator-runtime/runtime");

var _express = _interopRequireDefault(require("express"));

var _react = _interopRequireDefault(require("react"));

var _server = _interopRequireDefault(require("react-dom/server"));

var _reactRouterDom = require("react-router-dom");

var _API = require("./API/API");

var _cheerio = _interopRequireDefault(require("cheerio"));

var _App = _interopRequireDefault(require("./App"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Load cached data...
var WPData = new _API.LoadAllDataFromWPCached();
var app = (0, _express.default)();
app.get('/*',
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var data, context, html, $;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return WPData.load();

          case 2:
            data = _context.sent;
            console.log('Done loading data!');

            if (data) {
              _context.next = 7;
              break;
            }

            res.status(500).send('Error 500 - Internal Error Querying Data. Is the server still loading?');
            return _context.abrupt("return");

          case 7:
            context = {
              WPData: data,
              isNotFound: false
            };
            html = _server.default.renderToStaticMarkup(_react.default.createElement(_reactRouterDom.StaticRouter, {
              location: req.url,
              context: context
            }, _react.default.createElement(_App.default, {
              data: data
            })));

            if (!context.isNotFound) {
              _context.next = 12;
              break;
            }

            res.status(404).send(html);
            return _context.abrupt("return");

          case 12:
            // Do some final modifications to cleanup the HTML
            html.replace("'", '"');
            html.replace(/[^/\"_+-?![]{}()=*.|a-zA-Z 0-9]+/g, '');
            $ = _cheerio.default.load(html);
            $('script').remove();
            $('style').remove();
            res.send($.root().html());
            res.end();

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
var PORT = 3000;
app.listen(PORT, function () {
  console.log('RSXYZFLP is running on http://localhost:' + PORT);
});