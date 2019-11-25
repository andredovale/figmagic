import { setupRadiusTokens } from "../../src/functions/setup-radius-tokens";
import { Frame } from "../../src/types/frame";

test("It should throw an error if no parameter is provided", () => {
	expect(() => {
		// @ts-ignore
		setupRadiusTokens();
	}).toThrow();
});

describe("It should throw an error if no children is provided", () => {
	test("Empty children", () => {
		expect(() => {
			setupRadiusTokens({ children: [], name: "Lorem ipsum " });
		}).toThrow();
	});

	test("None children", () => {
		expect(() => {
			// @ts-ignore
			setupRadiusTokens({ name: "Lorem ipsum " });
		}).toThrow();
	});
});

test("It should compose radii object", () => {
	const frame: Frame = {
		name: "radius",
		children: [
			{
				...({} as Frame["children"][0]),
				cornerRadius: 4,
				name: "Lorem Ipsum"
			}
		]
	};
	const expected = { "lorem-ipsum": "4px" };

	expect(setupRadiusTokens(frame)).toMatchObject(expected);
});
