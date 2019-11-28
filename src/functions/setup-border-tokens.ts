import kebabCase from "lodash/kebabCase";
import { Frame } from "../types/frame";
import { recursiveSetup } from "./recursive-setup";

export const setupBorderTokens = (frame: Frame) => {
	if (!frame) throw new Error("No frame for setupBorderTokens()!");

	if (!frame.children || !frame.children.length)
		throw new Error(`The frame "${frame.name}" don't have children!`);

	const borders: { [key: string]: string } = {};

	recursiveSetup(frame.children, border => {
		const token = border.strokeWeight + "px " + border.strokes[0].type;

		const name = kebabCase(border.name);
		borders[name] = token;
	});

	return borders;
};
