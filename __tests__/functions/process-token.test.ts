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

	test("With 'token.processValue' has color", () => {
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
});
