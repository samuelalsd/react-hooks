"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arr2map = arr2map;
exports.obj2map = obj2map;
exports.arr2set = arr2set;
exports.obj2set = obj2set;
exports.nestedFromStringIndex = nestedFromStringIndex;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function arr2map(arr) {
  return arr.reduce(function (prev, current) {
    prev.set(current, {});
    return prev;
  }, new Map());
}

function obj2map(obj) {
  if (!(obj instanceof Object)) throw Error("obj2map() expects an object as argument, received ".concat(typeof fields === "undefined" ? "undefined" : _typeof(fields)));
  return new Map(Object.entries(obj));
}

function arr2set(arr) {
  return arr.reduce(function (prev, current) {
    prev.add(current, {});
    return prev;
  }, new Set());
}

function obj2set(obj) {
  if (!(obj instanceof Object)) throw Error("obj2set() expects an object as argument, received ".concat(typeof fields === "undefined" ? "undefined" : _typeof(fields)));
  return new Set(Object.entries(obj));
}

function nestedFromStringIndex(index, obj) {
  return index.split(".").reduce(function (prev, current, i, arr) {
    if (!(current in prev)) {
      arr.splice(1);
      return undefined;
    }

    return prev[current];
  }, obj);
}