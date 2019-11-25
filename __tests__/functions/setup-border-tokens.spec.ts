import { setupBorderTokens } from "../../src/functions/setup-border-tokens";
import { Frame } from "../../src/types/frame";

test("It should throw an error if no parameter is provided", () => {
	expect(() => {
		// @ts-ignore
		setupBorderTokens();
	}).toThrow();
});

describe("It should throw an error if no children is provided", () => {
	test("Empty children", () => {
		expect(() => {
			setupBorderTokens({ children: [], name: "Lorem ipsum " });
		}).toThrow();
	});

	test("None children", () => {
		expect(() => {
			// @ts-ignore
			setupBorderTokens({ name: "Lorem ipsum " });
		}).toThrow();
	});
});

test("It should compose borders object", () => {
	const frame: Frame = {
		name: "border",
		children: [
			{
				...({} as Frame["children"][0]),
				name: "Lorem Ipsum",
				strokeWeight: 2,
				strokes: [{ type: "solid" }]
			}
		]
	};
	const expected = { "lorem-ipsum": "2px solid" };

	expect(setupBorderTokens(frame)).toMatchObject(expected);
});
