'use client';
'use strict';

var styleInject = require('style-inject');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styleInject__default = /*#__PURE__*/_interopDefault(styleInject);

styleInject__default.default(" body { margin: 0; }");
var colorMode = {
  light: {
    light: '#d1d5db',
    midium: '#9ca3af',
    bold: '#374151'
  },
  dark: {
    light: '#6b7280',
    midium: '#9ca3af',
    bold: '#f3f4f6'
  }
};

exports.colorMode = colorMode;
//# sourceMappingURL=color.js.map
