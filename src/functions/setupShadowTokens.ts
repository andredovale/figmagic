import { camelize } from "./camelize";
import { formatName } from "./formatName";
import { roundToDecimal } from "./roundToDecimal";
import { Frame } from "../types/frame";

export const setupShadowTokens = (frame: Frame) => {
	if (!frame) throw new Error("No frame for setupShadowTokens()!");

	const shadows: { [key: string]: string } = {};

	for (let shadow of frame.children) {
		const shadowOffsetX = shadow.effects[0].offset.x + "px ";
		const shadowOffsetY = shadow.effects[0].offset.y + "px ";
		const shadowRadius = shadow.effects[0].radius + "px ";
		const shadowColorR = Math.round(shadow.effects[0].color.r * 255);
		const shadowColorG = Math.round(shadow.effects[0].color.g * 255);
		const shadowColorB = Math.round(shadow.effects[0].color.b * 255);
		const shadowColorA = roundToDecimal(shadow.effects[0].color.a * 1, 3);
		const shadowColor = `rgba(${shadowColorR}, ${shadowColorG}, ${shadowColorB}, ${shadowColorA})`;

		const token =
			shadowOffsetX + shadowOffsetY + shadowRadius + shadowColor;

		const name = formatName(camelize(shadow.name));
		shadows[name] = token;
	}

	return shadows;
};
