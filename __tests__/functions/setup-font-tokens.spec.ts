import { setupFontTokens } from "../../src/functions/setup-font-tokens";
import { Frame } from "../../src/types/frame";

test("It should throw an error if no parameter is provided", () => {
	expect(() => {
		// @ts-ignore
		setupFontTokens();
	}).toThrow();
});

describe("It should throw an error if no children is provided", () => {
	test("Empty children", () => {
		expect(() => {
			setupFontTokens({ children: [], name: "Lorem ipsum " });
		}).toThrow();
	});

	test("None children", () => {
		expect(() => {
			// @ts-ignore
			setupFontTokens({ name: "Lorem ipsum " });
		}).toThrow();
	});
});

test("It should compose fonts object", () => {
	const frame: Frame = {
		name: "font",
		children: [
			{
				...({} as Frame["children"][0]),
				name: "Lorem Ipsum",
				style: {
					...({} as Frame["children"][0]["style"]),
					fontFamily: "Arial Narrow",
					fontPostScriptName: "ArialNarrow"
				}
			}
		]
	};
	const expected = {
		"lorem-ipsum": { name: "Arial Narrow", "post-script": "ArialNarrow" }
	};

	expect(setupFontTokens(frame)).toMatchObject(expected);
});
