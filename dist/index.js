#!/bin/sh
":"; //# comment; exec /usr/bin/env node "$0" "$@"
"use strict";

function _interopDefault(ex) {
	return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
}

var fs = _interopDefault(require("fs"));
var yaml = _interopDefault(require("js-yaml"));
var fetch = _interopDefault(require("node-fetch"));
var rimraf = _interopDefault(require("rimraf"));
var dotenv = _interopDefault(require("dotenv"));

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
	return new (P || (P = Promise))(function(resolve, reject) {
		function fulfilled(value) {
			try {
				step(generator.next(value));
			} catch (e) {
				reject(e);
			}
		}
		function rejected(value) {
			try {
				step(generator["throw"](value));
			} catch (e) {
				reject(e);
			}
		}
		function step(result) {
			result.done
				? resolve(result.value)
				: new P(function(resolve) {
						resolve(result.value);
				  }).then(fulfilled, rejected);
		}
		step((generator = generator.apply(thisArg, _arguments || [])).next());
	});
}

function __generator(thisArg, body) {
	var _ = {
			label: 0,
			sent: function() {
				if (t[0] & 1) throw t[1];
				return t[1];
			},
			trys: [],
			ops: []
		},
		f,
		y,
		t,
		g;
	return (
		(g = { next: verb(0), throw: verb(1), return: verb(2) }),
		typeof Symbol === "function" &&
			(g[Symbol.iterator] = function() {
				return this;
			}),
		g
	);
	function verb(n) {
		return function(v) {
			return step([n, v]);
		};
	}
	function step(op) {
		if (f) throw new TypeError("Generator is already executing.");
		while (_)
			try {
				if (
					((f = 1),
					y &&
						(t =
							op[0] & 2
								? y["return"]
								: op[0]
								? y["throw"] ||
								  ((t = y["return"]) && t.call(y), 0)
								: y.next) &&
						!(t = t.call(y, op[1])).done)
				)
					return t;
				if (((y = 0), t)) op = [op[0] & 2, t.value];
				switch (op[0]) {
					case 0:
					case 1:
						t = op;
						break;
					case 4:
						_.label++;
						return { value: op[1], done: false };
					case 5:
						_.label++;
						y = op[1];
						op = [0];
						continue;
					case 7:
						op = _.ops.pop();
						_.trys.pop();
						continue;
					default:
						if (
							!((t = _.trys),
							(t = t.length > 0 && t[t.length - 1])) &&
							(op[0] === 6 || op[0] === 2)
						) {
							_ = 0;
							continue;
						}
						if (
							op[0] === 3 &&
							(!t || (op[1] > t[0] && op[1] < t[3]))
						) {
							_.label = op[1];
							break;
						}
						if (op[0] === 6 && _.label < t[1]) {
							_.label = t[1];
							t = op;
							break;
						}
						if (t && _.label < t[2]) {
							_.label = t[2];
							_.ops.push(op);
							break;
						}
						if (t[2]) _.ops.pop();
						_.trys.pop();
						continue;
				}
				op = body.call(thisArg, _);
			} catch (e) {
				op = [6, e];
				y = 0;
			} finally {
				f = t = 0;
			}
		if (op[0] & 5) throw op[1];
		return { value: op[0] ? op[1] : void 0, done: true };
	}
}

var createFolder = function(directory) {
	if (!directory)
		throw new Error("No directory specified for createFolder()!");
	if (!fs.existsSync(directory)) fs.mkdirSync(directory);
};

var commonjsGlobal =
	typeof globalThis !== "undefined"
		? globalThis
		: typeof window !== "undefined"
		? window
		: typeof global !== "undefined"
		? global
		: typeof self !== "undefined"
		? self
		: {};

/** Detect free variable `global` from Node.js. */
var freeGlobal =
	typeof commonjsGlobal == "object" &&
	commonjsGlobal &&
	commonjsGlobal.Object === Object &&
	commonjsGlobal;

var _freeGlobal = freeGlobal;

/** Detect free variable `self`. */
var freeSelf =
	typeof self == "object" && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = _freeGlobal || freeSelf || Function("return this")();

var _root = root;

/** Built-in value references. */
var Symbol$1 = _root.Symbol;

var _Symbol = Symbol$1;

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
	var index = -1,
		length = array == null ? 0 : array.length,
		result = Array(length);

	while (++index < length) {
		result[index] = iteratee(array[index], index, array);
	}
	return result;
}

var _arrayMap = arrayMap;

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

var isArray_1 = isArray;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
	var isOwn = hasOwnProperty.call(value, symToStringTag),
		tag = value[symToStringTag];

	try {
		value[symToStringTag] = undefined;
		var unmasked = true;
	} catch (e) {}

	var result = nativeObjectToString.call(value);
	if (unmasked) {
		if (isOwn) {
			value[symToStringTag] = tag;
		} else {
			delete value[symToStringTag];
		}
	}
	return result;
}

var _getRawTag = getRawTag;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
	return nativeObjectToString$1.call(value);
}

var _objectToString = objectToString;

/** `Object#toString` result references. */
var nullTag = "[object Null]",
	undefinedTag = "[object Undefined]";

/** Built-in value references. */
var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
	if (value == null) {
		return value === undefined ? undefinedTag : nullTag;
	}
	return symToStringTag$1 && symToStringTag$1 in Object(value)
		? _getRawTag(value)
		: _objectToString(value);
}

var _baseGetTag = baseGetTag;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
	return value != null && typeof value == "object";
}

var isObjectLike_1 = isObjectLike;

/** `Object#toString` result references. */
var symbolTag = "[object Symbol]";

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
	return (
		typeof value == "symbol" ||
		(isObjectLike_1(value) && _baseGetTag(value) == symbolTag)
	);
}

var isSymbol_1 = isSymbol;

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = _Symbol ? _Symbol.prototype : undefined,
	symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
	// Exit early for strings to avoid a performance hit in some environments.
	if (typeof value == "string") {
		return value;
	}
	if (isArray_1(value)) {
		// Recursively convert values (susceptible to call stack limits).
		return _arrayMap(value, baseToString) + "";
	}
	if (isSymbol_1(value)) {
		return symbolToString ? symbolToString.call(value) : "";
	}
	var result = value + "";
	return result == "0" && 1 / value == -INFINITY ? "-0" : result;
}

var _baseToString = baseToString;

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
	return value == null ? "" : _baseToString(value);
}

var toString_1 = toString;

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
	var index = -1,
		length = array.length;

	if (start < 0) {
		start = -start > length ? 0 : length + start;
	}
	end = end > length ? length : end;
	if (end < 0) {
		end += length;
	}
	length = start > end ? 0 : (end - start) >>> 0;
	start >>>= 0;

	var result = Array(length);
	while (++index < length) {
		result[index] = array[index + start];
	}
	return result;
}

var _baseSlice = baseSlice;

/**
 * Casts `array` to a slice if it's needed.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {number} start The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the cast slice.
 */
function castSlice(array, start, end) {
	var length = array.length;
	end = end === undefined ? length : end;
	return !start && end >= length ? array : _baseSlice(array, start, end);
}

var _castSlice = castSlice;

/** Used to compose unicode character classes. */
var rsAstralRange = "\\ud800-\\udfff",
	rsComboMarksRange = "\\u0300-\\u036f",
	reComboHalfMarksRange = "\\ufe20-\\ufe2f",
	rsComboSymbolsRange = "\\u20d0-\\u20ff",
	rsComboRange =
		rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
	rsVarRange = "\\ufe0e\\ufe0f";

/** Used to compose unicode capture groups. */
var rsZWJ = "\\u200d";

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
var reHasUnicode = RegExp(
	"[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]"
);

/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */
function hasUnicode(string) {
	return reHasUnicode.test(string);
}

var _hasUnicode = hasUnicode;

/**
 * Converts an ASCII `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function asciiToArray(string) {
	return string.split("");
}

var _asciiToArray = asciiToArray;

/** Used to compose unicode character classes. */
var rsAstralRange$1 = "\\ud800-\\udfff",
	rsComboMarksRange$1 = "\\u0300-\\u036f",
	reComboHalfMarksRange$1 = "\\ufe20-\\ufe2f",
	rsComboSymbolsRange$1 = "\\u20d0-\\u20ff",
	rsComboRange$1 =
		rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1,
	rsVarRange$1 = "\\ufe0e\\ufe0f";

/** Used to compose unicode capture groups. */
var rsAstral = "[" + rsAstralRange$1 + "]",
	rsCombo = "[" + rsComboRange$1 + "]",
	rsFitz = "\\ud83c[\\udffb-\\udfff]",
	rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")",
	rsNonAstral = "[^" + rsAstralRange$1 + "]",
	rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}",
	rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]",
	rsZWJ$1 = "\\u200d";

/** Used to compose unicode regexes. */
var reOptMod = rsModifier + "?",
	rsOptVar = "[" + rsVarRange$1 + "]?",
	rsOptJoin =
		"(?:" +
		rsZWJ$1 +
		"(?:" +
		[rsNonAstral, rsRegional, rsSurrPair].join("|") +
		")" +
		rsOptVar +
		reOptMod +
		")*",
	rsSeq = rsOptVar + reOptMod + rsOptJoin,
	rsSymbol =
		"(?:" +
		[
			rsNonAstral + rsCombo + "?",
			rsCombo,
			rsRegional,
			rsSurrPair,
			rsAstral
		].join("|") +
		")";

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");

/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function unicodeToArray(string) {
	return string.match(reUnicode) || [];
}

var _unicodeToArray = unicodeToArray;

/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function stringToArray(string) {
	return _hasUnicode(string)
		? _unicodeToArray(string)
		: _asciiToArray(string);
}

var _stringToArray = stringToArray;

/**
 * Creates a function like `_.lowerFirst`.
 *
 * @private
 * @param {string} methodName The name of the `String` case method to use.
 * @returns {Function} Returns the new case function.
 */
function createCaseFirst(methodName) {
	return function(string) {
		string = toString_1(string);

		var strSymbols = _hasUnicode(string)
			? _stringToArray(string)
			: undefined;

		var chr = strSymbols ? strSymbols[0] : string.charAt(0);

		var trailing = strSymbols
			? _castSlice(strSymbols, 1).join("")
			: string.slice(1);

		return chr[methodName]() + trailing;
	};
}

var _createCaseFirst = createCaseFirst;

/**
 * Converts the first character of `string` to upper case.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.upperFirst('fred');
 * // => 'Fred'
 *
 * _.upperFirst('FRED');
 * // => 'FRED'
 */
var upperFirst = _createCaseFirst("toUpperCase");

var upperFirst_1 = upperFirst;

/**
 * Converts the first character of `string` to upper case and the remaining
 * to lower case.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to capitalize.
 * @returns {string} Returns the capitalized string.
 * @example
 *
 * _.capitalize('FRED');
 * // => 'Fred'
 */
function capitalize(string) {
	return upperFirst_1(toString_1(string).toLowerCase());
}

var capitalize_1 = capitalize;

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
	var index = -1,
		length = array == null ? 0 : array.length;

	if (initAccum && length) {
		accumulator = array[++index];
	}
	while (++index < length) {
		accumulator = iteratee(accumulator, array[index], index, array);
	}
	return accumulator;
}

var _arrayReduce = arrayReduce;

/**
 * The base implementation of `_.propertyOf` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyOf(object) {
	return function(key) {
		return object == null ? undefined : object[key];
	};
}

var _basePropertyOf = basePropertyOf;

/** Used to map Latin Unicode letters to basic Latin letters. */
var deburredLetters = {
	// Latin-1 Supplement block.
	À: "A",
	Á: "A",
	Â: "A",
	Ã: "A",
	Ä: "A",
	Å: "A",
	à: "a",
	á: "a",
	â: "a",
	ã: "a",
	ä: "a",
	å: "a",
	Ç: "C",
	ç: "c",
	Ð: "D",
	ð: "d",
	È: "E",
	É: "E",
	Ê: "E",
	Ë: "E",
	è: "e",
	é: "e",
	ê: "e",
	ë: "e",
	Ì: "I",
	Í: "I",
	Î: "I",
	Ï: "I",
	ì: "i",
	í: "i",
	î: "i",
	ï: "i",
	Ñ: "N",
	ñ: "n",
	Ò: "O",
	Ó: "O",
	Ô: "O",
	Õ: "O",
	Ö: "O",
	Ø: "O",
	ò: "o",
	ó: "o",
	ô: "o",
	õ: "o",
	ö: "o",
	ø: "o",
	Ù: "U",
	Ú: "U",
	Û: "U",
	Ü: "U",
	ù: "u",
	ú: "u",
	û: "u",
	ü: "u",
	Ý: "Y",
	ý: "y",
	ÿ: "y",
	Æ: "Ae",
	æ: "ae",
	Þ: "Th",
	þ: "th",
	ß: "ss",
	// Latin Extended-A block.
	Ā: "A",
	Ă: "A",
	Ą: "A",
	ā: "a",
	ă: "a",
	ą: "a",
	Ć: "C",
	Ĉ: "C",
	Ċ: "C",
	Č: "C",
	ć: "c",
	ĉ: "c",
	ċ: "c",
	č: "c",
	Ď: "D",
	Đ: "D",
	ď: "d",
	đ: "d",
	Ē: "E",
	Ĕ: "E",
	Ė: "E",
	Ę: "E",
	Ě: "E",
	ē: "e",
	ĕ: "e",
	ė: "e",
	ę: "e",
	ě: "e",
	Ĝ: "G",
	Ğ: "G",
	Ġ: "G",
	Ģ: "G",
	ĝ: "g",
	ğ: "g",
	ġ: "g",
	ģ: "g",
	Ĥ: "H",
	Ħ: "H",
	ĥ: "h",
	ħ: "h",
	Ĩ: "I",
	Ī: "I",
	Ĭ: "I",
	Į: "I",
	İ: "I",
	ĩ: "i",
	ī: "i",
	ĭ: "i",
	į: "i",
	ı: "i",
	Ĵ: "J",
	ĵ: "j",
	Ķ: "K",
	ķ: "k",
	ĸ: "k",
	Ĺ: "L",
	Ļ: "L",
	Ľ: "L",
	Ŀ: "L",
	Ł: "L",
	ĺ: "l",
	ļ: "l",
	ľ: "l",
	ŀ: "l",
	ł: "l",
	Ń: "N",
	Ņ: "N",
	Ň: "N",
	Ŋ: "N",
	ń: "n",
	ņ: "n",
	ň: "n",
	ŋ: "n",
	Ō: "O",
	Ŏ: "O",
	Ő: "O",
	ō: "o",
	ŏ: "o",
	ő: "o",
	Ŕ: "R",
	Ŗ: "R",
	Ř: "R",
	ŕ: "r",
	ŗ: "r",
	ř: "r",
	Ś: "S",
	Ŝ: "S",
	Ş: "S",
	Š: "S",
	ś: "s",
	ŝ: "s",
	ş: "s",
	š: "s",
	Ţ: "T",
	Ť: "T",
	Ŧ: "T",
	ţ: "t",
	ť: "t",
	ŧ: "t",
	Ũ: "U",
	Ū: "U",
	Ŭ: "U",
	Ů: "U",
	Ű: "U",
	Ų: "U",
	ũ: "u",
	ū: "u",
	ŭ: "u",
	ů: "u",
	ű: "u",
	ų: "u",
	Ŵ: "W",
	ŵ: "w",
	Ŷ: "Y",
	ŷ: "y",
	Ÿ: "Y",
	Ź: "Z",
	Ż: "Z",
	Ž: "Z",
	ź: "z",
	ż: "z",
	ž: "z",
	Ĳ: "IJ",
	ĳ: "ij",
	Œ: "Oe",
	œ: "oe",
	ŉ: "'n",
	ſ: "s"
};

/**
 * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
 * letters to basic Latin letters.
 *
 * @private
 * @param {string} letter The matched letter to deburr.
 * @returns {string} Returns the deburred letter.
 */
var deburrLetter = _basePropertyOf(deburredLetters);

var _deburrLetter = deburrLetter;

/** Used to match Latin Unicode letters (excluding mathematical operators). */
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

/** Used to compose unicode character classes. */
var rsComboMarksRange$2 = "\\u0300-\\u036f",
	reComboHalfMarksRange$2 = "\\ufe20-\\ufe2f",
	rsComboSymbolsRange$2 = "\\u20d0-\\u20ff",
	rsComboRange$2 =
		rsComboMarksRange$2 + reComboHalfMarksRange$2 + rsComboSymbolsRange$2;

/** Used to compose unicode capture groups. */
var rsCombo$1 = "[" + rsComboRange$2 + "]";

/**
 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
 */
var reComboMark = RegExp(rsCombo$1, "g");

/**
 * Deburrs `string` by converting
 * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
 * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
 * letters to basic Latin letters and removing
 * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to deburr.
 * @returns {string} Returns the deburred string.
 * @example
 *
 * _.deburr('déjà vu');
 * // => 'deja vu'
 */
function deburr(string) {
	string = toString_1(string);
	return (
		string &&
		string.replace(reLatin, _deburrLetter).replace(reComboMark, "")
	);
}

var deburr_1 = deburr;

/** Used to match words composed of alphanumeric characters. */
var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

/**
 * Splits an ASCII `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function asciiWords(string) {
	return string.match(reAsciiWord) || [];
}

var _asciiWords = asciiWords;

/** Used to detect strings that need a more robust regexp to match words. */
var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

/**
 * Checks if `string` contains a word composed of Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a word is found, else `false`.
 */
function hasUnicodeWord(string) {
	return reHasUnicodeWord.test(string);
}

var _hasUnicodeWord = hasUnicodeWord;

/** Used to compose unicode character classes. */
var rsAstralRange$2 = "\\ud800-\\udfff",
	rsComboMarksRange$3 = "\\u0300-\\u036f",
	reComboHalfMarksRange$3 = "\\ufe20-\\ufe2f",
	rsComboSymbolsRange$3 = "\\u20d0-\\u20ff",
	rsComboRange$3 =
		rsComboMarksRange$3 + reComboHalfMarksRange$3 + rsComboSymbolsRange$3,
	rsDingbatRange = "\\u2700-\\u27bf",
	rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff",
	rsMathOpRange = "\\xac\\xb1\\xd7\\xf7",
	rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf",
	rsPunctuationRange = "\\u2000-\\u206f",
	rsSpaceRange =
		" \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",
	rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde",
	rsVarRange$2 = "\\ufe0e\\ufe0f",
	rsBreakRange =
		rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

/** Used to compose unicode capture groups. */
var rsApos = "['\u2019]",
	rsBreak = "[" + rsBreakRange + "]",
	rsCombo$2 = "[" + rsComboRange$3 + "]",
	rsDigits = "\\d+",
	rsDingbat = "[" + rsDingbatRange + "]",
	rsLower = "[" + rsLowerRange + "]",
	rsMisc =
		"[^" +
		rsAstralRange$2 +
		rsBreakRange +
		rsDigits +
		rsDingbatRange +
		rsLowerRange +
		rsUpperRange +
		"]",
	rsFitz$1 = "\\ud83c[\\udffb-\\udfff]",
	rsModifier$1 = "(?:" + rsCombo$2 + "|" + rsFitz$1 + ")",
	rsNonAstral$1 = "[^" + rsAstralRange$2 + "]",
	rsRegional$1 = "(?:\\ud83c[\\udde6-\\uddff]){2}",
	rsSurrPair$1 = "[\\ud800-\\udbff][\\udc00-\\udfff]",
	rsUpper = "[" + rsUpperRange + "]",
	rsZWJ$2 = "\\u200d";

/** Used to compose unicode regexes. */
var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")",
	rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")",
	rsOptContrLower = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?",
	rsOptContrUpper = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?",
	reOptMod$1 = rsModifier$1 + "?",
	rsOptVar$1 = "[" + rsVarRange$2 + "]?",
	rsOptJoin$1 =
		"(?:" +
		rsZWJ$2 +
		"(?:" +
		[rsNonAstral$1, rsRegional$1, rsSurrPair$1].join("|") +
		")" +
		rsOptVar$1 +
		reOptMod$1 +
		")*",
	rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",
	rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])",
	rsSeq$1 = rsOptVar$1 + reOptMod$1 + rsOptJoin$1,
	rsEmoji =
		"(?:" +
		[rsDingbat, rsRegional$1, rsSurrPair$1].join("|") +
		")" +
		rsSeq$1;

/** Used to match complex or compound words. */
var reUnicodeWord = RegExp(
	[
		rsUpper +
			"?" +
			rsLower +
			"+" +
			rsOptContrLower +
			"(?=" +
			[rsBreak, rsUpper, "$"].join("|") +
			")",
		rsMiscUpper +
			"+" +
			rsOptContrUpper +
			"(?=" +
			[rsBreak, rsUpper + rsMiscLower, "$"].join("|") +
			")",
		rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
		rsUpper + "+" + rsOptContrUpper,
		rsOrdUpper,
		rsOrdLower,
		rsDigits,
		rsEmoji
	].join("|"),
	"g"
);

/**
 * Splits a Unicode `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function unicodeWords(string) {
	return string.match(reUnicodeWord) || [];
}

var _unicodeWords = unicodeWords;

/**
 * Splits `string` into an array of its words.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {RegExp|string} [pattern] The pattern to match words.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the words of `string`.
 * @example
 *
 * _.words('fred, barney, & pebbles');
 * // => ['fred', 'barney', 'pebbles']
 *
 * _.words('fred, barney, & pebbles', /[^, ]+/g);
 * // => ['fred', 'barney', '&', 'pebbles']
 */
function words(string, pattern, guard) {
	string = toString_1(string);
	pattern = guard ? undefined : pattern;

	if (pattern === undefined) {
		return _hasUnicodeWord(string)
			? _unicodeWords(string)
			: _asciiWords(string);
	}
	return string.match(pattern) || [];
}

var words_1 = words;

/** Used to compose unicode capture groups. */
var rsApos$1 = "['\u2019]";

/** Used to match apostrophes. */
var reApos = RegExp(rsApos$1, "g");

/**
 * Creates a function like `_.camelCase`.
 *
 * @private
 * @param {Function} callback The function to combine each word.
 * @returns {Function} Returns the new compounder function.
 */
function createCompounder(callback) {
	return function(string) {
		return _arrayReduce(
			words_1(deburr_1(string).replace(reApos, "")),
			callback,
			""
		);
	};
}

var _createCompounder = createCompounder;

/**
 * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the camel cased string.
 * @example
 *
 * _.camelCase('Foo Bar');
 * // => 'fooBar'
 *
 * _.camelCase('--foo-bar--');
 * // => 'fooBar'
 *
 * _.camelCase('__FOO_BAR__');
 * // => 'fooBar'
 */
var camelCase = _createCompounder(function(result, word, index) {
	word = word.toLowerCase();
	return result + (index ? capitalize_1(word) : word);
});

var camelCase_1 = camelCase;

/**
 * Converts `string` to
 * [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the kebab cased string.
 * @example
 *
 * _.kebabCase('Foo Bar');
 * // => 'foo-bar'
 *
 * _.kebabCase('fooBar');
 * // => 'foo-bar'
 *
 * _.kebabCase('__FOO_BAR__');
 * // => 'foo-bar'
 */
var kebabCase = _createCompounder(function(result, word, index) {
	return result + (index ? "-" : "") + word.toLowerCase();
});

var kebabCase_1 = kebabCase;

var writeFile = function(file, path, name, isToken, format) {
	if (isToken === void 0) {
		isToken = false;
	}
	if (format === void 0) {
		format = "js";
	}
	if (!file || !path || !name)
		throw new Error(
			"Missing required parameters to correctly run writeFile()!"
		);
	createFolder(path);
	write(file, path, name, isToken, format);
};
var write = function(file, path, name, isToken, format) {
	var fileContent = file;
	var filePath = path + "/" + kebabCase_1(name);
	if (isToken) {
		if (format === "yml" || format === "yaml") {
			fileContent = yaml.dump(file);
		} else {
			var camelCaseName = camelCase_1(name);
			fileContent =
				"const " +
				camelCaseName +
				" = " +
				JSON.stringify(file, null, " ") +
				"\n\nexport default " +
				camelCaseName +
				";";
		}
		filePath += "." + format;
	}
	fs.writeFile(filePath, fileContent, "utf-8", function(error) {
		if (error) throw new Error("Error in write() > writeFile(): " + error);
	});
	if (typeof file === "object") {
		fs.writeFile(
			filePath.replace("." + format, ".d.ts"),
			"export default " +
				camelCase_1(name) +
				";\ndeclare const " +
				camelCase_1(name) +
				': {\n\t"' +
				Object.keys(file).join('": string;\n	"') +
				'": string;\n};\n',
			"utf-8",
			function(error) {
				if (error)
					throw new Error(
						"Error in write TypeScript .d.ts file: " + error
					);
			}
		);
	}
};

var getFromApi = function() {
	return __awaiter(void 0, void 0, void 0, function() {
		var data, url;
		return __generator(this, function(_a) {
			switch (_a.label) {
				case 0:
					data = {};
					url =
						"https://api.figma.com/v1/files/" +
						process.env.FIGMA_URL;
					return [
						4 /*yield*/,
						fetch(url, {
							headers: {
								"X-Figma-Token": process.env.FIGMA_TOKEN
							}
						})
							.catch(function(error) {
								throw new Error("Figma Error: " + error);
							})
							.then(function(response) {
								return response.json();
							})
							.then(function(json) {
								if (json.err)
									throw new Error(
										"Figma Error: " +
											json.status +
											" - " +
											json.err
									);
								data = json;
								writeFile(
									JSON.stringify(json, undefined, 2),
									"figma",
									"figma.json"
								);
							})
					];
				case 1:
					_a.sent();
					return [2 /*return*/, data];
			}
		});
	});
};

var createPage = function(figmaPages) {
	var _a, _b;
	if (!figmaPages || !figmaPages.length)
		throw new Error("No pages provided to createPage()!");
	var targetPage =
		((_b =
			(_a = process.env.FIGMA_PAGE) === null || _a === void 0
				? void 0
				: _a
						.trim()
						.toLowerCase()
						.replace(" ", "")),
		_b !== null && _b !== void 0 ? _b : "designtokens");
	var correctPage;
	for (
		var _i = 0, figmaPages_1 = figmaPages;
		_i < figmaPages_1.length;
		_i++
	) {
		var page = figmaPages_1[_i];
		var fixedPageName = page.name.toLowerCase().replace(" ", "");
		if (fixedPageName === targetPage) {
			correctPage = page;
			break;
		}
	}
	return correctPage;
};

var roundToDecimal = function(value, decimals) {
	if (!value) throw new Error("No number value provided to roundNumber()!");
	if (!decimals) decimals = 0;
	return Number(Math.round(Number(value + "e" + decimals)) + "e-" + decimals);
};

var setupColorTokens = function(frame) {
	if (!frame) throw new Error("No frame for setupColorTokens()!");
	if (!frame.children || !frame.children.length)
		throw new Error('The frame "' + frame.name + "\" don't have children!");
	var colors = {};
	for (var _i = 0, _a = frame.children; _i < _a.length; _i++) {
		var color = _a[_i];
		var colorR = Math.round(color.fills[0].color.r * 255);
		var colorG = Math.round(color.fills[0].color.g * 255);
		var colorB = Math.round(color.fills[0].color.b * 255);
		var colorA = roundToDecimal(color.fills[0].color.a * 1, 3);
		var token =
			"rgba(" +
			colorR +
			", " +
			colorG +
			", " +
			colorB +
			", " +
			colorA +
			")";
		var name_1 = kebabCase_1(color.name);
		colors[name_1] = token;
	}
	return colors;
};

var SIZES_PX = 1;
var SIZES_REM = 16;

var normalizeUnits = function(value, currentUnit, newUnit) {
	if (!value || !currentUnit || !newUnit)
		throw new Error("Missing parameters for normalizeUnits()!");
	var rootSize;
	var unitSize;
	if (currentUnit === "px") rootSize = SIZES_PX;
	if (currentUnit === "percent") rootSize = SIZES_PX;
	if (newUnit === "rem" || newUnit === "em") unitSize = SIZES_REM;
	if (newUnit === "unitless") unitSize = value / 100;
	if (rootSize && unitSize) {
		if (newUnit === "unitless") return String(unitSize);
		var adjustedValue = value * (rootSize / unitSize);
		return "" + adjustedValue + newUnit;
	}
	throw new Error(
		"normalizeUnits(): rootSize and/or unitSize variables are either undefined or not incoming as px values."
	);
};

var setupSpacingTokens = function(frame) {
	if (!frame) throw new Error("No frame for setupSpacingTokens()!");
	if (!frame.children || !frame.children.length)
		throw new Error('The frame "' + frame.name + "\" don't have children!");
	var spacings = {};
	for (var _i = 0, _a = frame.children; _i < _a.length; _i++) {
		var spacing = _a[_i];
		var token = normalizeUnits(
			spacing.absoluteBoundingBox.width,
			"px",
			"rem"
		);
		var name_1 = kebabCase_1(spacing.name);
		spacings[name_1] = token;
	}
	return spacings;
};

var setupFontTokens = function(frame) {
	if (!frame) throw new Error("No frame for setupFontTokens()!");
	if (!frame.children || !frame.children.length)
		throw new Error('The frame "' + frame.name + "\" don't have children!");
	var fonts = {};
	for (var _i = 0, _a = frame.children; _i < _a.length; _i++) {
		var font = _a[_i];
		var token = {
			name: font.style.fontFamily,
			"post-script": font.style.fontPostScriptName
		};
		var name_1 = kebabCase_1(font.name);
		fonts[name_1] = token;
	}
	return fonts;
};

var setupFontSizeTokens = function(frame) {
	if (!frame) throw new Error("No frame for setupFontSizeTokens()!");
	if (!frame.children || !frame.children.length)
		throw new Error('The frame "' + frame.name + "\" don't have children!");
	var fontSizes = {};
	for (var _i = 0, _a = frame.children; _i < _a.length; _i++) {
		var fontSize = _a[_i];
		var token = normalizeUnits(fontSize.style.fontSize, "px", "rem");
		var name_1 = kebabCase_1(fontSize.name);
		fontSizes[name_1] = token;
	}
	return fontSizes;
};

var setupFontWeightTokens = function(frame) {
	if (!frame) throw new Error("No frame for setupFontWeightTokens()!");
	if (!frame.children || !frame.children.length)
		throw new Error('The frame "' + frame.name + "\" don't have children!");
	var fontWeights = {};
	for (var _i = 0, _a = frame.children; _i < _a.length; _i++) {
		var fontWeight = _a[_i];
		var token = fontWeight.style.fontWeight;
		var name_1 = kebabCase_1(fontWeight.name);
		fontWeights[name_1] = token;
	}
	return fontWeights;
};

var setupLineHeightTokens = function(frame) {
	if (!frame) throw new Error("No frame for setupLineHeightTokens()!");
	if (!frame.children || !frame.children.length)
		throw new Error('The frame "' + frame.name + "\" don't have children!");
	var lineHeights = {};
	for (var _i = 0, _a = frame.children; _i < _a.length; _i++) {
		var lineHeight = _a[_i];
		var token = normalizeUnits(lineHeight.style.lineHeightPx, "px", "rem");
		var name_1 = kebabCase_1(lineHeight.name);
		lineHeights[name_1] = token;
	}
	return lineHeights;
};

var setupRadiusTokens = function(frame) {
	if (!frame) throw new Error("No frame for setupRadiusTokens()!");
	if (!frame.children || !frame.children.length)
		throw new Error('The frame "' + frame.name + "\" don't have children!");
	var radii = {};
	for (var _i = 0, _a = frame.children; _i < _a.length; _i++) {
		var radius = _a[_i];
		var token = radius.cornerRadius + "px";
		var name_1 = kebabCase_1(radius.name);
		radii[name_1] = token;
	}
	return radii;
};

var setupBorderTokens = function(frame) {
	if (!frame) throw new Error("No frame for setupBorderTokens()!");
	if (!frame.children || !frame.children.length)
		throw new Error('The frame "' + frame.name + "\" don't have children!");
	var borders = {};
	for (var _i = 0, _a = frame.children; _i < _a.length; _i++) {
		var border = _a[_i];
		var token = border.strokeWeight + "px " + border.strokes[0].type;
		var name_1 = kebabCase_1(border.name);
		borders[name_1] = token;
	}
	return borders;
};

var setupShadowTokens = function(frame) {
	if (!frame) throw new Error("No frame for setupShadowTokens()!");
	if (!frame.children || !frame.children.length)
		throw new Error('The frame "' + frame.name + "\" don't have children!");
	var shadows = {};
	for (var _i = 0, _a = frame.children; _i < _a.length; _i++) {
		var shadow = _a[_i];
		var shadowOffsetX = shadow.effects[0].offset.x + "px ";
		var shadowOffsetY = shadow.effects[0].offset.y + "px ";
		var shadowRadius = shadow.effects[0].radius + "px ";
		var shadowColorR = Math.round(shadow.effects[0].color.r * 255);
		var shadowColorG = Math.round(shadow.effects[0].color.g * 255);
		var shadowColorB = Math.round(shadow.effects[0].color.b * 255);
		var shadowColorA = roundToDecimal(shadow.effects[0].color.a * 1, 3);
		var shadowColor =
			"rgba(" +
			shadowColorR +
			", " +
			shadowColorG +
			", " +
			shadowColorB +
			", " +
			shadowColorA +
			")";
		var token = shadowOffsetX + shadowOffsetY + shadowRadius + shadowColor;
		var name_1 = kebabCase_1(shadow.name);
		shadows[name_1] = token;
	}
	return shadows;
};

var setupAnimationTokens = function(frame) {
	if (!frame) throw new Error("No frame for setupAnimationTokens()!");
	if (!frame.children || !frame.children.length)
		throw Error('The frame "' + frame.name + "\" don't have children!");
	var animations = {};
	for (var _i = 0, _a = frame.children; _i < _a.length; _i++) {
		var animation = _a[_i];
		var token = animation.absoluteBoundingBox.width + "ms";
		var name_1 = kebabCase_1(animation.name);
		animations[name_1] = token;
	}
	return animations;
};

var processTokens = function(sheet, name) {
	if (!sheet || !name)
		throw new Error("No sheet or name for processTokens()!");
	var loweredName = name.toLowerCase();
	try {
		switch (true) {
			case !!loweredName.match("animations?"):
				return setupAnimationTokens(sheet);
			case !!loweredName.match("borders?"):
				return setupBorderTokens(sheet);
			case !!loweredName.match("colou?rs?"):
				return setupColorTokens(sheet);
			case !!loweredName.match("fontsizes?"):
				return setupFontSizeTokens(sheet);
			case !!loweredName.match("fontfamil(y|ies)"):
				return setupFontTokens(sheet);
			case !!loweredName.match("fontweights?"):
				return setupFontWeightTokens(sheet);
			case !!loweredName.match("(font)?lineheights?"):
				return setupLineHeightTokens(sheet);
			case !!loweredName.match("radi(i|us)"):
				return setupRadiusTokens(sheet);
			case !!loweredName.match("shadows?"):
				return setupShadowTokens(sheet);
			case !!loweredName.match("spac(e|ings?)"):
				return setupSpacingTokens(sheet);
		}
	} catch (error) {
		console.error(error);
	}
};

var writeTokens = function(tokens, format) {
	if (!tokens || !tokens.length)
		throw new Error("Less than one token provided to writeTokens()!");
	for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
		var token = tokens_1[_i];
		var processedToken = processTokens(token, token.name);
		if (processedToken)
			writeFile(processedToken, "tokens", token.name, true, format);
	}
};

var _a, _b;
dotenv.config();
var _c = process.argv,
	args = _c.slice(2);
var format =
	((_b =
		(_a = args[0]) === null || _a === void 0 ? void 0 : _a.toLowerCase()),
	_b !== null && _b !== void 0 ? _b : "js");
(function() {
	return __awaiter(void 0, void 0, void 0, function() {
		var data, tokens;
		return __generator(this, function(_a) {
			switch (_a.label) {
				case 0:
					rimraf("./tokens", function() {});
					rimraf("./figma", function() {});
					createFolder("tokens");
					createFolder("figma");
					return [4 /*yield*/, getFromApi()];
				case 1:
					data = _a.sent();
					tokens = createPage(data.document.children);
					writeTokens(tokens.children, format);
					return [2 /*return*/];
			}
		});
	});
})();
