import { normalizeUnits } from "../../src/functions/normalizeUnits";

describe("It should throw an error if no parameter is provided", () => {
	test("Without first parameter", () => {
		expect(() => {
			// @ts-ignore
			normalizeUnits(undefined, "px", "em");
		}).toThrow();
	});

	test("Without second parameter", () => {
		expect(() => {
			// @ts-ignore
			normalizeUnits(123, undefined, "em");
		}).toThrow();
	});

	test("Without third parameter", () => {
		expect(() => {
			// @ts-ignore
			normalizeUnits(123, "px");
		}).toThrow();
	});
});

test("It should throw an error if parameters aren't the accepteds", () => {
	expect(() => {
		// @ts-ignore
		normalizeUnits(123, "%", "cm");
	}).toThrow();
});

describe("It should process the accepteds parameters", () => {
	test("Parameter 'currentUnit' as px (and parameter 'newUnit' as em)", () => {
		expect(normalizeUnits(123, "px", "em")).toBe("7.6875em");
	});

	test("Parameter 'currentUnit' as percent", () => {
		expect(normalizeUnits(123, "percent", "em")).toBe("7.6875em");
	});

	test("Parameter 'newUnit' as rem", () => {
		expect(normalizeUnits(123, "px", "rem")).toBe("7.6875rem");
	});

	test("Parameter 'newUnit' as unitless", () => {
		expect(normalizeUnits(123, "px", "unitless")).toBe("1.23");
	});
});
