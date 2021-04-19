"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRequest = useRequest;
exports.useQuery = useQuery;

var _react = require("react");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var REQUEST_INIT = 'REQUEST_INIT';
var REQUEST_SUCCESS = 'REQUEST_SUCCESS';
var REQUEST_FAILURE = 'REQUEST_FAILURE';
var defaultInitialState = {
  loading: false,
  data: null,
  error: null
};

function reducer(state, action) {
  switch (action.type) {
    case REQUEST_INIT:
      return _objectSpread(_objectSpread({}, defaultInitialState), {}, {
        loading: true
      });

    case REQUEST_SUCCESS:
      return _objectSpread(_objectSpread({}, state), {}, {
        loading: false,
        data: action.payload
      });

    case REQUEST_FAILURE:
      return _objectSpread(_objectSpread({}, state), {}, {
        loading: false,
        error: action.error
      });

    default:
      throw new Error('error');
  }
}

function request(_x, _x2) {
  return _request.apply(this, arguments);
}

function _request() {
  _request = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(instance, dispatch) {
    var response, result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            dispatch({
              type: REQUEST_INIT
            });
            _context2.prev = 1;
            _context2.next = 4;
            return instance();

          case 4:
            response = _context2.sent;
            _context2.next = 7;
            return response.data;

          case 7:
            result = _context2.sent;
            dispatch({
              type: REQUEST_SUCCESS,
              payload: result
            });
            return _context2.abrupt("return", result);

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](1);
            dispatch({
              type: REQUEST_FAILURE,
              error: _context2.t0
            });
            throw _context2.t0;

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 12]]);
  }));
  return _request.apply(this, arguments);
}

function useRequest(instance) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$throwError = options.throwError,
      throwError = _options$throwError === void 0 ? true : _options$throwError,
      _options$initialState = options.initialState,
      initialState = _options$initialState === void 0 ? {} : _options$initialState,
      onSuccess = options.onSuccess,
      onFailure = options.onFailure;

  var _useReducer = (0, _react.useReducer)(reducer, _objectSpread(_objectSpread({}, defaultInitialState), initialState)),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  function requestCallback() {
    return _requestCallback.apply(this, arguments);
  }

  function _requestCallback() {
    _requestCallback = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _len,
          args,
          _key,
          result,
          _args = arguments;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              for (_len = _args.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = _args[_key];
              }

              _context.prev = 1;
              _context.next = 4;
              return request(function () {
                return instance.apply(void 0, args);
              }, dispatch);

            case 4:
              result = _context.sent;
              onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess(result);
              Promise.resolve(result);
              _context.next = 14;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](1);
              onFailure === null || onFailure === void 0 ? void 0 : onFailure(_context.t0);

              if (!throwError) {
                _context.next = 14;
                break;
              }

              return _context.abrupt("return", Promise.reject(_context.t0));

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 9]]);
    }));
    return _requestCallback.apply(this, arguments);
  }

  return [(0, _react.useCallback)(requestCallback, []), state];
}

function useQuery(api) {
  var options;

  if (_typeof(arguments.length <= 1 ? undefined : arguments[1]) === 'object') {
    options = arguments.length <= 1 ? undefined : arguments[1];
  } else if ([_typeof(arguments.length <= 1 ? undefined : arguments[1]), _typeof(arguments.length <= 2 ? undefined : arguments[2])].includes('function')) {
    var params = arguments.length <= 3 ? undefined : arguments[3];
    options = {
      onSuccess: arguments.length <= 1 ? undefined : arguments[1],
      initialState: params === null || params === void 0 ? void 0 : params.initialState,
      throwError: params === null || params === void 0 ? void 0 : params.throwError
    };

    if (arguments.length <= 2 ? undefined : arguments[2]) {
      if (typeof (arguments.length <= 2 ? undefined : arguments[2]) !== 'function') throw Error('useQuery() hook third parameter expects a function (`onFailure`).');
      options = _objectSpread(_objectSpread({}, options), {}, {
        onFailure: arguments.length <= 2 ? undefined : arguments[2]
      });
    }
  } else {
    throw Error('useQuery() hook second parameter expects a function (`onSuccess`).');
  }

  var initialState = _objectSpread(_objectSpread({}, options.initialState), {}, {
    loading: true
  });

  return useRequest(api, _objectSpread(_objectSpread({}, options), {}, {
    initialState: initialState
  }));
}