import fetch from "node-fetch";

const { Response } = jest.requireActual("node-fetch");

jest.mock("dotenv");
jest.mock("fs");
jest.mock("node-fetch");

jest.mock("../../src/functions/write-file", () => ({
	writeFile: () => {}
}));

describe("It should throw an error", () => {
	let getFromApi: Function;

	test("With catch", () => {
		jest.mock("../../src/config", () => ({ config: {} }));

		jest.isolateModules(() => {
			({ getFromApi } = require("../../src/functions/get-from-api"));
		});

		(fetch as jest.MockedFunction<typeof fetch>).mockReturnValue(
			Promise.reject("ERROR!")
		);

		expect(getFromApi()).rejects.toThrow();
	});

	test("In response with 'status' different from 200", async () => {
		jest.mock("../../src/config", () => ({ config: {} }));

		jest.isolateModules(() => {
			({ getFromApi } = require("../../src/functions/get-from-api"));
		});

		const mock = new Response(null, { status: 204 });

		(fetch as jest.MockedFunction<typeof fetch>).mockReturnValue(
			Promise.resolve(mock)
		);

		expect(getFromApi()).rejects.toThrow();
	});

	test("In response with 'err' key", () => {
		jest.mock("../../src/config", () => ({ config: {} }));

		jest.isolateModules(() => {
			({ getFromApi } = require("../../src/functions/get-from-api"));
		});

		const mock = { err: "Lorem ipsum", status: "200" };

		(fetch as jest.MockedFunction<typeof fetch>).mockReturnValue(
			Promise.resolve(new Response(JSON.stringify(mock)))
		);

		expect(getFromApi()).rejects.toThrow();
	});
});

describe("It should return a mocked object", () => {
	let getFromApi: Function;
	const mock = { lorem: "ipsum", dolor: "sit" };

	beforeEach(() => {
		(fetch as jest.MockedFunction<typeof fetch>).mockReturnValue(
			Promise.resolve(new Response(JSON.stringify(mock)))
		);
	});

	test("Without 'figmajson'", async () => {
		jest.mock("../../src/config", () => ({ config: {} }));

		jest.isolateModules(() => {
			({ getFromApi } = require("../../src/functions/get-from-api"));
		});
		const response = await getFromApi();

		expect(response).toMatchObject(mock);
	});

	test("With 'figmajson'", async () => {
		jest.mock("../../src/config", () => ({
			config: {
				figmaJson: true
			}
		}));

		jest.isolateModules(() => {
			({ getFromApi } = require("../../src/functions/get-from-api"));
		});
		const response = await getFromApi();

		expect(response).toMatchObject(mock);
	});
});
