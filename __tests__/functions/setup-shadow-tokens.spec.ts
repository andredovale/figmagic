import { setupShadowTokens } from "../../src/functions/setup-shadow-tokens";
import { Frame } from "../../src/types/frame";

test("It should throw an error if no parameter is provided", () => {
	expect(() => {
		// @ts-ignore
		setupShadowTokens();
	}).toThrow();
});

describe("It should throw an error if no children is provided", () => {
	test("Empty children", () => {
		expect(() => {
			setupShadowTokens({ children: [], name: "Lorem ipsum " });
		}).toThrow();
	});

	test("None children", () => {
		expect(() => {
			// @ts-ignore
			setupShadowTokens({ name: "Lorem ipsum " });
		}).toThrow();
	});
});

test("It should compose shadows object", () => {
	const frame: Frame = {
		name: "shadow",
		children: [
			{
				...({} as Frame["children"][0]),
				effects: [
					{
						offset: { x: 100, y: 100 },
						radius: 4,
						color: { r: 0.2, g: 0.3, b: 0.4, a: 1 }
					}
				],
				name: "Lorem Ipsum"
			}
		]
	};
	const expected = { "lorem-ipsum": "100px 100px 4px rgba(51, 77, 102, 1)" };

	expect(setupShadowTokens(frame)).toMatchObject(expected);
});
