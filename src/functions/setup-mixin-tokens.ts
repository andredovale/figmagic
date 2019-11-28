import kebabCase from "lodash/kebabCase";
import { Frame } from "../types/frame";

export const setupMixinTokens = (frame: Frame) => {
	if (!frame) throw new Error("No frame for setupMixinTokens()!");

	if (!frame.children || !frame.children.length)
		throw new Error(`The frame "${frame.name}" don't have children!`);

	const mixins: { [key: string]: string | void } = {};

	for (let mixin of frame.children) {
		if (mixin.type !== "GROUP" || !mixin.children) continue;

		const token = mixin.children[0].characters;

		const name = kebabCase(mixin.name);

		mixins[name] = token;
	}

	return mixins;
};
