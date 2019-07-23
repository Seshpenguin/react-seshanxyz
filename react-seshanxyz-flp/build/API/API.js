"use strict";

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadDataFromWP = loadDataFromWP;
exports.loadPostsList = loadPostsList;
exports.loadPost = loadPost;
exports.loadAllDataFromWP = loadAllDataFromWP;
exports.LoadAllDataFromWPCached = void 0;

require("regenerator-runtime/runtime");

var _axios = _interopRequireDefault(require("axios"));

var _cheerio = _interopRequireDefault(require("cheerio"));

var _EspiAPI = require("./EspiAPI");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function loadDataFromWP(_x) {
  return _loadDataFromWP.apply(this, arguments);
}

function _loadDataFromWP() {
  _loadDataFromWP = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(endpoint) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _axios.default.get('https://seshan.xyz/wp-json/wp/v2/' + endpoint);

          case 3:
            return _context3.abrupt("return", _context3.sent);

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3["catch"](0);
            console.error(_context3.t0);
            throw false;

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 6]]);
  }));
  return _loadDataFromWP.apply(this, arguments);
}

function loadPostsList(_x2) {
  return _loadPostsList.apply(this, arguments);
}

function _loadPostsList() {
  _loadPostsList = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(page) {
    var response, totalPages;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return loadDataFromWP('posts?page=' + parseInt(page));

          case 2:
            response = _context4.sent;

            if (response) {
              _context4.next = 5;
              break;
            }

            return _context4.abrupt("return", false);

          case 5:
            totalPages = response.headers['x-wp-totalpages'];
            return _context4.abrupt("return", {
              posts: response.data,
              totalPages: totalPages
            });

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _loadPostsList.apply(this, arguments);
}

function loadPost(_x3) {
  return _loadPost.apply(this, arguments);
} // This function pulls in all the data the site needs. (And let's React take whatever it needs)
// This is kind of slow, but because it's running server-side on
// the same host, it's not that bad.
// The problem is we can't do anything async in React (because of how ReactDOMServer is implemented).
// So, we *have* to pull everything before in the Express context, and pass it to React.
// Also this should probably should be cached.


function _loadPost() {
  _loadPost = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(id) {
    var response;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return loadDataFromWP('posts/' + parseInt(id));

          case 2:
            response = _context5.sent;

            if (response) {
              _context5.next = 5;
              break;
            }

            return _context5.abrupt("return", false);

          case 5:
            return _context5.abrupt("return", response.data);

          case 6:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _loadPost.apply(this, arguments);
}

function loadAllDataFromWP() {
  return _loadAllDataFromWP.apply(this, arguments);
}
/* Cache! */
// Loads all the data from WordPress, but after a certain number of reqs,
// it refreshes the cached data. This way there is always data to serve, and
// users don't need to wait for data to load.


function _loadAllDataFromWP() {
  _loadAllDataFromWP = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6() {
    var dataObj, homeContent, $, initPage, totalPages, i, _i, page, _i2;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            console.log('Loading WP Data!');
            dataObj = {
              homeContent: '',
              postsList: [],
              posts: [],
              espi: {
                home: {},
                contact: {}
              }
            };
            _context6.prev = 2;
            _context6.next = 5;
            return loadDataFromWP('pages/2');

          case 5:
            homeContent = _context6.sent;
            $ = _cheerio.default.load(homeContent.data.content.rendered, {
              xmlMode: true
            });
            $('script').remove();
            dataObj.homeContent = $.html();
            console.log('Loaded Home Content...'); // Load all posts from pages: (Post List)

            _context6.next = 12;
            return loadPostsList(1);

          case 12:
            initPage = _context6.sent;
            console.log('Loaded first blog page...');
            totalPages = initPage.totalPages;

            for (i = 0; i < initPage.posts.length; i++) {
              dataObj.postsList.push(initPage.posts[i]);
            } // Load the rest of the posts.


            _i = 2;

          case 17:
            if (!(_i <= totalPages)) {
              _context6.next = 26;
              break;
            }

            _context6.next = 20;
            return loadPostsList(_i);

          case 20:
            page = _context6.sent;
            console.log('Loaded Blog Page ' + _i + '...');

            for (_i2 = 0; _i2 < page.posts.length; _i2++) {
              dataObj.postsList.push(page.posts[_i2]);
            }

          case 23:
            _i++;
            _context6.next = 17;
            break;

          case 26:
            /*
            // Load all Posts
            for(let i = 0; i < dataObj.postsList.length; i++) {
                try{
                    dataObj.posts.push(await loadPost(dataObj.postsList[i].id));
                } catch (e) {
                    console.log(JSON.stringify(dataObj.postsList[i]));
                    console.log(e);
                }
                 console.log('Loaded Post '+ i + '...');
            }*/
            // Espi.Dev Data:
            console.log('Loading Espi.dev...');
            _context6.next = 29;
            return (0, _EspiAPI.espiGetContactPage)();

          case 29:
            dataObj.espi.contact = _context6.sent;
            _context6.next = 32;
            return (0, _EspiAPI.espiGetHomePage)();

          case 32:
            dataObj.espi.home = _context6.sent;
            console.log('Espi.dev loaded...');
            _context6.next = 40;
            break;

          case 36:
            _context6.prev = 36;
            _context6.t0 = _context6["catch"](2);
            console.error(_context6.t0);
            return _context6.abrupt("return", false);

          case 40:
            return _context6.abrupt("return", dataObj);

          case 41:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[2, 36]]);
  }));
  return _loadAllDataFromWP.apply(this, arguments);
}

var LoadAllDataFromWPCached =
/*#__PURE__*/
function () {
  function LoadAllDataFromWPCached() {
    var _this = this;

    _classCallCheck(this, LoadAllDataFromWPCached);

    _defineProperty(this, "cacheFreshness", 1);

    _defineProperty(this, "cachedData", false);

    _defineProperty(this, "isRefreshingData", false);

    this.freshenCache().then(function () {
      console.log('Fresh Data initially loaded.');
      _this.isRefreshingData = false;
    });
    this.isRefreshingData = true;
  }

  _createClass(LoadAllDataFromWPCached, [{
    key: "freshenCache",
    value: function () {
      var _freshenCache = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.isRefreshingData) {
                  _context.next = 9;
                  break;
                }

                this.isRefreshingData = true;
                _context.next = 4;
                return loadAllDataFromWP();

              case 4:
                this.cachedData = _context.sent;
                this.isRefreshingData = false;
                return _context.abrupt("return", true);

              case 9:
                return _context.abrupt("return", false);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function freshenCache() {
        return _freshenCache.apply(this, arguments);
      }

      return freshenCache;
    }()
  }, {
    key: "load",
    value: function () {
      var _load = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(this.cacheFreshness === 0)) {
                  _context2.next = 5;
                  break;
                }

                console.log('Serving cached data, but fetching fresh data...');
                this.cacheFreshness++;
                this.freshenCache().then(function (status) {
                  if (status) {
                    console.log('Cache is fresh now!');
                  } else {
                    console.log('Refreshing is in progress...');
                  }
                });
                return _context2.abrupt("return", this.cachedData);

              case 5:
                if (!(this.cacheFreshness === 20)) {
                  _context2.next = 9;
                  break;
                }

                // Number of requests before refreshing cache.
                console.log('Serving cached data... (resetting freshness) ');
                this.cacheFreshness = 0;
                return _context2.abrupt("return", this.cachedData);

              case 9:
                console.log('Serving cached data...');
                this.cacheFreshness++;
                return _context2.abrupt("return", this.cachedData);

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function load() {
        return _load.apply(this, arguments);
      }

      return load;
    }()
  }]);

  return LoadAllDataFromWPCached;
}();

exports.LoadAllDataFromWPCached = LoadAllDataFromWPCached;