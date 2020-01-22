import _get from "lodash/get";
import _camelCase from "lodash/camelCase";
import _kebabCase from "lodash/kebabCase";
import _lowerCase from "lodash/lowerCase";
import _snakeCase from "lodash/snakeCase";
import _startCase from "lodash/startCase";
import _upperCase from "lodash/upperCase";
import { Frame } from "../types/frame";
import { Config } from "../types/config";
import { Page } from "../types/page";
import { config } from "../config";
import { processToken } from "./process-token";

const { outputNameFormat } = config;
const parseStringFormat = {
	camel: _camelCase,
	kebab: _kebabCase,
	lower: _lowerCase,
	snake: _snakeCase,
	start: _startCase,
	upper: _upperCase
};

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

	const tokens: { [key: string]: string } = {};

	const buildToken = (currentFrame: Frame, name?: string) => {
		if (token.style && !token.styleKey)
			throw new Error("styleKey don't founded");

		let key = name || _get(currentFrame, token.path);

		if (token.style) {
			key = styles[_get(currentFrame, `styles.${token.styleKey}`)].name;
		}

		const parsedKey = parseStringFormat[
			token.outputNameFormat || outputNameFormat
		](key);

		if (token.processValue) {
			tokens[parsedKey] = processToken(
				_get(currentFrame, token.path),
				token.processValue
			);
		} else {
			tokens[parsedKey] =
				(token.prefix || "") +
				String(_get(currentFrame, token.path)) +
				(token.suffix || "");
		}
	};

	for (const currentFrame of frame.children) {
		if (token.group && currentFrame.type === "GROUP") {
			for (const currentGroupFrame of (currentFrame as Page).children) {
				buildToken(currentGroupFrame, currentFrame.name);
			}
		} else if (!token.group) {
			if (currentFrame.children) {
				for (const currentGroupFrame of (currentFrame as Page)
					.children) {
					buildToken(currentGroupFrame, currentFrame.name);
				}
				continue;
			}
			buildToken(currentFrame);
		}
	}

	return tokens;
};
