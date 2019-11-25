import { roundToDecimal } from "../../src/functions/round-to-decimal";

test("It should throw an error if no first parameter is provided", () => {
	expect(() => {
		// @ts-ignore
		roundToDecimal(undefined, 123);
	}).toThrow();
});

describe("It should round a value into a simple integer", () => {
	test("It should round a value to 'floor'", () => {
		expect(roundToDecimal(0.123456789)).toBe(0);
	});

	test("It should round a value to 'ceil'", () => {
		expect(roundToDecimal(0.987654321)).toBe(1);
	});
});

test("It should round a value into a decimal with six decimals places", () => {
	expect(roundToDecimal(0.123456789, 6)).toBe(0.123457);
});
