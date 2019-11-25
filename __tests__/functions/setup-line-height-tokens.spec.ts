import { setupLineHeightTokens } from "../../src/functions/setup-line-height-tokens";
import { Frame } from "../../src/types/frame";

test("It should throw an error if no parameter is provided", () => {
	expect(() => {
		// @ts-ignore
		setupLineHeightTokens();
	}).toThrow();
});

describe("It should throw an error if no children is provided", () => {
	test("Empty children", () => {
		expect(() => {
			setupLineHeightTokens({ children: [], name: "Lorem ipsum " });
		}).toThrow();
	});

	test("None children", () => {
		expect(() => {
			// @ts-ignore
			setupLineHeightTokens({ name: "Lorem ipsum " });
		}).toThrow();
	});
});

test("It should compose lineHeights object", () => {
	const frame: Frame = {
		name: "lineHeight",
		children: [
			{
				...({} as Frame["children"][0]),
				name: "Lorem Ipsum",
				style: {
					...({} as Frame["children"][0]["style"]),
					lineHeightPx: 24
				}
			}
		]
	};
	const expected = { "lorem-ipsum": "1.5rem" };

	expect(setupLineHeightTokens(frame)).toMatchObject(expected);
});
