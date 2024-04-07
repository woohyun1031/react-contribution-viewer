'use client';
'use strict';

var contribution = require('../constants/contribution.js');

function getClassName(name, stylesArray) {
  if (!(stylesArray === null || stylesArray === void 0 ? void 0 : stylesArray.length)) return "".concat(contribution.NAMESPACE, "__").concat(name);
  return "".concat(contribution.NAMESPACE, "__").concat(name, " ").concat(stylesArray.join(' '));
}

exports.getClassName = getClassName;
//# sourceMappingURL=common.js.map
