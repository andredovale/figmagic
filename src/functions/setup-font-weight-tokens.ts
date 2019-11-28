import kebabCase from "lodash/kebabCase";
import { Frame } from "../types/frame";
import { recursiveSetup } from "./recursive-setup";

export const setupFontWeightTokens = (frame: Frame) => {
	if (!frame) throw new Error("No frame for setupFontWeightTokens()!");

	if (!frame.children || !frame.children.length)
		throw new Error(`The frame "${frame.name}" don't have children!`);

	const fontWeights: { [key: string]: number } = {};

	recursiveSetup(frame.children, fontWeight => {
		const token = fontWeight.style.fontWeight;

		const name = kebabCase(fontWeight.name);
		fontWeights[name] = token;
	});

	return fontWeights;
};
