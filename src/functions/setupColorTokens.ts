import { camelize } from "./camelize";
import { formatName } from "./formatName";
import { roundToDecimal } from "./roundToDecimal";
import { Frame } from "../types/frame";

export const setupColorTokens = (frame: Frame) => {
	if (!frame) throw new Error("No frame for setupColorTokens()!");

	const colors: { [key: string]: string } = {};

	for (let color of frame.children) {
		const colorR = Math.round(color.fills[0].color.r * 255);
		const colorG = Math.round(color.fills[0].color.g * 255);
		const colorB = Math.round(color.fills[0].color.b * 255);
		const colorA = roundToDecimal(color.fills[0].color.a * 1, 3);

		const token = `rgba(${colorR}, ${colorG}, ${colorB}, ${colorA})`;

		const name = formatName(camelize(color.name));
		colors[name] = token;
	}

	return colors;
};
