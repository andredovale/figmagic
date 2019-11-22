import { camelize } from "./camelize";
import { formatName } from "./formatName";
import { Frame } from "../types/frame";

export const setupRadiusTokens = (frame: Frame) => {
	if (!frame) throw new Error("No frame for setupRadiusTokens()!");

	const radii: { [key: string]: string } = {};

	for (let radius of frame.children) {
		const token = radius.cornerRadius + "px";

		const name = formatName(camelize(radius.name));
		radii[name] = token;
	}

	return radii;
};
