import kebabCase from "lodash/kebabCase";
import { normalizeUnits } from "./normalize-units";
import { Frame } from "../types/frame";
import { recursiveSetup } from "./recursive-setup";

export const setupFontSizeTokens = (frame: Frame) => {
	if (!frame) throw new Error("No frame for setupFontSizeTokens()!");

	if (!frame.children || !frame.children.length)
		throw new Error(`The frame "${frame.name}" don't have children!`);

	const fontSizes: { [key: string]: string | void } = {};

	recursiveSetup(frame.children, fontSize => {
		const token = normalizeUnits(fontSize.style.fontSize, "px", "rem");

		const name = kebabCase(fontSize.name);
		fontSizes[name] = token;
	});

	return fontSizes;
};
