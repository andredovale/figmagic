import { processTokens } from "../../src/functions/processTokens";
import { Frame } from "../../src/types/frame";

describe("It should throw an error if no parameter is provided", () => {
	test("Without first parameter", () => {
		expect(() => {
			// @ts-ignore
			processTokens(undefined, "Lorem Ipsum");
		}).toThrow();
	});

	test("Without second parameter", () => {
		expect(() => {
			// @ts-ignore
			processTokens({});
		}).toThrow();
	});
});

describe("It should enter in all cases of switch", () => {
	const frame: Frame = { name: "lorem", children: [] };
	const mock = [
		{ sheet: frame, name: "animation" },
		{ sheet: frame, name: "border" },
		{ sheet: frame, name: "color" },
		{ sheet: frame, name: "fontSize" },
		{ sheet: frame, name: "fontFamily" },
		{ sheet: frame, name: "fontWeight" },
		{ sheet: frame, name: "lineHeight" },
		{ sheet: frame, name: "radius" },
		{ sheet: frame, name: "shadow" },
		{ sheet: frame, name: "spacing" }
	];

	for (const item of mock) {
		test(`Case: ${item.name}`, () => {
			expect(processTokens(item.sheet, item.name)).toBeInstanceOf(Object);
		});
	}
});
