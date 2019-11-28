import kebabCase from "lodash/kebabCase";
import { Frame } from "../types/frame";
import { recursiveSetup } from "./recursive-setup";

export const setupRadiusTokens = (frame: Frame) => {
	if (!frame) throw new Error("No frame for setupRadiusTokens()!");

	if (!frame.children || !frame.children.length)
		throw new Error(`The frame "${frame.name}" don't have children!`);

	const radii: { [key: string]: string } = {};

	recursiveSetup(frame.children, radius => {
		if (radius.type !== "RECTANGLE") return;

		let token;

		if (radius.rectangleCornerRadii) {
			token = radius.rectangleCornerRadii
				.map(radius => `${radius}px`)
				.join(" ");
		} else if (radius.cornerRadius) {
			token = `${radius.cornerRadius}px`;
		} else {
			token = "0";
		}

		const name = kebabCase(radius.name);
		radii[name] = token;
	});

	return radii;
};
