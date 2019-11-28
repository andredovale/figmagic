import kebabCase from "lodash/kebabCase";
import { roundToDecimal } from "./round-to-decimal";
import { Frame } from "../types/frame";
import { recursiveSetup } from "./recursive-setup";

export const setupShadowTokens = (
	frame: Frame,
	styles: { [key: string]: { name: string } }
) => {
	if (!frame) throw new Error("No frame for setupShadowTokens()!");

	if (!frame.children || !frame.children.length)
		throw new Error(`The frame "${frame.name}" don't have children!`);

	const shadows: { [key: string]: string } = {};

	recursiveSetup(frame.children, shadow => {
		const shadowOffsetX = shadow.effects[0].offset.x + "px ";
		const shadowOffsetY = shadow.effects[0].offset.y + "px ";
		const shadowRadius = shadow.effects[0].radius + "px ";
		const shadowColorR = Math.round(shadow.effects[0].color.r * 255);
		const shadowColorG = Math.round(shadow.effects[0].color.g * 255);
		const shadowColorB = Math.round(shadow.effects[0].color.b * 255);
		const shadowColorA = roundToDecimal(shadow.effects[0].color.a * 1, 3);
		const shadowColor = `rgba(${shadowColorR}, ${shadowColorG}, ${shadowColorB}, ${shadowColorA})`;

		const token =
			shadowOffsetX + shadowOffsetY + shadowRadius + shadowColor;

		const name = kebabCase(
			styles[shadow.styles?.effect]?.name ?? shadow.name
		);
		shadows[name] = token;
	});

	return shadows;
};