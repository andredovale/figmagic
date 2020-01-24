import _get from "lodash/get";
import { Frame } from "../types/frame";
import { Config } from "../types/config";
import { Page } from "../types/page";
import { processToken } from "./process-token";
import { stringParser } from "./parse-string";

export const setupToken = (
	token: Config["tokens"][0],
	page: Page,
	styles: { [key: string]: { name: string } }
) => {
	const tokens: { [key: string]: string | {} } = {};

	const buildToken = (currentFrame: Frame, name?: string) => {
		if (token.type && stringParser(currentFrame.type) !== token.type)
			return;

		if (token.style && !token.styleKey)
			throw new Error("styleKey don't founded");

		let key = name || _get(currentFrame, token.path);

		if (token.style) {
			key = styles[_get(currentFrame, `styles.${token.styleKey}`)].name;
		}

		if (typeof key !== "string") {
			key = currentFrame.characters || currentFrame.name;
		}

		const parsedKey = stringParser(key, token.outputNameFormat);

		if (token.processValue) {
			tokens[parsedKey] = processToken(
				_get(currentFrame, token.path),
				token,
				currentFrame
			);
		} else if (!token.processValue) {
			tokens[parsedKey] = `${token.prefix || ""}${_get(
				currentFrame,
				token.path
			)}${token.suffix || ""}`;
		}
	};

	const processFrame = (frame: Frame) => {
		if (!frame.children || !frame.children.length)
			throw new Error(`The frame "${frame.name}" don't have children!`);

		const recursive = (currentFrame: Frame) => {
			if (token.group && currentFrame.type === "GROUP") {
				for (const currentGroupFrame of (currentFrame as Page)
					.children) {
					buildToken(currentGroupFrame, currentFrame.name);
				}
			} else if (!token.group) {
				if (currentFrame.children && token.path !== "children") {
					for (const currentGroupFrame of (currentFrame as Page)
						.children) {
						recursive(currentGroupFrame);
						// buildToken(currentGroupFrame, currentFrame.name);
					}
					return;
				}
				buildToken(currentFrame);
			}
		};

		if (token.path !== "children") {
			for (const currentFrame of frame.children) {
				recursive(currentFrame);
			}
		} else {
			recursive(frame);
		}
	};

	if (Array.isArray(token.frameName)) {
		let frames: Frame[] = [];

		for (const frameName of token.frameName) {
			frames.push(
				page.children.filter(
					frame =>
						stringParser(frame.name) === stringParser(frameName)
				)[0]
			);
		}

		if (!frames.length) throw new Error("No frame for setupToken()!");

		for (const frame of frames) {
			processFrame(frame);
		}
	} else {
		const frame = page.children.filter(
			frame =>
				stringParser(frame.name) ===
				stringParser(token.frameName as string)
		)[0];

		if (!frame) throw new Error("No frame for setupToken()!");

		processFrame(frame);
	}

	return tokens;
};
