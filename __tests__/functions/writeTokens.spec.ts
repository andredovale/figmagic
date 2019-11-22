import { writeFile } from "../../src/functions/writeFile";
import { writeTokens } from "../../src/functions/writeTokens";
import { Frame } from "../../src/types/frame";

describe("It should throw an error if no parameter is provided", () => {
	test("Without first parameter", () => {
		expect(() => {
			// @ts-ignore
			writeTokens(undefined, "js");
		}).toThrow();
	});

	test("Without second parameter", () => {
		expect(() => {
			// @ts-ignore
			writeTokens({});
		}).toThrow();
	});
});

jest.mock("../../src/functions/writeFile", () => ({ writeFile: jest.fn() }));

test("It shouldn't call writeFile", () => {
	const tokens: Frame[] = [{ name: "Lorem Ipsum", children: [] }];

	writeTokens(tokens, "js");

	expect((writeFile as jest.Mock).mock.calls.length).toBe(0);
});

test("It should call writeFile", () => {
	const tokens: Frame[] = [{ name: "Animation", children: [] }];

	writeTokens(tokens, "js");

	expect((writeFile as jest.Mock).mock.calls.length).toBe(1);
});
