import { Page } from "../types/page";

export const createPage = (figmaPages: Page[]): Page => {
	if (!figmaPages || !figmaPages.length)
		throw new Error("No pages provided to createPage()!");

	const targetPage =
		process.env.FIGMA_PAGE?.trim()
			.toLowerCase()
			.replace(" ", "") ?? "designtokens";

	let correctPage;

	for (let page of figmaPages) {
		const fixedPageName = page.name.toLowerCase().replace(" ", "");

		if (fixedPageName === targetPage) {
			correctPage = page;

			break;
		}
	}

	return correctPage as Page;
};