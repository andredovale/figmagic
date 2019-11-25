import kebabCase from "lodash/kebabCase";
import { normalizeUnits } from "./normalize-units";
import { Frame } from "../types/frame";

export const setupLineHeightTokens = (frame: Frame) => {
	if (!frame) throw new Error("No frame for setupLineHeightTokens()!");

	if (!frame.children || !frame.children.length)
		throw new Error(`The frame "${frame.name}" don't have children!`);

	const lineHeights: { [key: string]: string | void } = {};

	for (let lineHeight of frame.children) {
		const token = normalizeUnits(
			lineHeight.style.lineHeightPx,
			"px",
			"rem"
		);

		const name = kebabCase(lineHeight.name);
		lineHeights[name] = token;
	}

	return lineHeights;
};
