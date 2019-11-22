import { setupColorTokens } from "../../src/functions/setupColorTokens";
import { Frame } from "../../src/types/frame";

test("It should throw an error if no parameter is provided", () => {
	expect(() => {
		// @ts-ignore
		setupColorTokens();
	}).toThrow();
});

test("It should compose colors object", () => {
	const frame: Frame = {
		name: "color",
		children: [
			{
				...({} as Frame["children"][0]),
				fills: [{ color: { r: 0.2, g: 0.3, b: 0.4, a: 1 } }],
				name: "Lorem Ipsum"
			}
		]
	};
	const expected = { loremIpsum: "rgba(51, 77, 102, 1)" };

	expect(setupColorTokens(frame)).toMatchObject(expected);
});
