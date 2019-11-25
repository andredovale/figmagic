// import rimraf from "rimraf";
import { writeTokens } from "../src/functions/write-tokens";

jest.mock("fs");
jest.mock("rimraf");
jest.mock("dotenv");

jest.mock("../src/functions/get-from-api", () => ({
	getFromApi: jest.fn(() => ({
		document: { children: [{ name: "Design Tokens" }] }
	}))
}));
jest.mock("../src/functions/write-tokens", () => ({ writeTokens: jest.fn() }));

describe("Process values", () => {
	const OLD_ARGV = process.argv;

	beforeEach(() => {
		jest.resetModules();
		process.argv = { ...OLD_ARGV };
	});

	afterEach(() => {
		process.argv = OLD_ARGV;
	});

	test("It should run with format", () => {
		process.argv = ["", "", "js"];

		const index = require("../src/index");
		index;

		expect(writeTokens).toBeCalled();
	});
});
