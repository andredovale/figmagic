import kebabCase from "lodash/kebabCase";
import { roundToDecimal } from "./round-to-decimal";
import { Frame } from "../types/frame";
import { recursiveSetup } from "./recursive-setup";

export const setupColorTokens = (
	frame: Frame,
	styles: { [key: string]: { name: string } }
) => {
	if (!frame) throw new Error("No frame for setupColorTokens()!");

	if (!frame.children || !frame.children.length)
		throw new Error(`The frame "${frame.name}" don't have children!`);

	const colors: { [key: string]: string } = {};

	recursiveSetup(frame.children, color => {
		const colorR = Math.round(color.fills[0].color.r * 255);
		const colorG = Math.round(color.fills[0].color.g * 255);
		const colorB = Math.round(color.fills[0].color.b * 255);
		const colorA = roundToDecimal(color.fills[0].color.a * 1, 3);

		const token = `rgba(${colorR}, ${colorG}, ${colorB}, ${colorA})`;

		const name = kebabCase(styles[color.styles?.fill]?.name ?? color.name);
		colors[name] = token;
	});

	return colors;
};
