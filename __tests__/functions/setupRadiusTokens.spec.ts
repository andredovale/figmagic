import { setupRadiusTokens } from "../../src/functions/setupRadiusTokens";
import { Frame } from "../../src/types/frame";

test("It should throw an error if no parameter is provided", () => {
	expect(() => {
		// @ts-ignore
		setupRadiusTokens();
	}).toThrow();
});

test("It should compose radii object", () => {
	const frame: Frame = {
		name: "radius",
		children: [
			{
				...({} as Frame["children"][0]),
				cornerRadius: 4,
				name: "Lorem Ipsum"
			}
		]
	};
	const expected = { loremIpsum: "4px" };

	expect(setupRadiusTokens(frame)).toMatchObject(expected);
});
