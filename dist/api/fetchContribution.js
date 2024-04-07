'use client';
'use strict';

var _rollupPluginBabelHelpers = require('../_virtual/_rollupPluginBabelHelpers.js');
var tslib_es6_js = require('/Users/kimwoohyun/private/react-contribution-viewer/node_modules/tslib/tslib.es6.js');

function fetchContribution(_a) {
  return tslib_es6_js.__awaiter(this, arguments, void 0, function (_ref) {
    var username = _ref.username;
    return /*#__PURE__*/_rollupPluginBabelHelpers.regeneratorRuntime().mark(function _callee() {
      var response, responseJSON;
      return _rollupPluginBabelHelpers.regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch("https://github-contributions-api.jogruber.de/v4/".concat(username, "?y=last"), {
              method: 'GET'
            });
          case 2:
            response = _context.sent;
            _context.next = 5;
            return response.json();
          case 5:
            responseJSON = _context.sent;
            if (response.ok) {
              _context.next = 8;
              break;
            }
            throw Error("Fetching GitHub contribution data for \"".concat(username, "\" failed: ").concat(responseJSON.error));
          case 8:
            return _context.abrupt("return", responseJSON);
          case 9:
          case "end":
            return _context.stop();
        }
      }, _callee);
    })();
  });
}

exports.fetchContribution = fetchContribution;
//# sourceMappingURL=fetchContribution.js.map
