import { camelize } from "../../src/functions/camelize";

test("It should throw an error if no parameter is provided", () => {
	expect(() => {
		// @ts-ignore
		camelize();
	}).toThrow();
});

test("It should remove spaces before and after the text, make all letters in \
lowercase, capitalize all letters coming after any white space, and by end \
remove the remaining white spaces", () => {
	expect(camelize("   Lorem Ipsum Dolor   ")).toBe("loremIpsumDolor");
});
