import { roundToDecimal } from "../../src/functions/round-to-decimal";

describe("It should throw an error", () => {
	test("If no first parameter is provided", () => {
		expect(() => {
			// @ts-ignore
			roundToDecimal(undefined);
		}).toThrow();
	});

	test("If invalid number has first parameter is provided", () => {
		expect(() => {
			// @ts-ignore
			roundToDecimal("Lorem Ipsum");
		}).toThrow();
	});
});

describe("It should round a value into a simple integer", () => {
	test("It should round a value to 'floor'", () => {
		expect(roundToDecimal(0.123456789)).toBe(0);
	});

	test("It should round a value to 'ceil'", () => {
		expect(roundToDecimal(0.987654321)).toBe(1);
	});

	test("With negative number", () => {
		expect(roundToDecimal(-1.1)).toBe(-1);
	});
});

test("It should round a value into a decimal with six decimals places", () => {
	expect(roundToDecimal(0.123456789, 6)).toBe(0.123457);
});

test("It should return zero if zero has first parameter is provided", () => {
	expect(roundToDecimal(0, 5)).toBe(0);
});
