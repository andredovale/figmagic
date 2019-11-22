import { setupBorderTokens } from "../../src/functions/setupBorderTokens";
import { Frame } from "../../src/types/frame";

test("It should throw an error if no parameter is provided", () => {
	expect(() => {
		// @ts-ignore
		setupBorderTokens();
	}).toThrow();
});

test("It should compose borders object", () => {
	const frame: Frame = {
		name: "border",
		children: [
			{
				...({} as Frame["children"][0]),
				name: "Lorem Ipsum",
				strokeWeight: 2,
				strokes: [{ type: "solid" }]
			}
		]
	};
	const expected = { loremIpsum: "2px solid" };

	expect(setupBorderTokens(frame)).toMatchObject(expected);
});
