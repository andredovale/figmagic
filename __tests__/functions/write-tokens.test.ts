import { setupToken } from "../../src/functions/setup-token";
import { writeFile } from "../../src/functions/write-file";

jest.mock("../../src/functions/setup-token", () => ({
	setupToken: jest.fn()
}));
jest.mock("../../src/functions/tokens-page", () => ({
	tokensPage: jest.fn()
}));
jest.mock("../../src/functions/write-file", () => ({
	writeFile: jest.fn()
}));

let writeTokens: Function;

test("It should return undefined without 'figmaTokens' on 'config'", () => {
	jest.mock("../../src/config", () => ({
		config: {}
	}));

	jest.isolateModules(() => {
		({ writeTokens } = require("../../src/functions/write-tokens"));
	});

	expect(writeTokens({})).toBeUndefined();
});

describe("It should throw an error", () => {
	test("Without tokens on 'config'", () => {
		jest.mock("../../src/config", () => ({
			config: {
				figmaTokens: true
			}
		}));

		jest.isolateModules(() => {
			({ writeTokens } = require("../../src/functions/write-tokens"));
		});

		expect(() => {
			writeTokens({});
		}).toThrow();
	});

	test("Without length in tokens on 'config'", () => {
		jest.mock("../../src/config", () => ({
			config: {
				figmaTokens: true,
				tokens: []
			}
		}));

		jest.isolateModules(() => {
			({ writeTokens } = require("../../src/functions/write-tokens"));
		});

		expect(() => {
			writeTokens({});
		}).toThrow();
	});
});

afterEach(() => {
	jest.clearAllMocks();
});

test("It should succeed to write files", () => {
	jest.mock("../../src/config", () => ({
		config: {
			figmaTokens: true,
			tokens: [{}]
		}
	}));

	(<jest.Mock>setupToken).mockReturnValueOnce("Lorem Ipsum");
	jest.isolateModules(() => {
		({ writeTokens } = require("../../src/functions/write-tokens"));
	});

	writeTokens({ document: { children: [] } });

	expect(setupToken).toBeCalled();
	expect(writeFile).toBeCalled();
});

test("It shouldn't succeed to write files", () => {
	jest.mock("../../src/config", () => ({
		config: {
			figmaTokens: true,
			tokens: [{}]
		}
	}));

	(<jest.Mock>setupToken).mockReturnValueOnce("");
	jest.isolateModules(() => {
		({ writeTokens } = require("../../src/functions/write-tokens"));
	});

	writeTokens({ document: { children: [] } });

	expect(setupToken).toBeCalled();
	expect(writeFile).not.toBeCalled();
});
