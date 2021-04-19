"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSearch = useSearch;

var _react = require("react");

var _utils = require("../libs/utils");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var defaultParams = {
  match_type: 'exact',
  case_sensitive: false,
  weight: 1
};
/**
 * Search through the properties of a given collection of items.
 * The function returns the items where matches were found, ordered by number of hits.
 * 
 * @param {Array|Object|Map} searchable 
 * @param {Array|Object} collection 
 * @returns 
 */

function useSearch(searchableFields, collection) {
  var _useState = (0, _react.useState)(''),
      _useState2 = _slicedToArray(_useState, 2),
      expression = _useState2[0],
      _search = _useState2[1];

  var _useState3 = (0, _react.useState)(searchableFields),
      _useState4 = _slicedToArray(_useState3, 2),
      fields = _useState4[0],
      setFields = _useState4[1];

  var searchable = (0, _react.useMemo)(formatSearchable, [fields]);

  var _findMatches = findMatches(),
      matches = _findMatches.matches,
      scores = _findMatches.scores;

  function formatSearchable() {
    return formatFields(fieldsToMap(fields));
  }

  function formatFields(fields) {
    fields.forEach(function (params, field) {
      fields.set(field, _objectSpread(_objectSpread({}, defaultParams), params));
    });
    return fields;
  }

  function fieldsToMap(fields) {
    if (fields instanceof Map) return fields;
    if (Array.isArray(fields)) return (0, _utils.arr2map)(fields);
    if (_typeof(fields) === 'object') return (0, _utils.obj2map)(fields);
    throw Error("Searchable fields must an Array, Object or Map, received ".concat(_typeof(fields)));
  }

  function scoreItem(expression, obj) {
    var rules = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : searchable;
    var matches = {};
    var hits = 0;

    var _iterator = _createForOfIteratorHelper(rules.entries()),
        _step;

    try {
      var _loop = function _loop() {
        var _step$value = _slicedToArray(_step.value, 2),
            field = _step$value[0],
            params = _step$value[1];

        var match_type = params.match_type,
            case_sensitive = params.case_sensitive,
            weight = params.weight;
        var words = expression.trim();

        switch (match_type) {
          case 'exact':
            break;

          case 'partial':
            if (words.indexOf(' ') !== -1) {
              words = words.split(' ').join('|');
            }

            break;

          default:
            throw new Error("Match type is incorrect (".concat(match_type, ")"));
        }

        field.split('.').reduce(function (prev, prop) {
          var _prop$match, _isCollection$match;

          var isCollection = (_prop$match = prop.match(/\w+\[\]/gm)) === null || _prop$match === void 0 ? void 0 : _prop$match.shift();
          var propName = isCollection ? (_isCollection$match = isCollection.match(/\w+/gm)) === null || _isCollection$match === void 0 ? void 0 : _isCollection$match.shift() : prop;

          if (prev instanceof Array) {
            matches[field] = prev.reduce(function (acc, nestedItem) {
              var rules = fieldsToMap(_defineProperty({}, propName, params));
              var nestedItemScore = scoreItem(expression, nestedItem, rules);
              acc.push(nestedItemScore);
              hits += nestedItemScore.hits;
              return acc;
            }, []);
          } else {
            var _obj$field;

            var patterns = new RegExp("".concat(words), "g".concat(case_sensitive ? '' : 'i'));
            matches[field] = (_obj$field = obj[field]) === null || _obj$field === void 0 ? void 0 : _obj$field.match(patterns);
            hits += matches[field] ? matches[field].length * weight : 0;
          }

          return (prev === null || prev === void 0 ? void 0 : prev[propName]) || prev;
        }, obj);
      };

      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        _loop();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return {
      matches: matches,
      hits: hits
    };
  }

  function findMatches() {
    var matches = [];
    var scores = new Map();

    if (!expression) {
      return {
        matches: Array.from(collection),
        scores: scores
      };
    }
    /* Compute scores and add items with matches to the result */


    scores = Array.from(collection).reduce(function (prev, item) {
      var itemScore = scoreItem(expression, item);

      if (itemScore.hits) {
        prev.set(item, itemScore);
        matches.push(item);
      }

      return prev;
    }, scores);
    /* Put most relevant matches first (most hits) */

    matches.sort(function (a, b) {
      var _scores$get, _scores$get2;

      var hits_a = (_scores$get = scores.get(a)) === null || _scores$get === void 0 ? void 0 : _scores$get.hits;
      var hits_b = (_scores$get2 = scores.get(b)) === null || _scores$get2 === void 0 ? void 0 : _scores$get2.hits;
      if (hits_a === hits_b) return 0;
      return hits_a < hits_b ? 1 : -1;
    });
    return {
      matches: matches,
      scores: scores
    };
  }

  function setFieldParams(field, newParams) {
    setFields(function (prevFields) {
      return _objectSpread(_objectSpread({}, prevFields), {}, _defineProperty({}, field, _objectSpread(_objectSpread({}, prevFields[field]), newParams)));
    });
  }

  function setFieldMatchType(field, matchType) {
    setFieldParams(field, {
      match_type: matchType
    });
  }

  function setFieldCaseSensivity(field, sensitivity) {
    setFieldParams(field, {
      case_sensitive: sensitivity
    });
  }

  function setFieldWeight(field, weight) {
    setFieldParams(field, {
      weight: parseInt(weight)
    });
  }

  var memoizedResult = (0, _react.useMemo)(function () {
    return {
      searchable: Object.entries(Object.fromEntries(searchable)),
      matches: matches,
      scores: scores,
      expression: expression,
      search: function search(keywords) {
        return _search(keywords.trim());
      },
      setFields: setFields,
      setFieldParams: setFieldParams,
      setFieldMatchType: setFieldMatchType,
      setFieldCaseSensivity: setFieldCaseSensivity,
      setFieldWeight: setFieldWeight,
      getHits: function getHits(item) {
        var _scores$get3;

        return (_scores$get3 = scores.get(item)) !== null && _scores$get3 !== void 0 ? _scores$get3 : {
          hits: 0,
          matches: []
        };
      }
    };
  }, [matches, scores, fields]);
  return memoizedResult;
}