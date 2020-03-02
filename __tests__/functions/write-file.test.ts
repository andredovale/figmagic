import fs from "fs";
import { writeFile } from "../../src/functions/write-file";

jest.mock("fs");
jest.mock("../../src/config", () => ({
	config: { format: "js", outputNameFormat: "kebab" }
}));

describe("It should throw an error", () => {
	test("Without 'file'", () => {
		expect(() => {
			// @ts-ignore
			writeFile(undefined, "lorem", "ipsum");
		}).toThrow();
	});

	test("Without 'path'", () => {
		expect(() => {
			// @ts-ignore
			writeFile("lorem", undefined, "ipsum");
		}).toThrow();
	});

	test("Without 'name'", () => {
		expect(() => {
			// @ts-ignore
			writeFile("lorem", "ipsum", undefined);
		}).toThrow();
	});

	test("Writing the token file", () => {
		(<jest.Mock>(
			(<unknown>fs.writeFile)
		)).mockImplementationOnce(
			(_, __, ___, callback: Function = jest.fn()) => callback(true)
		);

		expect(() => {
			writeFile({}, "lorem", "ipsum");
		}).toThrow();
	});

	test("Writing .d.ts file", () => {
		(<jest.Mock>(<unknown>fs.writeFile))
			.mockImplementationOnce(() => {})
			.mockImplementationOnce(
				(_, __, ___, callback: Function = jest.fn()) => callback(true)
			);

		expect(() => {
			writeFile({}, "lorem", "ipsum");
		}).toThrow();
	});
});

describe("It should change the default parameters", () => {
	test("Changing 'isToken' parameter", () => {
		writeFile("lorem", "ipsum", "dolor", true);

		expect(fs.writeFile).toBeCalled();
	});
});

describe("It should succeed to write files", () => {
	test("Writing the token file", () => {
		(<jest.Mock>(
			(<unknown>fs.writeFile)
		)).mockImplementationOnce(
			(_, __, ___, callback: Function = jest.fn()) => callback(false)
		);

		expect(() => {
			writeFile({}, "lorem", "ipsum");
		}).not.toThrow();
	});

	test("Writing .d.ts file", () => {
		(<jest.Mock>(<unknown>fs.writeFile))
			.mockImplementationOnce(() => {})
			.mockImplementationOnce(
				(_, __, ___, callback: Function = jest.fn()) => callback(false)
			);

		expect(() => {
			writeFile(
				{
					lorem: "ipsum"
				},
				"lorem",
				"ipsum"
			);
		}).not.toThrow();
	});
});
