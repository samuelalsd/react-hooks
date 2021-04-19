"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFormFields = exports.useFormField = void 0;

var _react = require("react");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * React Custom Hook to handle a form field state
 * 
 * @param {Mixed} initialValue
 * @returns A `[value, setValue]` pair based of React.useState()
 */
var useFormField = function useFormField() {
  var initialValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

  var _useState = (0, _react.useState)(initialValue),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  var onChange = (0, _react.useCallback)(function (e) {
    return setValue(e.target.value);
  }, []);
  return [value, onChange];
};
/**
 * React Custom Hook to handle multiple form fields states
 * 
 * @param {Object} initialValues 
 * @returns An object composed of following properties
 * 1. `formFields` contains all the fields and their respective value.
 * 2. `onChangeHandler` updates a single field value and takes a field name as unique argument.
 *    It then returns a Closure containing the field name (`key`).
 *    This closure accept an event as unique argument and, When called, will update the corresponding field.
 * 3. `setFormFields` enables user to override all fields at once.
 */


exports.useFormField = useFormField;

var useFormFields = function useFormFields(initialValues) {
  var _useState3 = (0, _react.useState)(initialValues),
      _useState4 = _slicedToArray(_useState3, 2),
      formFields = _useState4[0],
      setFormFields = _useState4[1];

  var onChangeHandler = function onChangeHandler(key) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'value';
    return function (e) {
      var value = type === 'file' ? e : e.target.value;
      setFormFields(function (prevState) {
        return _objectSpread(_objectSpread({}, prevState), {}, _defineProperty({}, key, value));
      });
    };
  };

  return {
    formFields: formFields,
    onChangeHandler: onChangeHandler,
    setFormFields: setFormFields
  };
};

exports.useFormFields = useFormFields;