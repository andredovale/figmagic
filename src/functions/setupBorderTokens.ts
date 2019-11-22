import { camelize } from "./camelize";
import { formatName } from "./formatName";
import { Frame } from "../types/frame";

export const setupBorderTokens = (frame: Frame) => {
	if (!frame) throw new Error("No frame for setupBorderTokens()!");

	const borders: { [key: string]: string } = {};

	for (let border of frame.children) {
		const token = border.strokeWeight + "px " + border.strokes[0].type;

		const name = formatName(camelize(border.name));
		borders[name] = token;
	}

	return borders;
};
