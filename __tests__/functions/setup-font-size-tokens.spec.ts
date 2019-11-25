import { setupFontSizeTokens } from "../../src/functions/setup-font-size-tokens";
import { Frame } from "../../src/types/frame";

test("It should throw an error if no parameter is provided", () => {
	expect(() => {
		// @ts-ignore
		setupFontSizeTokens();
	}).toThrow();
});

describe("It should throw an error if no children is provided", () => {
	test("Empty children", () => {
		expect(() => {
			setupFontSizeTokens({ children: [], name: "Lorem ipsum " });
		}).toThrow();
	});

	test("None children", () => {
		expect(() => {
			// @ts-ignore
			setupFontSizeTokens({ name: "Lorem ipsum " });
		}).toThrow();
	});
});

test("It should compose fontSizes object", () => {
	const frame: Frame = {
		name: "fontSize",
		children: [
			{
				...({} as Frame["children"][0]),
				name: "Lorem Ipsum",
				style: {
					...({} as Frame["children"][0]["style"]),
					fontSize: 16
				}
			}
		]
	};
	const expected = { "lorem-ipsum": "1rem" };

	expect(setupFontSizeTokens(frame)).toMatchObject(expected);
});
