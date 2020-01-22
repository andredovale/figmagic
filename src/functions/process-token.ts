import { Config } from "../types/config";
import { roundToDecimal } from "./round-to-decimal";

const processToken = (
	value: any,
	processValue: Config["tokens"][0]["processValue"]
) => {
	if (!value || !processValue)
		throw new Error(
			"Value or ProcessValue don't provided to processToken()!"
		);

	let processedToken;

	switch (processValue) {
		case "color":
			const colorR = Math.round(value.r * 255);
			const colorG = Math.round(value.g * 255);
			const colorB = Math.round(value.b * 255);
			const colorA = roundToDecimal(value.a * 1, 3);

			processedToken = `rgba(${colorR}, ${colorG}, ${colorB}, ${colorA})`;
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
