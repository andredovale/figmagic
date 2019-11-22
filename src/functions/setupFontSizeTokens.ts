import { camelize } from "./camelize";
import { formatName } from "./formatName";
import { normalizeUnits } from "./normalizeUnits";
import { Frame } from "../types/frame";

export const setupFontSizeTokens = (frame: Frame) => {
	if (!frame) throw new Error("No frame for setupFontSizeTokens()!");

	const fontSizes: { [key: string]: string | void } = {};

	for (let fontSize of frame.children) {
		const token = normalizeUnits(fontSize.style.fontSize, "px", "rem");

		const name = formatName(camelize(fontSize.name));
		fontSizes[name] = token;
	}

	return fontSizes;
};
