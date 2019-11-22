import { createPage } from "../../src/functions/createPage";
import { Page } from "../../src/types/page";

test("It should throw an error if no parameter is provided", () => {
	expect(() => {
		// @ts-ignore
		createPage();
	}).toThrow();
});

test("It should throw an error if array is empty", () => {
	const figmaPages: Page[] = [];
	expect(() => {
		createPage(figmaPages);
	}).toThrow();
});

test("It should process the array and return the 'Design Tokens' page", () => {
	const correctPage: Page = {
		name: "Design Tokens",
		children: []
	};

	const figmaPages: Page[] = [
		{
			name: "Lorem Ipsum",
			children: []
		},
		correctPage
	];

	expect(createPage(figmaPages)).toMatchObject(correctPage);
});
