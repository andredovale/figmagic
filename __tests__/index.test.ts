import rimraf from "rimraf";
import { getFromApi } from "../src/functions/get-from-api";
import { writeTokens } from "../src/functions/write-tokens";

jest.mock("rimraf");
(<jest.Mock>(<unknown>rimraf)).mockImplementation(
	(string: string, callback = jest.fn()) => {
		return callback();
	}
);

jest.mock("../src/functions/get-from-api", () => ({
	getFromApi: jest.fn(() => ({
		document: { children: [{ name: "Design Tokens" }] }
	}))
}));

jest.mock("../src/functions/write-tokens", () => ({ writeTokens: jest.fn() }));

describe("Run program", () => {
	const index = require("../src/index");
	index;

	test("It should run rimraf to remove 'tokens' and 'figma' folders", () => {
		expect(rimraf).toBeCalledTimes(2);
	});

	test("It should run 'getFromApi'", () => {
		expect(getFromApi).toBeCalled();
	});

	test("It should run 'writeTokens'", () => {
		expect(writeTokens).toBeCalled();
	});
});
