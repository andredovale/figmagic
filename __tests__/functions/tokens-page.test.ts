import { tokensPage } from "../../src/functions/tokens-page";
import { Page } from "../../src/types/page";

jest.mock("../../src/config", () => ({
	config: {
		figmaPage: "Design Tokens",
		outputNameFormat: "kebab"
	}
}));

describe("It should throw an error", () => {
	test("Without 'figmaPages'", () => {
		expect(() => {
			// @ts-ignore
			tokensPage();
		}).toThrow();
	});

	test("Without length on 'figmaPages'", () => {
		expect(() => {
			tokensPage([]);
		}).toThrow();
	});
});

describe("It should return", () => {
	test("An undefined value", () => {
		expect(
			tokensPage([{ name: "Lorem ipsum dolor" } as Page])
		).toBeUndefined();
	});

	test("The correct page", () => {
		const mock = { name: "DesignTokens" };
		expect(tokensPage([mock as Page])).toMatchObject({
			name: "DesignTokens"
		});
	});
});
