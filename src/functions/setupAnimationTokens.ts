import { camelize } from "./camelize";
import { formatName } from "./formatName";
import { Frame } from "../types/frame";

export const setupAnimationTokens = (frame: Frame) => {
	if (!frame) throw new Error("No frame for setupAnimationTokens()!");

	const animations: { [key: string]: string } = {};

	for (let animation of frame.children) {
		const token = animation.absoluteBoundingBox.width + "ms";

		const name = formatName(camelize(animation.name));
		animations[name] = token;
	}

	return animations;
};
