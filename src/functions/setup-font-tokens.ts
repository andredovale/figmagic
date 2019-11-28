import kebabCase from "lodash/kebabCase";
import { Frame } from "../types/frame";
import { recursiveSetup } from "./recursive-setup";

export const setupFontTokens = (frame: Frame) => {
	if (!frame) throw new Error("No frame for setupFontTokens()!");

	if (!frame.children || !frame.children.length)
		throw new Error(`The frame "${frame.name}" don't have children!`);

	const fonts: {
		[key: string]: { name: string; "post-script": string };
	} = {};

	recursiveSetup(frame.children, font => {
		const token = {
			name: font.style.fontFamily,
			"post-script": font.style.fontPostScriptName
		};

		const name = kebabCase(font.name);
		fonts[name] = token;
	});

	return fonts;
};
