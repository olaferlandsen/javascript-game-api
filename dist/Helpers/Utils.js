var Game;
(function (Game) {
    var Helpers;
    (function (Helpers) {
        var Utils = /** @class */ (function () {
            function Utils() {
            }
            Utils.getType = function (value) {
                return typeof value;
            };
            Utils.isFunction = function (value) {
                return typeof value === 'function';
            };
            Utils.isObject = function (value) {
                return null != value && toString.call(value) === '[object Object]';
            };
            Utils.isArray = function (value) {
                if (Array.isArray)
                    return Array.isArray(value);
                return value instanceof Array;
            };
            Utils.isEmpty = function (value) {
                if (Utils.isNull(value) || Utils.isUndefined(value))
                    return true;
                else if (Utils.isArray(value) || Utils.isString(value))
                    return value.length === 0;
                else if (Utils.isObject(value))
                    return Object.keys(value).length === 0;
                else if (Utils.isNumber(value))
                    return value === 0;
                return false;
            };
            Utils.isEmptyObject = function (value) {
                return Utils.isObject(value) && Object.keys(value).length === 0 || value === null;
            };
            Utils.isString = function (value) {
                return typeof value === 'string';
            };
            Utils.isInteger = function (value) {
                return typeof value === 'number' && Number(value) === value && value % 1 === 0;
            };
            Utils.isFloat = function (value) {
                return typeof value === 'number' && Number(value) === value && value % 1 !== 0;
            };
            Utils.isNumber = function (value) {
                return Utils.isInteger(value) || Utils.isFloat(value);
            };
            Utils.isTrue = function (value) {
                return value === true || value === 1;
            };
            Utils.isFalse = function (value) {
                return value === false || value === 0;
            };
            Utils.isRegExp = function (value) {
                return value instanceof RegExp;
            };
            Utils.isDate = function (value) {
                return value instanceof Date;
            };
            Utils.isNull = function (value) {
                return value === null;
            };
            Utils.isUndefined = function (value) {
                return typeof value === 'undefined';
            };
            Utils.forEach = function (value, callback) {
                if (Utils.isArray(value)) {
                    for (var index = 0; index < value.length; index++) {
                        var item = value[index];
                        callback.call({}, item, index);
                    }
                }
                else if (Utils.isObject(value)) {
                    for (var property in value) {
                        if (value.hasOwnProperty(property)) {
                            callback.call({}, value[property], property);
                        }
                    }
                }
            };
            Utils.random = function (value, max) {
                if (Utils.isArray(value)) {
                    return value[Math.floor(Math.random() * value.length)];
                }
                else if (Utils.isNumber(value)) {
                    if (!Utils.isNumber(max)) {
                        max = value + Math.floor(Math.random() * value);
                    }
                    return Math.floor(Math.random() * max) + value;
                }
            };
            Utils.randomArbitrary = function (min, max) {
                return Math.random() * (max - min) + min;
            };
            Utils.randomBetweenPercentageOf = function (value, percentage) {
                if (percentage > 0)
                    percentage = Math.abs(-0.1 * Math.max(Math.min(percentage, 100), 0));
                var from;
                var to;
                var a = value * percentage;
                var b = value * percentage;
                if (a > b) {
                    from = b;
                    to = a;
                }
                else if (b > a) {
                    from = a;
                    to = b;
                }
                if (from == to)
                    return from;
                else
                    return Utils.randomArbitrary(from, to);
            };
            Utils.hasOwnProperty = function (properties, object) {
                if (!this.isObject(object))
                    throw new Error('Helpers:hasOwnProperty: only accept object');
                if (this.isArray(properties)) {
                    for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
                        var property = properties_1[_i];
                        if (!object.hasOwnProperty(property))
                            return false;
                    }
                    return true;
                }
                else if (Utils.isString(properties)) {
                    return object.hasOwnProperty(properties);
                }
            };
            return Utils;
        }());
        Helpers.Utils = Utils;
    })(Helpers = Game.Helpers || (Game.Helpers = {}));
})(Game || (Game = {}));
