import { setupLineHeightTokens } from "../../src/functions/setupLineHeightTokens";
import { Frame } from "../../src/types/frame";

test("It should throw an error if no parameter is provided", () => {
	expect(() => {
		// @ts-ignore
		setupLineHeightTokens();
	}).toThrow();
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
	const expected = { loremIpsum: "1.5rem" };

	expect(setupLineHeightTokens(frame)).toMatchObject(expected);
});
