'use client';
'use strict';

var _rollupPluginBabelHelpers = require('../_virtual/_rollupPluginBabelHelpers.js');
var label = require('../constants/label.js');
var dayjs = require('dayjs');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var dayjs__default = /*#__PURE__*/_interopDefault(dayjs);

var getMonthLabels = function getMonthLabels(weeks) {
  return weeks.reduce(function (prev, cur, idx) {
    var _a;
    var firstDay = dayjs__default.default(cur.contributionDays[0].date).month();
    var currentMonth = label.DEFAULT_MONTH_LABELS[firstDay];
    var prevMonth = (_a = prev[prev.length - 1]) === null || _a === void 0 ? void 0 : _a.label;
    if (idx === 0 || currentMonth !== prevMonth) {
      return [].concat(_rollupPluginBabelHelpers.toConsumableArray(prev), [{
        label: currentMonth,
        index: idx
      }]);
    }
    return prev;
  }, []).reduce(function (labels, current, idx, origin) {
    if (idx === origin.length - 1) {
      var span = weeks.length - idx;
      return [].concat(_rollupPluginBabelHelpers.toConsumableArray(labels), [{
        label: current.label,
        colSpan: span
      }]);
    }
    var currentSpan = origin[idx + 1].index - current.index;
    return [].concat(_rollupPluginBabelHelpers.toConsumableArray(labels), [{
      label: current.label,
      colSpan: currentSpan
    }]);
  }, []);
};
function generateEmptyContributions() {
  var start = dayjs__default.default().startOf('year');
  var end = dayjs__default.default().endOf('year');
  var range = [];
  var current = start;
  while (!current.isAfter(end)) {
    range.push({
      date: current.format('YYYY-MM-DD'),
      count: 0
    });
    current = current.add(1, 'days');
  }
  return range;
}
function convertContributionsToWeeks(contributions) {
  if (!contributions.length) return [];
  var weeks = [];
  contributions.forEach(function (day) {
    var current = {
      contributionCount: day.count,
      date: day.date
    };
    if (weeks[weeks.length - 1] && weeks[weeks.length - 1].contributionDays.length < 7) {
      return weeks[weeks.length - 1].contributionDays.push(current);
    }
    return weeks.push({
      contributionDays: [current]
    });
  });
  return weeks;
}

exports.convertContributionsToWeeks = convertContributionsToWeeks;
exports.generateEmptyContributions = generateEmptyContributions;
exports.getMonthLabels = getMonthLabels;
//# sourceMappingURL=contribution.js.map
