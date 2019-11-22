import { camelize } from "./camelize";
import { formatName } from "./formatName";
import { normalizeUnits } from "./normalizeUnits";
import { Frame } from "../types/frame";

export const setupLineHeightTokens = (frame: Frame) => {
	if (!frame) throw new Error("No frame for setupLineHeightTokens()!");

	const lineHeights: { [key: string]: string | void } = {};

	for (let lineHeight of frame.children) {
		const token = normalizeUnits(
			lineHeight.style.lineHeightPx,
			"px",
			"rem"
		);

		const name = formatName(camelize(lineHeight.name));
		lineHeights[name] = token;
	}

	return lineHeights;
};
