import _kebabCase from "lodash/kebabCase";

import { config } from "../config";
import { Page } from "../types/page";

const { figmaPage } = config;

export const tokensPage = (figmaPages: Page[]): Page => {
	if (!figmaPages || !figmaPages.length)
		throw new Error("No pages provided to tokensPage()!");

	const targetPage = _kebabCase(figmaPage);

	let correctPage;

	for (let page of figmaPages) {
		if (_kebabCase(page.name) === targetPage) {
			correctPage = page;

			break;
		}
	}

	return correctPage as Page;
};
