import { setupFontWeightTokens } from "../../src/functions/setupFontWeightTokens";
import { Frame } from "../../src/types/frame";

test("It should throw an error if no parameter is provided", () => {
	expect(() => {
		// @ts-ignore
		setupFontWeightTokens();
	}).toThrow();
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
	const expected = { loremIpsum: 900 };

	expect(setupFontWeightTokens(frame)).toMatchObject(expected);
});
