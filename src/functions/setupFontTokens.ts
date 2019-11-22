import { camelize } from "./camelize";
import { formatName } from "./formatName";
import { Frame } from "../types/frame";

export const setupFontTokens = (frame: Frame) => {
	if (!frame) throw new Error("No frame for setupFontTokens()!");

	const fonts: {
		[key: string]: { name: string; postScript: string };
	} = {};

	for (let font of frame.children) {
		const token = {
			name: font.style.fontFamily,
			postScript: font.style.fontPostScriptName
		};

		const name = formatName(camelize(font.name));
		fonts[name] = token;
	}

	return fonts;
};
