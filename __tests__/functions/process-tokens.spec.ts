import { processTokens } from "../../src/functions/process-tokens";
import { Frame } from "../../src/types/frame";

describe("It should throw an error if no parameter is provided", () => {
	test("Without first parameter", () => {
		expect(() => {
			// @ts-ignore
			processTokens(undefined, "Lorem Ipsum");
		}).toThrow();
	});

	test("Without second parameter", () => {
		expect(() => {
			// @ts-ignore
			processTokens({});
		}).toThrow();
	});
});

describe("It should enter in all cases of switch", () => {
	const frame: Frame = {
		name: "lorem",
		children: [
			{
				absoluteBoundingBox: {
					width: 2
				},
				cornerRadius: 4,
				effects: [
					{
						offset: { x: 100, y: 100 },
						radius: 4,
						color: { r: 0.2, g: 0.3, b: 0.4, a: 1 }
					}
				],
				fills: [{ color: { r: 0.2, g: 0.3, b: 0.4, a: 1 } }],
				name: "Lorem Ipsum",
				strokeWeight: 2,
				strokes: [{ type: "solid" }],
				style: {
					...({} as Frame["children"][0]["style"]),
					fontFamily: "Arial Narrow",
					fontPostScriptName: "ArialNarrow",
					fontSize: 16,
					fontWeight: 900,
					lineHeightPx: 24
				}
			}
		]
	};

	const mock = [
		{ sheet: frame, name: "animation" },
		{ sheet: frame, name: "border" },
		{ sheet: frame, name: "color" },
		{ sheet: frame, name: "fontSize" },
		{ sheet: frame, name: "fontFamily" },
		{ sheet: frame, name: "fontWeight" },
		{ sheet: frame, name: "lineHeight" },
		{ sheet: frame, name: "radius" },
		{ sheet: frame, name: "shadow" },
		{ sheet: frame, name: "spacing" }
	];

	for (const item of mock) {
		test(`Case: ${item.name}`, () => {
			expect(processTokens(item.sheet, item.name)).toBeInstanceOf(Object);
		});
	}
});
