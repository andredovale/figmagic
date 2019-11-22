import { writeFile } from "../../src/functions/writeFile";
import fs from "fs";
import yaml from "js-yaml";
import { createFolder } from "../../src/functions/createFolder";

jest.mock("fs");
jest.mock("js-yaml");

describe("It should throw an error if no parameter is provided", () => {
	test("Without first parameter", () => {
		expect(() => {
			// @ts-ignore
			writeFile(undefined, "lorem", "ipsum");
		}).toThrow();
	});

	test("Without second parameter", () => {
		expect(() => {
			// @ts-ignore
			writeFile("lorem", undefined, "ipsum");
		}).toThrow();
	});

	test("Without third parameter", () => {
		expect(() => {
			// @ts-ignore
			writeFile("lorem", "ipsum", undefined);
		}).toThrow();
	});
});

describe("It should change the default parameters", () => {
	test("Changing 'isToken' parameter", () => {
		writeFile("lorem", "ipsum", "dolor", true);

		expect(fs.writeFile).toBeCalled();
	});

	test("Changing 'format' parameter", () => {
		writeFile("lorem", "ipsum", "dolor", false, "ts");

		expect(fs.writeFile).toBeCalled();
	});
});

test("It should pass yaml as format and invoke yaml dump fn", () => {
	writeFile("lorem", "ipsum", "dolor", true, "yaml");

	expect(yaml.dump).toBeCalled();
});
