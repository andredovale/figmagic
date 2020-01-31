import { processToken } from "../../src/functions/process-token";
import { Frame } from "../../src/types/frame";

describe("It should throw an error", () => {
	test("Without 'value' and 'token.fallback' parameter", () => {
		expect(() => {
			processToken(
				null,
				{
					frameName: "lorem",
					name: "ipsum",
					path: "dolor"
				},
				{} as Frame
			);
		}).toThrow();
	});

	test("With 'token.processValue' has 'color', but 'value' isn't a object", () => {
		expect(() => {
			processToken(
				true,
				{
					frameName: "lorem",
					name: "ipsum",
					path: "dolor",
					processValue: "color"
				},
				{} as Frame
			);
		}).toThrow();
	});

	test("With 'token.processValue' has 'color', but 'value' don't have the required keys", () => {
		expect(() => {
			processToken(
				{ r: 255, g: 0, b: 0 },
				{
					frameName: "lorem",
					name: "ipsum",
					path: "dolor",
					processValue: "color"
				},
				{} as Frame
			);
		}).toThrow();
	});

	test("With 'token.processValue' has 'color', but 'value' isn't a object", () => {
		expect(() => {
			processToken(
				true,
				{
					frameName: "lorem",
					name: "ipsum",
					path: "dolor",
					processValue: "font"
				},
				{} as Frame
			);
		}).toThrow();
	});

	test("With 'token.processValue' has 'grid', but 'value' isn't a array", () => {
		expect(() => {
			processToken(
				true,
				{
					frameName: "lorem",
					name: "ipsum",
					path: "dolor",
					processValue: "grid"
				},
				{} as Frame
			);
		}).toThrow();
	});

	test("With 'token.processValue' has 'grid', but 'value' don't have two minimum items", () => {
		expect(() => {
			processToken(
				[""],
				{
					frameName: "lorem",
					name: "ipsum",
					path: "dolor",
					processValue: "grid"
				},
				{} as Frame
			);
		}).toThrow();
	});

	test("With 'token.processValue' has 'radius', but 'value' isn't a array", () => {
		expect(() => {
			processToken(
				true,
				{
					frameName: "lorem",
					name: "ipsum",
					path: "dolor",
					processValue: "radius"
				},
				{} as Frame
			);
		}).toThrow();
	});

	test("With 'token.processValue' has 'shadow', but 'value' isn't a object", () => {
		expect(() => {
			processToken(
				true,
				{
					frameName: "lorem",
					name: "ipsum",
					path: "dolor",
					processValue: "shadow"
				},
				{} as Frame
			);
		}).toThrow();
	});
});

describe("It should return the processed token", () => {
	test("With fallback", () => {
		expect(
			processToken(
				null,
				{
					frameName: "lorem",
					name: "ipsum",
					path: "dolor",
					fallback: "sit"
				},
				{} as Frame
			)
		).toBe("sit");
	});

	test("Without 'token.processValue'", () => {
		expect(
			processToken(
				{},
				{
					frameName: "lorem",
					name: "ipsum",
					path: "dolor"
				},
				{} as Frame
			)
		).toBe("");
	});

	test("With 'token.processValue' has 'color'", () => {
		expect(
			processToken(
				{ r: 1, g: 0, b: 0, a: 0 },
				{
					frameName: "lorem",
					name: "ipsum",
					path: "dolor",
					processValue: "color"
				},
				{} as Frame
			)
		).toBe("rgba(255, 0, 0, 0)");
	});

	test("With 'token.processValue' has font", () => {
		const expected = { "lorem-ipsum": "dolor", "sit-amet": "et" };
		expect(
			processToken(
				{ loremIpsum: "dolor", sitAmet: "et" },
				{
					frameName: "lorem",
					name: "ipsum",
					path: "dolor",
					processValue: "font"
				},
				{} as Frame
			)
		).toMatchObject(expected);
	});

	test("With 'token.processValue' has font and 'value' as an falsy key", () => {
		expect(
			processToken(
				Object.create({ "": "" }),
				{
					frameName: "lorem",
					name: "ipsum",
					path: "dolor",
					processValue: "font"
				},
				{} as Frame
			)
		).toEqual({});
	});

	test("With 'token.processValue' has 'grid'", () => {
		const expected = {
			"column-count": 2,
			"column-width": "41.66666666666667%",
			gutter: "8.333333333333332%",
			"min-width": "240px"
		};
		expect(
			processToken(
				[
					{
						absoluteBoundingBox: {
							width: 100,
							x: 0
						}
					},
					{
						absoluteBoundingBox: {
							width: 100,
							x: 120
						}
					}
				],
				{
					frameName: "lorem",
					name: "ipsum",
					path: "dolor",
					processValue: "grid"
				},
				{
					absoluteBoundingBox: {
						width: 240
					}
				} as Frame
			)
		).toMatchObject(expected);
	});

	test("With 'token.processValue' has 'radius'", () => {
		const expected = "lorem ipsum dolor";
		expect(
			processToken(
				["lorem", "ipsum", "dolor"],
				{
					frameName: "lorem",
					name: "ipsum",
					path: "dolor",
					processValue: "radius"
				},
				{} as Frame
			)
		).toBe(expected);
	});

	test("With 'token.processValue' has 'shadow'", () => {
		const expected = "1px 2px 3px rgba(255, 0, 0, 0)";
		expect(
			processToken(
				{
					offset: {
						x: 1,
						y: 2
					},
					radius: 3,
					color: { r: 1, g: 0, b: 0, a: 0 }
				},
				{
					frameName: "lorem",
					name: "ipsum",
					path: "dolor",
					processValue: "shadow"
				},
				{} as Frame
			)
		).toBe(expected);
	});
});
