import kebabCase from "lodash/kebabCase";
import { Frame } from "../types/frame";

export const setupGridTokens = (frame: Frame) => {
	if (!frame) throw new Error("No frame for setupGridTokens()!");

	if (!frame.children || !frame.children.length)
		throw new Error(`The frame "${frame.name}" don't have children!`);

	if (frame.name.toLowerCase().match("module")) return;

	const grid: {
		"column-count": number;
		"column-width": string;
		gutter: string;
		"min-width": string;
	} = {
		"column-count": 1,
		"column-width": "100%",
		gutter: "0%",
		"min-width": "0px"
	};

	grid["column-count"] = frame.children.length;

	const columnWidth = frame.children[0].absoluteBoundingBox.width;
	const canvasWidth = frame.absoluteBoundingBox.width;

	grid["column-width"] = `${(columnWidth / canvasWidth) * 100}%`;

	grid.gutter = `${((frame.children[1].absoluteBoundingBox.x -
		(frame.children[0].absoluteBoundingBox.x + columnWidth)) /
		canvasWidth) *
		100}%`;

	grid["min-width"] = `${canvasWidth}px`;

	return grid;
};
