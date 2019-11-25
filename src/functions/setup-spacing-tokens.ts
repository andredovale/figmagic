import kebabCase from "lodash/kebabCase";
import { normalizeUnits } from "./normalize-units";
import { Frame } from "../types/frame";

export const setupSpacingTokens = (frame: Frame) => {
	if (!frame) throw new Error("No frame for setupSpacingTokens()!");

	if (!frame.children || !frame.children.length)
		throw new Error(`The frame "${frame.name}" don't have children!`);

	const spacings: { [key: string]: string | void } = {};

	for (let spacing of frame.children) {
		const token = normalizeUnits(
			spacing.absoluteBoundingBox.width,
			"px",
			"rem"
		);

		const name = kebabCase(spacing.name);
		spacings[name] = token;
	}

	return spacings;
};
