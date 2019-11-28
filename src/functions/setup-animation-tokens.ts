import kebabCase from "lodash/kebabCase";
import { Frame } from "../types/frame";
import { recursiveSetup } from "./recursive-setup";

export const setupAnimationTokens = (frame: Frame) => {
	if (!frame) throw new Error("No frame for setupAnimationTokens()!");

	if (!frame.children || !frame.children.length)
		throw Error(`The frame "${frame.name}" don't have children!`);

	const animations: { [key: string]: string } = {};

	recursiveSetup(frame.children, animation => {
		const token = animation.absoluteBoundingBox.width + "ms";

		const name = kebabCase(animation.name);
		animations[name] = token;
	});

	return animations;
};
