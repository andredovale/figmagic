import kebabCase from "lodash/kebabCase";
import { Frame } from "../types/frame";

export const setupRadiusTokens = (frame: Frame) => {
	if (!frame) throw new Error("No frame for setupRadiusTokens()!");

	if (!frame.children || !frame.children.length)
		throw new Error(`The frame "${frame.name}" don't have children!`);

	const radii: { [key: string]: string } = {};

	for (let radius of frame.children) {
		const token = radius.cornerRadius + "px";

		const name = kebabCase(radius.name);
		radii[name] = token;
	}

	return radii;
};
