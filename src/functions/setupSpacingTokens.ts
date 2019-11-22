import { camelize } from "./camelize";
import { formatName } from "./formatName";
import { normalizeUnits } from "./normalizeUnits";
import { Frame } from "../types/frame";

export const setupSpacingTokens = (frame: Frame) => {
	if (!frame) throw new Error("No frame for setupSpacingTokens()!");

	const spacings: { [key: string]: string | void } = {};

	for (let spacing of frame.children) {
		const token = normalizeUnits(
			spacing.absoluteBoundingBox.width,
			"px",
			"rem"
		);

		const name = formatName(camelize(spacing.name));
		spacings[name] = token;
	}

	return spacings;
};
