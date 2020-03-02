jest.mock("dotenv");
jest.mock("fs");

jest.mock("../.figmagic.json", () => ({}));

const ARGV: any[] = ["", ""];
const ENV = {
	FIGMA_PAGE: "lorem",
	FIGMA_TOKEN: "ipsum",
	FIGMA_URL: "dolor"
};

describe("It should throw an error", () => {
	const OLD_ENV = process.env;
	const OLD_ARGV = process.argv;

	beforeEach(() => {
		jest.resetModules();
		process.env = { ...OLD_ENV };
		process.argv = { ...OLD_ARGV };
	});

	afterEach(() => {
		process.env = OLD_ENV;
		process.argv = OLD_ARGV;
	});

	test("Without FIGMA_TOKEN", () => {
		process.argv = ARGV;
		process.env = {
			...ENV,
			FIGMA_TOKEN: undefined
		};

		expect(() => {
			require("../src/config");
		}).toThrow();
	});

	test("Without FIGMA_URL", () => {
		process.argv = ARGV;
		process.env = {
			...ENV,
			FIGMA_URL: undefined
		};

		expect(() => {
			require("../src/config");
		}).toThrow();
	});
});

describe("It should return config without error", () => {
	const OLD_ENV = process.env;
	const OLD_ARGV = process.argv;

	beforeEach(() => {
		jest.resetModules();
		process.env = { ...OLD_ENV };
		process.argv = { ...OLD_ARGV };
	});

	afterEach(() => {
		process.env = OLD_ENV;
		process.argv = OLD_ARGV;
	});

	const mock = {
		figmaPage: "lorem",
		figmaToken: "ipsum",
		figmaUrl: "dolor"
	};

	test("Without --config-file argv", () => {
		process.argv = ARGV;
		process.env = ENV;

		const { config } = require("../src/config");

		expect(config).toMatchObject(mock);
	});

	test("With --config-file argv", () => {
		process.argv = [...ARGV, "-c"];
		process.env = ENV;

		const { config } = require("../src/config");

		expect(config).toMatchObject(mock);
	});

	test("With 'figmaPage' on .figmagic.json", () => {
		process.argv = ARGV;
		process.env = { ...ENV, FIGMA_PAGE: undefined };

		const { config } = require("../src/config");

		jest.mock("../.figmagic.json", () => ({
			figmaPage: "Design tokens"
		}));

		expect(config).toMatchObject({ ...mock, figmaPage: "Design tokens" });
	});
});
