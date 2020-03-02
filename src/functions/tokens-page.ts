import { Page } from "../types/page";
import { config } from "../config";

import { stringParser } from "./parse-string";

const { figmaPage } = config;

export const tokensPage = (figmaPages: Page[]): Page => {
	if (!figmaPages || !figmaPages.length)
		throw new Error("No pages provided to tokensPage()!");

	const targetPage = stringParser(figmaPage);

	let correctPage;

	for (let page of figmaPages) {
		if (stringParser(page.name) === targetPage) {
			correctPage = page;

			break;
		}
	}

	return correctPage as Page;
};
