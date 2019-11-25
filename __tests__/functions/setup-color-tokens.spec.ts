import { setupColorTokens } from "../../src/functions/setup-color-tokens";
import { Frame } from "../../src/types/frame";

test("It should throw an error if no parameter is provided", () => {
	expect(() => {
		// @ts-ignore
		setupColorTokens();
	}).toThrow();
});

describe("It should throw an error if no children is provided", () => {
	test("Empty children", () => {
		expect(() => {
			setupColorTokens({ children: [], name: "Lorem ipsum " });
		}).toThrow();
	});

	test("None children", () => {
		expect(() => {
			// @ts-ignore
			setupColorTokens({ name: "Lorem ipsum " });
		}).toThrow();
	});
});

test("It should compose colors object", () => {
	const frame: Frame = {
		name: "color",
		children: [
			{
				...({} as Frame["children"][0]),
				fills: [{ color: { r: 0.2, g: 0.3, b: 0.4, a: 1 } }],
				name: "Lorem Ipsum"
			}
		]
	};
	const expected = { "lorem-ipsum": "rgba(51, 77, 102, 1)" };

	expect(setupColorTokens(frame)).toMatchObject(expected);
});
