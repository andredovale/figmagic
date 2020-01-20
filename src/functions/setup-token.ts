import _kebabCase from "lodash/kebabCase";
import { Frame } from "../types/frame";
import { recursiveSetup } from "./recursive-setup";
import { Config } from "../types/config";
import { Page } from "../types/page";

export const setupToken = (
	token: Config["tokens"][0],
	page: Page,
	styles: { [key: string]: { name: string } }
) => {
	const frame = page.children.filter(
		frame => _kebabCase(frame.name) === _kebabCase(token.frameName)
	)[0];

	if (!frame) throw new Error("No frame for setupToken()!");

	if (!frame.children || !frame.children.length)
		throw new Error(`The frame "${frame.name}" don't have children!`);

	const animations: { [key: string]: string } = {};

	recursiveSetup(frame.children, animation => {
		const token = animation.absoluteBoundingBox.width + "ms";

		const name = _kebabCase(animation.name);
		animations[name] = token;
	});

	return animations;
};
