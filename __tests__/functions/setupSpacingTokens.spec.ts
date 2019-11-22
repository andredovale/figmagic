import { setupSpacingTokens } from "../../src/functions/setupSpacingTokens";
import { Frame } from "../../src/types/frame";

test("It should throw an error if no parameter is provided", () => {
	expect(() => {
		// @ts-ignore
		setupSpacingTokens();
	}).toThrow();
});

test("It should compose spacings object", () => {
	const frame: Frame = {
		name: "spacing",
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
	const expected = { loremIpsum: "0.125rem" };

	expect(setupSpacingTokens(frame)).toMatchObject(expected);
});
