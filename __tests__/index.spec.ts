import rimraf from "rimraf";
import { writeTokens } from "../src/functions/writeTokens";

jest.mock("fs");
jest.mock("rimraf");
jest.mock("dotenv");

jest.mock("../src/functions/getFromApi", () => ({
	getFromApi: jest.fn(() => ({
		document: { children: [{ name: "Design Tokens" }] }
	}))
}));
jest.mock("../src/functions/writeTokens", () => ({ writeTokens: jest.fn() }));

describe("Process values", () => {
	const OLD_ARGV = process.argv;

	beforeEach(() => {
		jest.resetModules();
		process.argv = { ...OLD_ARGV };
	});

	afterEach(() => {
		process.argv = OLD_ARGV;
	});

	test("It should run figmagic", () => {
		process.argv = [];

		import("../src/index").then(() => {
			expect(
				(rimraf as jest.MockedFunction<typeof rimraf>).mock.calls
			).toEqual([
				["./tokens", () => {}],
				["./figma", () => {}]
			]);
			expect((writeTokens as jest.Mock).mock.calls.length).toBe(1);
		});
	});

	test("It should run with format", () => {
		process.argv = ["", "", "js"];

		import("../src/index").then(() => {
			expect((writeTokens as jest.Mock).mock.calls.length).toBe(1);
		});
	});
});
