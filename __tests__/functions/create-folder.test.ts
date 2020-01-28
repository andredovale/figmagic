import { createFolder } from "../../src/functions/create-folder";
import fs from "fs";

jest.mock("fs");

test("It should throw an error if no parameter is provided", () => {
	expect(() => {
		// @ts-ignore
		createFolder();
	}).toThrow();
});

test("It should verify the __tests__ folder exists", () => {
	(<jest.Mock>fs.existsSync).mockReturnValue(true);

	createFolder("__tests__");

	expect(fs.mkdirSync).not.toHaveBeenCalled();
});

test("It should verify the __lorem_ipsum__ folder don't exists", () => {
	(<jest.Mock>fs.existsSync).mockReturnValue(false);

	createFolder("__lorem_ipsum__");

	expect(fs.mkdirSync).toHaveBeenCalled();
});
