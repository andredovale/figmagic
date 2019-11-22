import { camelize } from "./camelize";
import { formatName } from "./formatName";
import { Frame } from "../types/frame";

export const setupFontWeightTokens = (frame: Frame) => {
	if (!frame) throw new Error("No frame for setupFontWeightTokens()!");

	const fontWeights: { [key: string]: number } = {};

	for (let fontWeight of frame.children) {
		const token = fontWeight.style.fontWeight;

		const name = formatName(camelize(fontWeight.name));
		fontWeights[name] = token;
	}

	return fontWeights;
};
