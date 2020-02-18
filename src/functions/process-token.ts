import { Config } from "../types/config";
import { roundToDecimal } from "./round-to-decimal";
import { Frame } from "../types/frame";
import { stringParser } from "./parse-string";

const processToken = (value: any, token: Config["tokens"][0], frame: Frame) => {
	if (!value && !token.fallback)
		throw new Error("Value or Fallback don't provided to processToken()!");

	let processedToken;

	if (!value && token.fallback) {
		processedToken = `${token.prefix || ""}${
			token.fallback
		}${token.suffix || ""}`;

		return processedToken;
	}

	switch (token.processValue) {
		case "color":
			const colorValue: Frame["effects"][0]["color"] = value;

			if (typeof colorValue !== "object")
				throw new Error(
					`The processValue ${token.processValue} need an object has value`
				);

			const expectedKeys = ["r", "g", "b", "a"];

			for (const expectedKey of expectedKeys) {
				if (!Object.keys(colorValue).includes(expectedKey))
					throw new Error(
						`The value for 'color' don't have the '${expectedKey}' key`
					);
			}

			const colorR = Math.round(colorValue.r * 255);
			const colorG = Math.round(colorValue.g * 255);
			const colorB = Math.round(colorValue.b * 255);
			const colorA = roundToDecimal(colorValue.a * 1, 3);

			processedToken = `rgba(${colorR}, ${colorG}, ${colorB}, ${colorA})`;
			break;

		case "font":
			const fontValue: Frame["style"] = value;

			if (typeof fontValue !== "object")
				throw new Error(
					`The processValue ${token.processValue} need an object has value`
				);

			const font: { [key: string]: any } = {};

			const keys = ["fontFamily", "fontWeight"];
			const keysFromTo = [
				{
					from: "fontSize",
					to: "font-size",
					processKey: (value: number) =>
						`${roundToDecimal(value / 16, 4)}rem`
				},
				{
					from: "letterSpacing",
					to: "letter-spacing",
					processKey: (value: number) =>
						`${roundToDecimal(value, 4)}rem`
				},
				{
					from: "lineHeightPercentFontSize",
					to: "line-height",
					processKey: (value: number) =>
						roundToDecimal(value / 100, 4)
				},
				{
					from: "textAlignHorizontal",
					to: "text-align",
					processKey: (value: string) => value.toLowerCase()
				}
			];

			for (const key of keys) {
				if (fontValue[key]) {
					font[stringParser(key, "kebab")] = fontValue[key];
				}
			}

			if (fontValue.fontPostScriptName) {
				if (
					font["font-family"] &&
					fontValue.fontPostScriptName !== font["font-family"]
				) {
					font["font-family"] = `${
						font["font-family"]
					}, ${stringParser(fontValue.fontPostScriptName, "start")}`;
				} else {
					font["font-family"] = fontValue.fontPostScriptName;
				}
			}

			for (const key of keysFromTo) {
				if (fontValue[key.from]) {
					font[key.to] = key.processKey(<never>fontValue[key.from]);
				}
			}

			processedToken = font;
			break;

		case "grid":
			const gridValue: Frame[] = value;

			if (!Array.isArray(gridValue))
				throw new Error(
					`The processValue ${token.processValue} need an array has value`
				);

			if (gridValue.length < 2)
				throw new Error(
					`The processValue ${token.processValue} need the minimum of two items`
				);

			const grid: {
				"column-count": number;
				"column-width": string;
				gutter: string;
				"min-width": string;
			} = {
				"column-count": 1,
				"column-width": "100%",
				gutter: "0%",
				"min-width": "0px"
			};

			grid["column-count"] = gridValue.length;

			const columnWidth = gridValue[0].absoluteBoundingBox.width;
			const canvasWidth = frame.absoluteBoundingBox.width;

			grid["column-width"] = `${(columnWidth / canvasWidth) * 100}%`;

			grid.gutter = `${((gridValue[1].absoluteBoundingBox.x -
				(gridValue[0].absoluteBoundingBox.x + columnWidth)) /
				canvasWidth) *
				100}%`;

			grid["min-width"] = `${canvasWidth}px`;

			processedToken = grid;

			break;

		case "radius":
			const radiusValue: Frame["rectangleCornerRadii"] = value;

			if (!Array.isArray(radiusValue))
				throw new Error(
					`The processValue ${token.processValue} need an array has value`
				);

			processedToken = radiusValue
				.map(
					radius =>
						`${token.prefix || ""}${radius}${token.suffix || ""}`
				)
				.join(" ");

			break;

		case "shadow":
			const shadowValue: Frame["effects"][0] = value;

			if (typeof shadowValue !== "object")
				throw new Error(
					`The processValue ${token.processValue} need an object has value`
				);

			const shadowOffsetX = shadowValue.offset.x + "px ";
			const shadowOffsetY = shadowValue.offset.y + "px ";
			const shadowRadius = shadowValue.radius + "px ";
			const shadowColorR = Math.round(shadowValue.color.r * 255);
			const shadowColorG = Math.round(shadowValue.color.g * 255);
			const shadowColorB = Math.round(shadowValue.color.b * 255);
			const shadowColorA = roundToDecimal(shadowValue.color.a * 1, 3);
			const shadowColor = `rgba(${shadowColorR}, ${shadowColorG}, ${shadowColorB}, ${shadowColorA})`;

			processedToken =
				shadowOffsetX + shadowOffsetY + shadowRadius + shadowColor;
			break;

		default:
			processedToken = "";

			break;
	}

	return processedToken;
};

export { processToken };
