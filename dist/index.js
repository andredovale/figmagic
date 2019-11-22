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
var dotenv = require("dotenv");

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
	var filePath = path + "/" + name;
	if (isToken) {
		if (format === "yml" || format === "yaml") {
			fileContent = yaml.dump(file);
		} else {
			fileContent =
				"const " +
				name +
				" = " +
				JSON.stringify(file, null, " ") +
				"\n\nexport default " +
				name +
				";";
		}
		filePath += "." + format;
	}
	fs.writeFile(filePath, fileContent, "utf-8", function(error) {
		if (error) throw new Error("Error in write() > writeFile(): " + error);
	});
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
	if (!figmaPages || !figmaPages.length)
		throw new Error("No pages provided to createPage()!");
	var correctPage;
	for (
		var _i = 0, figmaPages_1 = figmaPages;
		_i < figmaPages_1.length;
		_i++
	) {
		var page = figmaPages_1[_i];
		var fixedPageName = page.name.toLowerCase().replace(" ", "");
		if (fixedPageName === "designtokens") {
			correctPage = page;
			break;
		}
	}
	return correctPage;
};

var camelize = function(string) {
	if (!string) throw new Error("No string provided to camelize()!");
	return string
		.trim()
		.toLowerCase()
		.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
			return index !== 0 ? letter.toUpperCase() : letter;
		})
		.replace(/\s+/g, "");
};

var formatName = function(string) {
	if (!string) throw new Error("No string for formatName()!");
	var forbiddenCharacters = ["–", "—", "|", "."];
	for (
		var _i = 0, forbiddenCharacters_1 = forbiddenCharacters;
		_i < forbiddenCharacters_1.length;
		_i++
	) {
		var char = forbiddenCharacters_1[_i];
		string = string.replace(char, "");
	}
	return string;
};

var roundToDecimal = function(value, decimals) {
	if (!value) throw new Error("No number value provided to roundNumber()!");
	if (!decimals) decimals = 0;
	return Number(Math.round(Number(value + "e" + decimals)) + "e-" + decimals);
};

var setupColorTokens = function(frame) {
	if (!frame) throw new Error("No frame for setupColorTokens()!");
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
		var name_1 = formatName(camelize(color.name));
		colors[name_1] = token;
	}
	return colors;
};

var globalPxSize = 1;
var globalRemSize = 16;
var units = {
	globalPxSize: globalPxSize,
	globalRemSize: globalRemSize
};

var normalizeUnits = function(value, currentUnit, newUnit) {
	if (!value || !currentUnit || !newUnit)
		throw new Error("Missing parameters for normalizeUnits()!");
	var rootSize;
	var unitSize;
	if (currentUnit === "px") rootSize = units.globalPxSize;
	if (currentUnit === "percent") rootSize = units.globalPxSize;
	if (newUnit === "rem" || newUnit === "em") unitSize = units.globalRemSize;
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
	var spacings = {};
	for (var _i = 0, _a = frame.children; _i < _a.length; _i++) {
		var spacing = _a[_i];
		var token = normalizeUnits(
			spacing.absoluteBoundingBox.width,
			"px",
			"rem"
		);
		var name_1 = formatName(camelize(spacing.name));
		spacings[name_1] = token;
	}
	return spacings;
};

var setupFontTokens = function(frame) {
	if (!frame) throw new Error("No frame for setupFontTokens()!");
	var fonts = {};
	for (var _i = 0, _a = frame.children; _i < _a.length; _i++) {
		var font = _a[_i];
		var token = {
			name: font.style.fontFamily,
			postScript: font.style.fontPostScriptName
		};
		var name_1 = formatName(camelize(font.name));
		fonts[name_1] = token;
	}
	return fonts;
};

var setupFontSizeTokens = function(frame) {
	if (!frame) throw new Error("No frame for setupFontSizeTokens()!");
	var fontSizes = {};
	for (var _i = 0, _a = frame.children; _i < _a.length; _i++) {
		var fontSize = _a[_i];
		var token = normalizeUnits(fontSize.style.fontSize, "px", "rem");
		var name_1 = formatName(camelize(fontSize.name));
		fontSizes[name_1] = token;
	}
	return fontSizes;
};

var setupFontWeightTokens = function(frame) {
	if (!frame) throw new Error("No frame for setupFontWeightTokens()!");
	var fontWeights = {};
	for (var _i = 0, _a = frame.children; _i < _a.length; _i++) {
		var fontWeight = _a[_i];
		var token = fontWeight.style.fontWeight;
		var name_1 = formatName(camelize(fontWeight.name));
		fontWeights[name_1] = token;
	}
	return fontWeights;
};

var setupLineHeightTokens = function(frame) {
	if (!frame) throw new Error("No frame for setupLineHeightTokens()!");
	var lineHeights = {};
	for (var _i = 0, _a = frame.children; _i < _a.length; _i++) {
		var lineHeight = _a[_i];
		var token = normalizeUnits(lineHeight.style.lineHeightPx, "px", "rem");
		var name_1 = formatName(camelize(lineHeight.name));
		lineHeights[name_1] = token;
	}
	return lineHeights;
};

var setupRadiusTokens = function(frame) {
	if (!frame) throw new Error("No frame for setupRadiusTokens()!");
	var radii = {};
	for (var _i = 0, _a = frame.children; _i < _a.length; _i++) {
		var radius = _a[_i];
		var token = radius.cornerRadius + "px";
		var name_1 = formatName(camelize(radius.name));
		radii[name_1] = token;
	}
	return radii;
};

var setupBorderTokens = function(frame) {
	if (!frame) throw new Error("No frame for setupBorderTokens()!");
	var borders = {};
	for (var _i = 0, _a = frame.children; _i < _a.length; _i++) {
		var border = _a[_i];
		var token = border.strokeWeight + "px " + border.strokes[0].type;
		var name_1 = formatName(camelize(border.name));
		borders[name_1] = token;
	}
	return borders;
};

var setupShadowTokens = function(frame) {
	if (!frame) throw new Error("No frame for setupShadowTokens()!");
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
		var name_1 = formatName(camelize(shadow.name));
		shadows[name_1] = token;
	}
	return shadows;
};

var setupAnimationTokens = function(frame) {
	if (!frame) throw new Error("No frame for setupAnimationTokens()!");
	var animations = {};
	for (var _i = 0, _a = frame.children; _i < _a.length; _i++) {
		var animation = _a[_i];
		var token = animation.absoluteBoundingBox.width + "ms";
		var name_1 = formatName(camelize(animation.name));
		animations[name_1] = token;
	}
	return animations;
};

var processTokens = function(sheet, name) {
	if (!sheet || !name)
		throw new Error("No sheet or name for processTokens()!");
	var loweredName = name.toLowerCase();
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
		case !!loweredName.match("spacings?"):
			return setupSpacingTokens(sheet);
	}
};

var writeTokens = function(tokens, format) {
	if (!tokens || !tokens.length)
		throw new Error("Less than one token provided to writeTokens()!");
	for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
		var token = tokens_1[_i];
		var tokenName = formatName(camelize(token.name));
		var processedToken = processTokens(token, tokenName);
		if (processedToken)
			writeFile(processedToken, "tokens", tokenName, true, format);
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
