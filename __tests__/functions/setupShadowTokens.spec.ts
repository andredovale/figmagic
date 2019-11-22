import { setupShadowTokens } from "../../src/functions/setupShadowTokens";
import { Frame } from "../../src/types/frame";

test("It should throw an error if no parameter is provided", () => {
	expect(() => {
		// @ts-ignore
		setupShadowTokens();
	}).toThrow();
});

test("It should compose shadows object", () => {
	const frame: Frame = {
		name: "shadow",
		children: [
			{
				...({} as Frame["children"][0]),
				effects: [
					{
						offset: { x: 100, y: 100 },
						radius: 4,
						color: { r: 0.2, g: 0.3, b: 0.4, a: 1 }
					}
				],
				name: "Lorem Ipsum"
			}
		]
	};
	const expected = { loremIpsum: "100px 100px 4px rgba(51, 77, 102, 1)" };

	expect(setupShadowTokens(frame)).toMatchObject(expected);
});
