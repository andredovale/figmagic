import { Config } from "../types/config";
import { roundToDecimal } from "./round-to-decimal";
import { Frame } from "../types/frame";

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
			const colorR = Math.round(value.r * 255);
			const colorG = Math.round(value.g * 255);
			const colorB = Math.round(value.b * 255);
			const colorA = roundToDecimal(value.a * 1, 3);

			processedToken = `rgba(${colorR}, ${colorG}, ${colorB}, ${colorA})`;
			break;

		case "grid":
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

			grid["column-count"] = value.length;

			const columnWidth = value[0].absoluteBoundingBox.width;
			const canvasWidth = frame.absoluteBoundingBox.width;

			grid["column-width"] = `${(columnWidth / canvasWidth) * 100}%`;

			grid.gutter = `${((value[1].absoluteBoundingBox.x -
				(value[0].absoluteBoundingBox.x + columnWidth)) /
				canvasWidth) *
				100}%`;

			grid["min-width"] = `${canvasWidth}px`;

			processedToken = grid;

			break;

		case "radius":
			processedToken = (value as string[])
				.map(
					radius =>
						`${token.prefix || ""}${radius}${token.suffix || ""}`
				)
				.join(" ");
			break;

		case "shadow":
			const shadowOffsetX = value.offset.x + "px ";
			const shadowOffsetY = value.offset.y + "px ";
			const shadowRadius = value.radius + "px ";
			const shadowColorR = Math.round(value.color.r * 255);
			const shadowColorG = Math.round(value.color.g * 255);
			const shadowColorB = Math.round(value.color.b * 255);
			const shadowColorA = roundToDecimal(value.color.a * 1, 3);
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
