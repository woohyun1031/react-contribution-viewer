'use client';
'use strict';

var _rollupPluginBabelHelpers = require('./_virtual/_rollupPluginBabelHelpers.js');
var tslib_es6_js = require('/Users/kimwoohyun/private/react-contribution-viewer/node_modules/tslib/tslib.es6.js');
var React = require('react');
var fetchContribution = require('./api/fetchContribution.js');
var ContributionTable = require('./components/ContributionTable.js');
var contribution = require('./utils/contribution.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

var ContributionWrapper = function ContributionWrapper(_a) {
  var username = _a.username,
    serverData = _a.serverData,
    props = tslib_es6_js.__rest(_a, ["username", "serverData"]);
  var _React$useState = React__default.default.useState([]),
    _React$useState2 = _rollupPluginBabelHelpers.slicedToArray(_React$useState, 2),
    contributions = _React$useState2[0],
    setContributions = _React$useState2[1];
  var _React$useState3 = React__default.default.useState(0),
    _React$useState4 = _rollupPluginBabelHelpers.slicedToArray(_React$useState3, 2),
    total = _React$useState4[0],
    setTotal = _React$useState4[1];
  var _React$useState5 = React__default.default.useState(false),
    _React$useState6 = _rollupPluginBabelHelpers.slicedToArray(_React$useState5, 2),
    loading = _React$useState6[0],
    setLoading = _React$useState6[1];
  var _React$useState7 = React__default.default.useState(null),
    _React$useState8 = _rollupPluginBabelHelpers.slicedToArray(_React$useState7, 2),
    error = _React$useState8[0],
    setError = _React$useState8[1];
  React__default.default.useEffect(function () {
    setLoading(true);
    if (serverData && serverData.weeks.length) {
      try {
        setContributions(serverData.weeks);
        setTotal(serverData.totalContributions);
      } finally {
        setLoading(false);
      }
    } else {
      fetchContribution.fetchContribution({
        username: username
      }).then(function (res) {
        var _a;
        var weeks = contribution.convertContributionsToWeeks(res.contributions);
        setContributions(weeks);
        setTotal((_a = res.total['lastYear']) !== null && _a !== void 0 ? _a : 0);
      })["catch"](setError)["finally"](function () {
        return setLoading(false);
      });
    }
  }, []);
  if (error || loading) {
    error && console.error(error);
    return /*#__PURE__*/React__default.default.createElement(ContributionTable, Object.assign({
      data: [],
      total: total,
      isHeader: props.isHeader,
      isDark: props.isDark
    }, props));
  }
  return /*#__PURE__*/React__default.default.createElement(ContributionTable, Object.assign({
    data: contributions,
    total: total,
    isHeader: props.isHeader,
    isDark: props.isDark
  }, props));
};

module.exports = ContributionWrapper;
//# sourceMappingURL=index.js.map
