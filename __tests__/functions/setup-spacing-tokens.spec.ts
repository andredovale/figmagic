import { setupSpacingTokens } from "../../src/functions/setup-spacing-tokens";
import { Frame } from "../../src/types/frame";

test("It should throw an error if no parameter is provided", () => {
	expect(() => {
		// @ts-ignore
		setupSpacingTokens();
	}).toThrow();
});

describe("It should throw an error if no children is provided", () => {
	test("Empty children", () => {
		expect(() => {
			setupSpacingTokens({ children: [], name: "Lorem ipsum " });
		}).toThrow();
	});

	test("None children", () => {
		expect(() => {
			// @ts-ignore
			setupSpacingTokens({ name: "Lorem ipsum " });
		}).toThrow();
	});
});

test("It should compose spacings object", () => {
	const frame: Frame = {
		name: "spacing",
		children: [
			{
				...({} as Frame["children"][0]),
				absoluteBoundingBox: {
					width: 2
				},
				name: "Lorem Ipsum"
			}
		]
	};
	const expected = { "lorem-ipsum": "0.125rem" };

	expect(setupSpacingTokens(frame)).toMatchObject(expected);
});
