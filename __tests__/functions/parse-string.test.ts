describe("Test different output formats", () => {
	let stringParser: Function;

	test(`Camel case`, () => {
		jest.mock("../../src/config", () => ({
			config: {
				outputNameFormat: "camel"
			}
		}));

		jest.isolateModules(() => {
			({ stringParser } = require("../../src/functions/parse-string"));
		});

		const input = "Lorem Ipsum";
		const output = "loremIpsum";

		expect(stringParser(input)).toBe(output);
	});

	test(`Kebab case`, () => {
		jest.mock("../../src/config", () => ({
			config: {
				outputNameFormat: "kebab"
			}
		}));

		jest.isolateModules(() => {
			({ stringParser } = require("../../src/functions/parse-string"));
		});

		const input = "Lorem Ipsum";
		const output = "lorem-ipsum";

		expect(stringParser(input)).toBe(output);
	});

	test(`Lower case`, () => {
		jest.mock("../../src/config", () => ({
			config: {
				outputNameFormat: "lower"
			}
		}));

		jest.isolateModules(() => {
			({ stringParser } = require("../../src/functions/parse-string"));
		});

		const input = "Lorem Ipsum";
		const output = "lorem ipsum";

		expect(stringParser(input)).toBe(output);
	});

	test(`Snake case`, () => {
		jest.mock("../../src/config", () => ({
			config: {
				outputNameFormat: "snake"
			}
		}));

		jest.isolateModules(() => {
			({ stringParser } = require("../../src/functions/parse-string"));
		});

		const input = "Lorem Ipsum";
		const output = "lorem_ipsum";

		expect(stringParser(input)).toBe(output);
	});

	test(`Start case`, () => {
		jest.mock("../../src/config", () => ({
			config: {
				outputNameFormat: "start"
			}
		}));

		jest.isolateModules(() => {
			({ stringParser } = require("../../src/functions/parse-string"));
		});

		const input = "Lorem Ipsum";
		const output = "Lorem Ipsum";

		expect(stringParser(input)).toBe(output);
	});

	test(`Upper case`, () => {
		jest.mock("../../src/config", () => ({
			config: {
				outputNameFormat: "upper"
			}
		}));

		jest.isolateModules(() => {
			({ stringParser } = require("../../src/functions/parse-string"));
		});

		const input = "Lorem Ipsum";
		const output = "LOREM IPSUM";

		expect(stringParser(input)).toBe(output);
	});
});
