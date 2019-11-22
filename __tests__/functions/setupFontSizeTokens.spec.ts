import { setupFontSizeTokens } from "../../src/functions/setupFontSizeTokens";
import { Frame } from "../../src/types/frame";

test("It should throw an error if no parameter is provided", () => {
	expect(() => {
		// @ts-ignore
		setupFontSizeTokens();
	}).toThrow();
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
	const expected = { loremIpsum: "1rem" };

	expect(setupFontSizeTokens(frame)).toMatchObject(expected);
});
