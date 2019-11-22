import { setupFontTokens } from "../../src/functions/setupFontTokens";
import { Frame } from "../../src/types/frame";

test("It should throw an error if no parameter is provided", () => {
	expect(() => {
		// @ts-ignore
		setupFontTokens();
	}).toThrow();
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
		loremIpsum: { name: "Arial Narrow", postScript: "ArialNarrow" }
	};

	expect(setupFontTokens(frame)).toMatchObject(expected);
});
