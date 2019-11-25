import { writeFile } from "../../src/functions/write-file";
import { writeTokens } from "../../src/functions/write-tokens";
import { Frame } from "../../src/types/frame";

jest.mock("fs");

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

jest.mock("../../src/functions/write-file", () => ({ writeFile: jest.fn() }));

test("It shouldn't call writeFile", () => {
	// @ts-ignore
	const tokens: Frame[] = [{ name: "Lorem Ipsum", children: [{}] }];

	writeTokens(tokens, "js");

	expect((writeFile as jest.Mock).mock.calls.length).toBe(0);
});

test("It should call writeFile", () => {
	const tokens: Frame[] = [
		{
			name: "animation",
			children: [
				{
					...({} as Frame["children"][0]),
					absoluteBoundingBox: {
						width: 2
					},
					name: "Lorem Ipsum"
				}
			]
		}
	];

	writeTokens(tokens, "js");

	expect((writeFile as jest.Mock).mock.calls.length).toBe(1);
});
