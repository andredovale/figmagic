import { getFromApi } from "../../src/functions/get-from-api";
import fetch from "node-fetch";
const { Response } = jest.requireActual("node-fetch");

jest.mock("fs");
jest.mock("node-fetch");

test("It should return a mocked object", async () => {
	const mock = { lorem: "ipsum", dolor: "sit" };

	(fetch as jest.MockedFunction<typeof fetch>).mockReturnValue(
		Promise.resolve(new Response(JSON.stringify(mock)))
	);

	const response = await getFromApi();

	expect(fetch).toHaveBeenCalledTimes(1);
	expect(response).toMatchObject(mock);
});

test("It should throw an error with catch", async () => {
	(fetch as jest.MockedFunction<typeof fetch>).mockReturnValue(
		Promise.reject("ERROR!")
	);

	expect(getFromApi()).rejects.toThrow();
});

test("It should throw an error in response with error", async () => {
	const mock = { err: "Lorem ipsum", status: "401" };

	(fetch as jest.MockedFunction<typeof fetch>).mockReturnValue(
		Promise.resolve(new Response(JSON.stringify(mock)))
	);

	expect(getFromApi()).rejects.toThrow();
});
