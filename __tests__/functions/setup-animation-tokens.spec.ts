import { setupAnimationTokens } from "../../src/functions/setup-animation-tokens";
import { Frame } from "../../src/types/frame";

test("It should throw an error if no parameter is provided", () => {
	expect(() => {
		// @ts-ignore
		setupAnimationTokens();
	}).toThrow();
});

describe("It should throw an error if no children is provided", () => {
	test("Empty children", () => {
		expect(() => {
			setupAnimationTokens({ children: [], name: "Lorem ipsum " });
		}).toThrow();
	});

	test("None children", () => {
		expect(() => {
			// @ts-ignore
			setupAnimationTokens({ name: "Lorem ipsum " });
		}).toThrow();
	});
});

test("It should compose animations object", () => {
	const frame: Frame = {
		name: "animation",
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
	const expected = { "lorem-ipsum": "2ms" };

	expect(setupAnimationTokens(frame)).toMatchObject(expected);
});
