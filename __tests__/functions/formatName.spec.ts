import { formatName } from "../../src/functions/formatName";

test("It should throw an error if no parameter is provided", () => {
	expect(() => {
		// @ts-ignore
		formatName();
	}).toThrow();
});

test("It should remove single instances of forbidden characters", () => {
	expect(formatName("Lorem–Ipsum—Dolor|Sit")).toBe("LoremIpsumDolorSit");
});
