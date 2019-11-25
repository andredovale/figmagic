import { setupFontWeightTokens } from "../../src/functions/setup-font-weight-tokens";
import { Frame } from "../../src/types/frame";

test("It should throw an error if no parameter is provided", () => {
	expect(() => {
		// @ts-ignore
		setupFontWeightTokens();
	}).toThrow();
});

describe("It should throw an error if no children is provided", () => {
	test("Empty children", () => {
		expect(() => {
			setupFontWeightTokens({ children: [], name: "Lorem ipsum " });
		}).toThrow();
	});

	test("None children", () => {
		expect(() => {
			// @ts-ignore
			setupFontWeightTokens({ name: "Lorem ipsum " });
		}).toThrow();
	});
});

test("It should compose fontWeights object", () => {
	const frame: Frame = {
		name: "fontWeight",
		children: [
			{
				...({} as Frame["children"][0]),
				name: "Lorem Ipsum",
				style: {
					...({} as Frame["children"][0]["style"]),
					fontWeight: 900
				}
			}
		]
	};
	const expected = { "lorem-ipsum": 900 };

	expect(setupFontWeightTokens(frame)).toMatchObject(expected);
});
