'use client';
'use strict';

var React = require('react');
var label = require('../constants/label.js');
var contribution = require('../utils/contribution.js');
var style_module = require('../styles/style.module.css.js');
var common = require('../utils/common.js');
var color = require('../constants/color.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

function ContributionTable(_ref) {
  var _ref$data = _ref.data,
    data = _ref$data === void 0 ? [] : _ref$data,
    _ref$isDark = _ref.isDark,
    isDark = _ref$isDark === void 0 ? false : _ref$isDark,
    _ref$isHeader = _ref.isHeader,
    isHeader = _ref$isHeader === void 0 ? false : _ref$isHeader,
    _ref$total = _ref.total,
    total = _ref$total === void 0 ? 0 : _ref$total,
    _ref$style = _ref.style,
    styleProps = _ref$style === void 0 ? {} : _ref$style,
    renderHeader = _ref.renderHeader;
  if (!data.length) {
    var emptyContributions = contribution.generateEmptyContributions();
    data = contribution.convertContributionsToWeeks(emptyContributions);
  }
  var colorTheme = color.colorMode[isDark ? 'dark' : 'light'];
  function renderSideTable(_weekArray) {
    var borderStyle = {
      borderStyle: 'hidden',
      borderColor: 'transparent'
    };
    return /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, /*#__PURE__*/React__default.default.createElement("thead", null, /*#__PURE__*/React__default.default.createElement("tr", {
      style: {
        height: '30px'
      },
      className: common.getClassName('row', [style_module.table_row])
    }, /*#__PURE__*/React__default.default.createElement("td", {
      style: {
        paddingBottom: '0.5rem'
      },
      className: common.getClassName('cell', [style_module.table_cell, style_module.table_sticky_cell])
    }, /*#__PURE__*/React__default.default.createElement("span", {
      style: {
        visibility: 'hidden'
      },
      className: common.getClassName('cell', [style_module.table_sticky_cell, style_module.small_font, style_module.bold_font])
    }, "Day")))), /*#__PURE__*/React__default.default.createElement("tbody", null, label.default.week.map(function (day, index) {
      var isOdd = Boolean(index % 2);
      return /*#__PURE__*/React__default.default.createElement("tr", {
        key: day,
        className: common.getClassName('row', [style_module.table_row])
      }, /*#__PURE__*/React__default.default.createElement("td", {
        style: Object.assign({}, borderStyle),
        className: common.getClassName('cell', [style_module.table_cell, style_module.table_sticky_cell, style_module.table_border_cell, style_module.small_font, style_module.bold_font])
      }, /*#__PURE__*/React__default.default.createElement("span", {
        style: {
          visibility: isOdd ? 'visible' : 'hidden',
          verticalAlign: 'middle',
          color: colorTheme.bold
        },
        className: common.getClassName('cell', [style_module.small_font, style_module.bold_font])
      }, day)));
    })));
  }
  function renderTableHeader(_weekArray) {
    return /*#__PURE__*/React__default.default.createElement("tr", {
      style: {
        height: '30px'
      },
      className: common.getClassName('row', [style_module.table_row])
    }, contribution.getMonthLabels(_weekArray).map(function (_ref2, index) {
      var text = _ref2.label,
        colSpan = _ref2.colSpan;
      return /*#__PURE__*/React__default.default.createElement("td", {
        key: "".concat(text, "__").concat(index),
        colSpan: colSpan,
        style: {
          textAlign: 'start',
          paddingBottom: '0.5rem'
        },
        className: common.getClassName('cell', [style_module.table_cell])
      }, /*#__PURE__*/React__default.default.createElement("span", {
        style: {
          color: colorTheme.bold
        },
        className: common.getClassName('text', [style_module.small_font, style_module.bold_font])
      }, text));
    }));
  }
  function renderTableBody(_weekArray) {
    var borderStyle = {
      borderStyle: 'solid',
      borderColor: colorTheme.light
    };
    return label.default.week.map(function (day, index) {
      return /*#__PURE__*/React__default.default.createElement("tr", {
        key: day,
        className: common.getClassName('row', [style_module.table_row])
      }, _weekArray.filter(function (week) {
        var _a;
        return !!((_a = week.contributionDays) === null || _a === void 0 ? void 0 : _a[index]);
      }).map(function (week) {
        var target = week.contributionDays[index];
        var countAttribute = target.contributionCount ? {
          className: style_module.large_font,
          color: colorTheme.bold
        } : {
          className: style_module.small_font,
          color: colorTheme.light
        };
        return /*#__PURE__*/React__default.default.createElement("td", {
          key: target.date,
          style: Object.assign({
            cursor: 'pointer'
          }, borderStyle),
          className: common.getClassName('cell', [style_module.table_cell, style_module.table_day_cell, style_module.table_border_cell])
        }, /*#__PURE__*/React__default.default.createElement("span", {
          style: {
            color: countAttribute.color
          },
          className: common.getClassName('text', [countAttribute.className])
        }, target.contributionCount));
      }));
    });
  }
  return /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, isHeader && renderHeader ? renderHeader(total) : undefined, /*#__PURE__*/React__default.default.createElement("div", {
    style: Object.assign({
      display: 'flex',
      width: '100%'
    }, styleProps)
  }, /*#__PURE__*/React__default.default.createElement("article", {
    className: common.getClassName('article', [style_module.article])
  }, /*#__PURE__*/React__default.default.createElement("table", {
    className: common.getClassName('side_table', [style_module.table])
  }, renderSideTable())), /*#__PURE__*/React__default.default.createElement("article", {
    className: common.getClassName('article', [style_module.article, style_module.main_article])
  }, /*#__PURE__*/React__default.default.createElement("table", {
    style: {
      marginBottom: '2rem'
    },
    className: common.getClassName('main_table', [style_module.table])
  }, /*#__PURE__*/React__default.default.createElement("thead", null, renderTableHeader(data)), /*#__PURE__*/React__default.default.createElement("tbody", null, renderTableBody(data))))));
}

module.exports = ContributionTable;
//# sourceMappingURL=ContributionTable.js.map
