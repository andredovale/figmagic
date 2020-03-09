#! /usr/bin/env node
"use strict";

function _interopDefault(ex) {
	return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
}

var rimraf = _interopDefault(require("rimraf"));
var fetch = _interopDefault(require("node-fetch"));
var dotenv = _interopDefault(require("dotenv"));
var fs = _interopDefault(require("fs"));
var argv = _interopDefault(require("yargs"));

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

var __assign = function() {
	__assign =
		Object.assign ||
		function __assign(t) {
			for (var s, i = 1, n = arguments.length; i < n; i++) {
				s = arguments[i];
				for (var p in s)
					if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
			}
			return t;
		};
	return __assign.apply(this, arguments);
};

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

var figmaUrl = "";
var figmaToken = "";
var figmaPage = "Design Tokens";
var format = "js";
var apiBaseUrl = "https://api.figma.com/v1/files/";
var figmaJson = false;
var figmaTokens = true;
var outputColorFormat = "rgba";
var outputCSSUnit = "em";
var outputFigmaJsonPath = "figma";
var outputFigmaJsonName = "figma";
var outputFigmaTokensPath = "tokens";
var outputNameFormat = "kebab";
var tokens = [
	{
		frameName: "time",
		group: true,
		name: "animation",
		path: "characters"
	},
	{
		frameName: "colors",
		name: "color",
		path: "fills[0].color",
		style: true,
		styleKey: "fill",
		processValue: "color"
	},
	{
		frameName: "fonts",
		name: "font",
		path: "style",
		processValue: "font",
		type: "text"
	},
	{
		frameName: [
			"grid-desktop",
			"grid-notebook-small",
			"grid-tablet",
			"grid-smartphone"
		],
		name: "grid",
		path: "children",
		processValue: "grid"
	},
	{
		frameName: "mixins",
		group: true,
		name: "mixin",
		path: "characters"
	},
	{
		frameName: "radius",
		name: "radius",
		path: "rectangleCornerRadii",
		processValue: "radius",
		suffix: "px",
		type: "rectangle",
		fallback: "0"
	},
	{
		frameName: "shadows",
		name: "shadow",
		path: "effects[0]",
		style: true,
		styleKey: "effect",
		processValue: "shadow"
	},
	{
		frameName: "space",
		group: true,
		name: "spacing",
		path: "absoluteBoundingBox.width",
		suffix: "px"
	}
];
var defaultConfig = {
	figmaUrl: figmaUrl,
	figmaToken: figmaToken,
	figmaPage: figmaPage,
	format: format,
	apiBaseUrl: apiBaseUrl,
	figmaJson: figmaJson,
	figmaTokens: figmaTokens,
	outputColorFormat: outputColorFormat,
	outputCSSUnit: outputCSSUnit,
	outputFigmaJsonPath: outputFigmaJsonPath,
	outputFigmaJsonName: outputFigmaJsonName,
	outputFigmaTokensPath: outputFigmaTokensPath,
	outputNameFormat: outputNameFormat,
	tokens: tokens
};

dotenv.config();
var config = defaultConfig;
var coerce = function(key, value) {
	var _a;
	config = __assign(__assign({}, config), ((_a = {}), (_a[key] = value), _a));
	return value;
};
argv
	.alias({ help: "h", version: "v" })
	.option("format", {
		alias: "f",
		coerce: function(value) {
			return coerce("format", value);
		},
		choices: ["css", "js", "json", "sass", "scss"],
		default: config.format,
		describe: "Choose a output format"
	})
	.option("config-file", {
		alias: "c",
		boolean: true,
		coerce: function(configFile) {
			if (configFile) {
				config = __assign(
					__assign({}, config),
					JSON.parse(
						fs.readFileSync(".figmagic.json", "utf8") || "{}"
					)
				);
			}
			return configFile;
		},
		default: false,
		describe: "Extend the default config file: .figmagic.json"
	})
	.option("figma-url", {
		alias: "u",
		coerce: function(value) {
			return coerce("figmaUrl", value);
		},
		default: process.env.FIGMA_URL,
		describe: "Figma project identification URI",
		required: false,
		string: true
	})
	.option("figma-token", {
		alias: "t",
		coerce: function(value) {
			return coerce("figmaToken", value);
		},
		default: process.env.FIGMA_TOKEN,
		describe: "Figma development API authorization token",
		required: false,
		string: true
	})
	.option("figma-page", {
		alias: "p",
		coerce: function(value) {
			return coerce("figmaPage", value);
		},
		default: process.env.FIGMA_PAGE || config.figmaPage,
		describe: "Name of tokens page on Figma",
		required: false,
		string: true
	})
	.option("output", {
		alias: "o",
		coerce: function(value) {
			return coerce("outputFigmaTokensPath", value);
		},
		describe: "Folder path for the generated tokens",
		required: false,
		string: true
	}).argv;
if (!config.figmaUrl || !config.figmaToken)
	throw new Error(
		"The environment variables 'FIGMA_URL' or 'FIGMA_TOKEN' not provided(s)"
	);

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

/**
 * Converts `string`, as space separated words, to lower case.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the lower cased string.
 * @example
 *
 * _.lowerCase('--Foo-Bar--');
 * // => 'foo bar'
 *
 * _.lowerCase('fooBar');
 * // => 'foo bar'
 *
 * _.lowerCase('__FOO_BAR__');
 * // => 'foo bar'
 */
var lowerCase = _createCompounder(function(result, word, index) {
	return result + (index ? " " : "") + word.toLowerCase();
});

var lowerCase_1 = lowerCase;

/**
 * Converts `string` to
 * [snake case](https://en.wikipedia.org/wiki/Snake_case).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the snake cased string.
 * @example
 *
 * _.snakeCase('Foo Bar');
 * // => 'foo_bar'
 *
 * _.snakeCase('fooBar');
 * // => 'foo_bar'
 *
 * _.snakeCase('--FOO-BAR--');
 * // => 'foo_bar'
 */
var snakeCase = _createCompounder(function(result, word, index) {
	return result + (index ? "_" : "") + word.toLowerCase();
});

var snakeCase_1 = snakeCase;

/**
 * Converts `string` to
 * [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
 *
 * @static
 * @memberOf _
 * @since 3.1.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the start cased string.
 * @example
 *
 * _.startCase('--foo-bar--');
 * // => 'Foo Bar'
 *
 * _.startCase('fooBar');
 * // => 'Foo Bar'
 *
 * _.startCase('__FOO_BAR__');
 * // => 'FOO BAR'
 */
var startCase = _createCompounder(function(result, word, index) {
	return result + (index ? " " : "") + upperFirst_1(word);
});

var startCase_1 = startCase;

/**
 * Converts `string`, as space separated words, to upper case.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the upper cased string.
 * @example
 *
 * _.upperCase('--foo-bar');
 * // => 'FOO BAR'
 *
 * _.upperCase('fooBar');
 * // => 'FOO BAR'
 *
 * _.upperCase('__foo_bar__');
 * // => 'FOO BAR'
 */
var upperCase = _createCompounder(function(result, word, index) {
	return result + (index ? " " : "") + word.toUpperCase();
});

var upperCase_1 = upperCase;

var outputNameFormat$1 = config.outputNameFormat;
var parseStringFormat = {
	camel: camelCase_1,
	kebab: kebabCase_1,
	lower: lowerCase_1,
	snake: snakeCase_1,
	start: startCase_1,
	upper: upperCase_1
};
var stringParser = function(string, tokenOutputNameFormat) {
	return parseStringFormat[tokenOutputNameFormat || outputNameFormat$1](
		string
	);
};

var format$1 = config.format;
var writeFile = function(file, path, name, isToken) {
	if (isToken === void 0) {
		isToken = false;
	}
	if (!file || !path || !name)
		throw new Error(
			"Missing required parameters to correctly run writeFile()!"
		);
	createFolder(path);
	write(file, path, name, isToken);
};
var writeDeclarations = function(file, name, filePath) {
	var declarations = {};
	Object.keys(file).forEach(function(key) {
		declarations[key] = typeof file[key];
	});
	var content =
		"export default " +
		stringParser(name, "camel") +
		";\n\ndeclare const " +
		stringParser(name, "camel") +
		": " +
		JSON.stringify(declarations, null, "	")
			.replace(/: "/g, ": ")
			.replace(/",/g, ";")
			.replace(/"\n}/g, ";\n}") +
		";\n";
	fs.writeFile(
		filePath.replace("." + format$1, ".d.ts"),
		content,
		"utf-8",
		function(error) {
			if (error)
				throw new Error(
					"Error in write TypeScript .d.ts file: " + error
				);
		}
	);
};
var write = function(file, path, name, isToken) {
	var fileContent = file;
	var filePath = path + "/" + stringParser(name);
	if (isToken) {
		var camelCaseName = stringParser(name, "camel");
		fileContent =
			"const " +
			camelCaseName +
			" = " +
			JSON.stringify(file, null, "	") +
			"\n\nexport default " +
			camelCaseName +
			";";
	}
	filePath += "." + format$1;
	fs.writeFile(filePath, fileContent, "utf-8", function(error) {
		if (error) throw new Error("Error in write() > writeFile(): " + error);
	});
	if (format$1 === "js" && typeof file === "object")
		writeDeclarations(file, name, filePath);
};

var apiBaseUrl$1 = config.apiBaseUrl,
	figmaJson$1 = config.figmaJson,
	figmaUrl$1 = config.figmaUrl,
	figmaToken$1 = config.figmaToken,
	outputFigmaJsonPath$1 = config.outputFigmaJsonPath,
	outputFigmaJsonName$1 = config.outputFigmaJsonName;
var getFromApi = function() {
	return __awaiter(void 0, void 0, void 0, function() {
		var data, url;
		return __generator(this, function(_a) {
			switch (_a.label) {
				case 0:
					data = {};
					url = apiBaseUrl$1 + figmaUrl$1;
					return [
						4 /*yield*/,
						fetch(url, {
							headers: {
								"X-Figma-Token": figmaToken$1
							}
						})
							.catch(function(error) {
								throw new Error("Figma Error: " + error);
							})
							.then(function(response) {
								return __awaiter(
									void 0,
									void 0,
									void 0,
									function() {
										var json;
										return __generator(this, function(_a) {
											switch (_a.label) {
												case 0:
													if (response.status !== 200)
														throw new Error(
															"Error getting Figma metadata from API"
														);
													return [
														4 /*yield*/,
														response.json()
													];
												case 1:
													json = _a.sent();
													if (json.err)
														throw new Error(
															"Figma Error: " +
																json.status +
																" - " +
																json.err
														);
													data = json;
													if (figmaJson$1)
														writeFile(
															JSON.stringify(
																json,
																undefined,
																2
															),
															outputFigmaJsonPath$1,
															outputFigmaJsonName$1,
															false
														);
													return [2 /*return*/];
											}
										});
									}
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

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
	reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
	if (isArray_1(value)) {
		return false;
	}
	var type = typeof value;
	if (
		type == "number" ||
		type == "symbol" ||
		type == "boolean" ||
		value == null ||
		isSymbol_1(value)
	) {
		return true;
	}
	return (
		reIsPlainProp.test(value) ||
		!reIsDeepProp.test(value) ||
		(object != null && value in Object(object))
	);
}

var _isKey = isKey;

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
	var type = typeof value;
	return value != null && (type == "object" || type == "function");
}

var isObject_1 = isObject;

/** `Object#toString` result references. */
var asyncTag = "[object AsyncFunction]",
	funcTag = "[object Function]",
	genTag = "[object GeneratorFunction]",
	proxyTag = "[object Proxy]";

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
	if (!isObject_1(value)) {
		return false;
	}
	// The use of `Object#toString` avoids issues with the `typeof` operator
	// in Safari 9 which returns 'object' for typed arrays and other constructors.
	var tag = _baseGetTag(value);
	return (
		tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag
	);
}

var isFunction_1 = isFunction;

/** Used to detect overreaching core-js shims. */
var coreJsData = _root["__core-js_shared__"];

var _coreJsData = coreJsData;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
	var uid = /[^.]+$/.exec(
		(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO) || ""
	);
	return uid ? "Symbol(src)_1." + uid : "";
})();

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
	return !!maskSrcKey && maskSrcKey in func;
}

var _isMasked = isMasked;

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
	if (func != null) {
		try {
			return funcToString.call(func);
		} catch (e) {}
		try {
			return func + "";
		} catch (e) {}
	}
	return "";
}

var _toSource = toSource;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto$1 = Function.prototype,
	objectProto$2 = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp(
	"^" +
		funcToString$1
			.call(hasOwnProperty$1)
			.replace(reRegExpChar, "\\$&")
			.replace(
				/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
				"$1.*?"
			) +
		"$"
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
	if (!isObject_1(value) || _isMasked(value)) {
		return false;
	}
	var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
	return pattern.test(_toSource(value));
}

var _baseIsNative = baseIsNative;

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
	return object == null ? undefined : object[key];
}

var _getValue = getValue;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
	var value = _getValue(object, key);
	return _baseIsNative(value) ? value : undefined;
}

var _getNative = getNative;

/* Built-in method references that are verified to be native. */
var nativeCreate = _getNative(Object, "create");

var _nativeCreate = nativeCreate;

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
	this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
	this.size = 0;
}

var _hashClear = hashClear;

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
	var result = this.has(key) && delete this.__data__[key];
	this.size -= result ? 1 : 0;
	return result;
}

var _hashDelete = hashDelete;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = "__lodash_hash_undefined__";

/** Used for built-in method references. */
var objectProto$3 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
	var data = this.__data__;
	if (_nativeCreate) {
		var result = data[key];
		return result === HASH_UNDEFINED ? undefined : result;
	}
	return hasOwnProperty$2.call(data, key) ? data[key] : undefined;
}

var _hashGet = hashGet;

/** Used for built-in method references. */
var objectProto$4 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
	var data = this.__data__;
	return _nativeCreate
		? data[key] !== undefined
		: hasOwnProperty$3.call(data, key);
}

var _hashHas = hashHas;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
	var data = this.__data__;
	this.size += this.has(key) ? 0 : 1;
	data[key] = _nativeCreate && value === undefined ? HASH_UNDEFINED$1 : value;
	return this;
}

var _hashSet = hashSet;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
	var index = -1,
		length = entries == null ? 0 : entries.length;

	this.clear();
	while (++index < length) {
		var entry = entries[index];
		this.set(entry[0], entry[1]);
	}
}

// Add methods to `Hash`.
Hash.prototype.clear = _hashClear;
Hash.prototype["delete"] = _hashDelete;
Hash.prototype.get = _hashGet;
Hash.prototype.has = _hashHas;
Hash.prototype.set = _hashSet;

var _Hash = Hash;

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
	this.__data__ = [];
	this.size = 0;
}

var _listCacheClear = listCacheClear;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
	return value === other || (value !== value && other !== other);
}

var eq_1 = eq;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
	var length = array.length;
	while (length--) {
		if (eq_1(array[length][0], key)) {
			return length;
		}
	}
	return -1;
}

var _assocIndexOf = assocIndexOf;

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
	var data = this.__data__,
		index = _assocIndexOf(data, key);

	if (index < 0) {
		return false;
	}
	var lastIndex = data.length - 1;
	if (index == lastIndex) {
		data.pop();
	} else {
		splice.call(data, index, 1);
	}
	--this.size;
	return true;
}

var _listCacheDelete = listCacheDelete;

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
	var data = this.__data__,
		index = _assocIndexOf(data, key);

	return index < 0 ? undefined : data[index][1];
}

var _listCacheGet = listCacheGet;

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
	return _assocIndexOf(this.__data__, key) > -1;
}

var _listCacheHas = listCacheHas;

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
	var data = this.__data__,
		index = _assocIndexOf(data, key);

	if (index < 0) {
		++this.size;
		data.push([key, value]);
	} else {
		data[index][1] = value;
	}
	return this;
}

var _listCacheSet = listCacheSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
	var index = -1,
		length = entries == null ? 0 : entries.length;

	this.clear();
	while (++index < length) {
		var entry = entries[index];
		this.set(entry[0], entry[1]);
	}
}

// Add methods to `ListCache`.
ListCache.prototype.clear = _listCacheClear;
ListCache.prototype["delete"] = _listCacheDelete;
ListCache.prototype.get = _listCacheGet;
ListCache.prototype.has = _listCacheHas;
ListCache.prototype.set = _listCacheSet;

var _ListCache = ListCache;

/* Built-in method references that are verified to be native. */
var Map = _getNative(_root, "Map");

var _Map = Map;

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
	this.size = 0;
	this.__data__ = {
		hash: new _Hash(),
		map: new (_Map || _ListCache)(),
		string: new _Hash()
	};
}

var _mapCacheClear = mapCacheClear;

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
	var type = typeof value;
	return type == "string" ||
		type == "number" ||
		type == "symbol" ||
		type == "boolean"
		? value !== "__proto__"
		: value === null;
}

var _isKeyable = isKeyable;

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
	var data = map.__data__;
	return _isKeyable(key)
		? data[typeof key == "string" ? "string" : "hash"]
		: data.map;
}

var _getMapData = getMapData;

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
	var result = _getMapData(this, key)["delete"](key);
	this.size -= result ? 1 : 0;
	return result;
}

var _mapCacheDelete = mapCacheDelete;

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
	return _getMapData(this, key).get(key);
}

var _mapCacheGet = mapCacheGet;

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
	return _getMapData(this, key).has(key);
}

var _mapCacheHas = mapCacheHas;

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
	var data = _getMapData(this, key),
		size = data.size;

	data.set(key, value);
	this.size += data.size == size ? 0 : 1;
	return this;
}

var _mapCacheSet = mapCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
	var index = -1,
		length = entries == null ? 0 : entries.length;

	this.clear();
	while (++index < length) {
		var entry = entries[index];
		this.set(entry[0], entry[1]);
	}
}

// Add methods to `MapCache`.
MapCache.prototype.clear = _mapCacheClear;
MapCache.prototype["delete"] = _mapCacheDelete;
MapCache.prototype.get = _mapCacheGet;
MapCache.prototype.has = _mapCacheHas;
MapCache.prototype.set = _mapCacheSet;

var _MapCache = MapCache;

/** Error message constants. */
var FUNC_ERROR_TEXT = "Expected a function";

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
	if (
		typeof func != "function" ||
		(resolver != null && typeof resolver != "function")
	) {
		throw new TypeError(FUNC_ERROR_TEXT);
	}
	var memoized = function() {
		var args = arguments,
			key = resolver ? resolver.apply(this, args) : args[0],
			cache = memoized.cache;

		if (cache.has(key)) {
			return cache.get(key);
		}
		var result = func.apply(this, args);
		memoized.cache = cache.set(key, result) || cache;
		return result;
	};
	memoized.cache = new (memoize.Cache || _MapCache)();
	return memoized;
}

// Expose `MapCache`.
memoize.Cache = _MapCache;

var memoize_1 = memoize;

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
	var result = memoize_1(func, function(key) {
		if (cache.size === MAX_MEMOIZE_SIZE) {
			cache.clear();
		}
		return key;
	});

	var cache = result.cache;
	return result;
}

var _memoizeCapped = memoizeCapped;

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = _memoizeCapped(function(string) {
	var result = [];
	if (string.charCodeAt(0) === 46 /* . */) {
		result.push("");
	}
	string.replace(rePropName, function(match, number, quote, subString) {
		result.push(
			quote ? subString.replace(reEscapeChar, "$1") : number || match
		);
	});
	return result;
});

var _stringToPath = stringToPath;

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
	if (isArray_1(value)) {
		return value;
	}
	return _isKey(value, object) ? [value] : _stringToPath(toString_1(value));
}

var _castPath = castPath;

/** Used as references for various `Number` constants. */
var INFINITY$1 = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
	if (typeof value == "string" || isSymbol_1(value)) {
		return value;
	}
	var result = value + "";
	return result == "0" && 1 / value == -INFINITY$1 ? "-0" : result;
}

var _toKey = toKey;

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
	path = _castPath(path, object);

	var index = 0,
		length = path.length;

	while (object != null && index < length) {
		object = object[_toKey(path[index++])];
	}
	return index && index == length ? object : undefined;
}

var _baseGet = baseGet;

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
	var result = object == null ? undefined : _baseGet(object, path);
	return result === undefined ? defaultValue : result;
}

var get_1 = get;

var roundToDecimal = function(value, decimals) {
	if (Number.isNaN(Number(value)))
		throw new Error("No number value provided to roundNumber()!");
	if (!decimals) decimals = 0;
	return Number(Math.round(Number(value + "e" + decimals)) + "e-" + decimals);
};

var processToken = function(value, token, frame) {
	if (!value && !token.fallback)
		throw new Error("Value or Fallback don't provided to processToken()!");
	var processedToken;
	if (!value && token.fallback) {
		processedToken =
			"" + (token.prefix || "") + token.fallback + (token.suffix || "");
		return processedToken;
	}
	switch (token.processValue) {
		case "color":
			var colorValue = value;
			if (typeof colorValue !== "object")
				throw new Error(
					"The processValue " +
						token.processValue +
						" need an object has value"
				);
			var expectedKeys = ["r", "g", "b", "a"];
			for (
				var _i = 0, expectedKeys_1 = expectedKeys;
				_i < expectedKeys_1.length;
				_i++
			) {
				var expectedKey = expectedKeys_1[_i];
				if (!Object.keys(colorValue).includes(expectedKey))
					throw new Error(
						"The value for 'color' don't have the '" +
							expectedKey +
							"' key"
					);
			}
			var colorR = Math.round(colorValue.r * 255);
			var colorG = Math.round(colorValue.g * 255);
			var colorB = Math.round(colorValue.b * 255);
			var colorA = roundToDecimal(colorValue.a * 1, 3);
			processedToken =
				"rgba(" +
				colorR +
				", " +
				colorG +
				", " +
				colorB +
				", " +
				colorA +
				")";
			break;
		case "font":
			var fontValue = value;
			if (typeof fontValue !== "object")
				throw new Error(
					"The processValue " +
						token.processValue +
						" need an object has value"
				);
			var font = {};
			var keys = ["fontFamily", "fontWeight"];
			var keysFromTo = [
				{
					from: "fontSize",
					to: "font-size",
					processKey: function(value) {
						return roundToDecimal(value / 16, 4) + "rem";
					}
				},
				{
					from: "letterSpacing",
					to: "letter-spacing",
					processKey: function(value) {
						return roundToDecimal(value * 0.1, 4) + "em";
					}
				},
				{
					from: "lineHeightPercentFontSize",
					to: "line-height",
					processKey: function(value) {
						return String(roundToDecimal(value / 100, 4));
					}
				},
				{
					from: "textAlignHorizontal",
					to: "text-align",
					processKey: function(value) {
						return value.toLowerCase();
					}
				}
			];
			for (var _a = 0, keys_1 = keys; _a < keys_1.length; _a++) {
				var key = keys_1[_a];
				if (fontValue[key]) {
					font[stringParser(key, "kebab")] = String(fontValue[key]);
				}
			}
			if (fontValue.fontPostScriptName) {
				if (
					font["font-family"] &&
					fontValue.fontPostScriptName !== font["font-family"]
				) {
					font["font-family"] =
						font["font-family"] +
						", " +
						stringParser(fontValue.fontPostScriptName, "start");
				} else {
					font["font-family"] = fontValue.fontPostScriptName;
				}
			}
			for (
				var _b = 0, keysFromTo_1 = keysFromTo;
				_b < keysFromTo_1.length;
				_b++
			) {
				var key = keysFromTo_1[_b];
				if (fontValue[key.from]) {
					font[key.to] = key.processKey(fontValue[key.from]);
				}
			}
			processedToken = font;
			break;
		case "grid":
			var gridValue = value;
			if (!Array.isArray(gridValue))
				throw new Error(
					"The processValue " +
						token.processValue +
						" need an array has value"
				);
			if (gridValue.length < 2)
				throw new Error(
					"The processValue " +
						token.processValue +
						" need the minimum of two items"
				);
			var grid = {
				"column-count": 1,
				"column-width": "100%",
				gutter: "0%",
				"min-width": "0px"
			};
			grid["column-count"] = gridValue.length;
			var columnWidth = gridValue[0].absoluteBoundingBox.width;
			var canvasWidth = frame.absoluteBoundingBox.width;
			grid["column-width"] = (columnWidth / canvasWidth) * 100 + "%";
			grid.gutter =
				((gridValue[1].absoluteBoundingBox.x -
					(gridValue[0].absoluteBoundingBox.x + columnWidth)) /
					canvasWidth) *
					100 +
				"%";
			grid["min-width"] = canvasWidth + "px";
			processedToken = grid;
			break;
		case "radius":
			var radiusValue = value;
			if (!Array.isArray(radiusValue))
				throw new Error(
					"The processValue " +
						token.processValue +
						" need an array has value"
				);
			processedToken = radiusValue
				.map(function(radius) {
					return (
						"" +
						(token.prefix || "") +
						radius +
						(token.suffix || "")
					);
				})
				.join(" ");
			break;
		case "shadow":
			var shadowValue = value;
			if (typeof shadowValue !== "object")
				throw new Error(
					"The processValue " +
						token.processValue +
						" need an object has value"
				);
			var shadowOffsetX = shadowValue.offset.x + "px ";
			var shadowOffsetY = shadowValue.offset.y + "px ";
			var shadowRadius = shadowValue.radius + "px ";
			var shadowColorR = Math.round(shadowValue.color.r * 255);
			var shadowColorG = Math.round(shadowValue.color.g * 255);
			var shadowColorB = Math.round(shadowValue.color.b * 255);
			var shadowColorA = roundToDecimal(shadowValue.color.a * 1, 3);
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
			processedToken =
				shadowOffsetX + shadowOffsetY + shadowRadius + shadowColor;
			break;
		default:
			processedToken = "";
			break;
	}
	return processedToken;
};

var setupToken = function(token, page, styles) {
	var tokens = {};
	var buildToken = function(currentFrame, name) {
		var _a, _b;
		if (token.type && stringParser(currentFrame.type) !== token.type)
			return;
		if (token.style && !token.styleKey)
			throw new Error("styleKey not found");
		var key = name || currentFrame.characters || currentFrame.name;
		if (token.style) {
			key =
				(_b =
					(_a =
						styles[
							get_1(currentFrame, "styles." + token.styleKey)
						]) === null || _a === void 0
						? void 0
						: _a.name) !== null && _b !== void 0
					? _b
					: undefined;
		}
		if (!key) {
			key = get_1(currentFrame, token.path);
		}
		var parsedKey = stringParser(key, token.outputNameFormat);
		if (token.processValue) {
			tokens[parsedKey] = processToken(
				get_1(currentFrame, token.path),
				token,
				currentFrame
			);
		} else {
			tokens[parsedKey] =
				"" +
				(token.prefix || "") +
				get_1(currentFrame, token.path) +
				(token.suffix || "");
		}
	};
	var processFrame = function(frame) {
		if (!frame.children || !frame.children.length)
			throw new Error(
				'The frame "' + frame.name + "\" don't have children!"
			);
		var recursive = function(currentFrame) {
			if (token.group && currentFrame.type === "GROUP") {
				for (
					var _i = 0, _a = currentFrame.children;
					_i < _a.length;
					_i++
				) {
					var currentGroupFrame = _a[_i];
					buildToken(currentGroupFrame, currentFrame.name);
				}
			} else if (!token.group) {
				if (currentFrame.children && token.path !== "children") {
					for (
						var _b = 0, _c = currentFrame.children;
						_b < _c.length;
						_b++
					) {
						var currentGroupFrame = _c[_b];
						recursive(currentGroupFrame);
					}
					return;
				}
				buildToken(currentFrame);
			}
		};
		if (token.path !== "children") {
			for (var _i = 0, _a = frame.children; _i < _a.length; _i++) {
				var currentFrame = _a[_i];
				recursive(currentFrame);
			}
		} else {
			recursive(frame);
		}
	};
	if (Array.isArray(token.frameName)) {
		var frames_2 = [];
		var _loop_1 = function(frameName) {
			var filtered = page.children.filter(function(frame) {
				return stringParser(frame.name) === stringParser(frameName);
			})[0];
			if (filtered) frames_2.push(filtered);
		};
		for (var _i = 0, _a = token.frameName; _i < _a.length; _i++) {
			var frameName = _a[_i];
			_loop_1(frameName);
		}
		if (!frames_2.length) throw new Error("No frame for setupToken()!");
		for (var _b = 0, frames_1 = frames_2; _b < frames_1.length; _b++) {
			var frame = frames_1[_b];
			processFrame(frame);
		}
	} else {
		var frame = page.children.filter(function(frame) {
			return stringParser(frame.name) === stringParser(token.frameName);
		})[0];
		if (!frame) throw new Error("No frame for setupToken()!");
		processFrame(frame);
	}
	return tokens;
};

var figmaPage$1 = config.figmaPage;
var tokensPage = function(figmaPages) {
	if (!figmaPages || !figmaPages.length)
		throw new Error("No pages provided to tokensPage()!");
	var targetPage = stringParser(figmaPage$1);
	var correctPage;
	for (
		var _i = 0, figmaPages_1 = figmaPages;
		_i < figmaPages_1.length;
		_i++
	) {
		var page = figmaPages_1[_i];
		if (stringParser(page.name) === targetPage) {
			correctPage = page;
			break;
		}
	}
	if (!correctPage)
		throw new Error('No page founded width the name "' + figmaPage$1 + '"');
	return correctPage;
};

var tokens$1 = config.tokens,
	figmaTokens$1 = config.figmaTokens,
	outputFigmaTokensPath$1 = config.outputFigmaTokensPath;
var writeTokens = function(data) {
	if (!figmaTokens$1) return;
	if (!tokens$1 || !tokens$1.length)
		throw new Error("Less than one token provided to writeTokens()!");
	for (var _i = 0, tokens_1 = tokens$1; _i < tokens_1.length; _i++) {
		var token = tokens_1[_i];
		var processedToken = setupToken(
			token,
			tokensPage(data.document.children),
			data.styles
		);
		if (processedToken)
			writeFile(
				processedToken,
				outputFigmaTokensPath$1,
				token.name,
				true
			);
	}
};

var outputFigmaJsonPath$2 = config.outputFigmaJsonPath,
	outputFigmaTokensPath$2 = config.outputFigmaTokensPath;
(function() {
	return __awaiter(void 0, void 0, void 0, function() {
		var data;
		return __generator(this, function(_a) {
			switch (_a.label) {
				case 0:
					rimraf("./" + outputFigmaJsonPath$2, function() {});
					rimraf("./" + outputFigmaTokensPath$2, function() {});
					return [4 /*yield*/, getFromApi()];
				case 1:
					data = _a.sent();
					writeTokens(data);
					return [2 /*return*/];
			}
		});
	});
})();
