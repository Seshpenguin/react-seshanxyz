"use strict";

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.espiGetContactPage = espiGetContactPage;
exports.espiGetHomePage = espiGetHomePage;

require("regenerator-runtime/runtime");

var _axios = _interopRequireDefault(require("axios"));

var _cheerio = _interopRequireDefault(require("cheerio"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function espiGetContactPage() {
  return _espiGetContactPage.apply(this, arguments);
}

function _espiGetContactPage() {
  _espiGetContactPage = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var page, $;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _axios.default.get('https://espi.dev/contact');

          case 2:
            page = _context.sent;
            $ = _cheerio.default.load(page.data);
            return _context.abrupt("return", $('div.container').html());

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _espiGetContactPage.apply(this, arguments);
}

function espiGetHomePage() {
  return _espiGetHomePage.apply(this, arguments);
}

function _espiGetHomePage() {
  _espiGetHomePage = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var page, $, homeSlogan, aboutContent;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _axios.default.get('https://espi.dev/');

          case 2:
            page = _context2.sent;
            $ = _cheerio.default.load(page.data);
            homeSlogan = $('h3').text();
            _context2.next = 7;
            return _axios.default.get('https://espi.dev/about');

          case 7:
            page = _context2.sent;
            $ = _cheerio.default.load(page.data);
            aboutContent = $('div.container').html();
            return _context2.abrupt("return", {
              homeSlogan,
              aboutContent
            });

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _espiGetHomePage.apply(this, arguments);
}