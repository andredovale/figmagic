import { setupAnimationTokens } from "../../src/functions/setupAnimationTokens";
import { Frame } from "../../src/types/frame";

test("It should throw an error if no parameter is provided", () => {
	expect(() => {
		// @ts-ignore
		setupAnimationTokens();
	}).toThrow();
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
	const expected = { loremIpsum: "2ms" };

	expect(setupAnimationTokens(frame)).toMatchObject(expected);
});
