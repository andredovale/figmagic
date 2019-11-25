import kebabCase from "lodash/kebabCase";
import { roundToDecimal } from "./round-to-decimal";
import { Frame } from "../types/frame";

export const setupColorTokens = (frame: Frame) => {
	if (!frame) throw new Error("No frame for setupColorTokens()!");

	if (!frame.children || !frame.children.length)
		throw new Error(`The frame "${frame.name}" don't have children!`);

	const colors: { [key: string]: string } = {};

	for (let color of frame.children) {
		const colorR = Math.round(color.fills[0].color.r * 255);
		const colorG = Math.round(color.fills[0].color.g * 255);
		const colorB = Math.round(color.fills[0].color.b * 255);
		const colorA = roundToDecimal(color.fills[0].color.a * 1, 3);

		const token = `rgba(${colorR}, ${colorG}, ${colorB}, ${colorA})`;

		const name = kebabCase(color.name);
		colors[name] = token;
	}

	return colors;
};
