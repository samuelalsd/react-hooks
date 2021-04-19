"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useDocumentTitle;

var _react = require("react");

function useDocumentTitle(title) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$retainOnMount = _ref.retainOnMount,
      retainOnMount = _ref$retainOnMount === void 0 ? false : _ref$retainOnMount;

  var defaultTitle = (0, _react.useRef)(document.title);
  (0, _react.useEffect)(function () {
    document.title = title;
  }, [title]);
  (0, _react.useEffect)(function () {
    return function () {
      if (!retainOnMount) {
        document.title = defaultTitle.current;
      }
    };
  }, []);
}