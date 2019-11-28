import { writeFile } from "./write-file";
import fetch from "node-fetch";

type Json = { err?: string; status?: string; [key: string]: any };

export const getFromApi = async () => {
	let data: Json = {};

	const url = "https://api.figma.com/v1/files/" + process.env.FIGMA_URL;

	await fetch(url, {
		headers: {
			"X-Figma-Token": process.env.FIGMA_TOKEN as string
		}
	})
		.catch(error => {
			throw new Error("Figma Error: " + error);
		})
		.then(response => response.json())
		.then((json: Json) => {
			if (json.err)
				throw new Error(
					"Figma Error: " + json.status + " - " + json.err
				);

			data = json;
			writeFile(
				JSON.stringify(json, undefined, 2),
				"figma",
				"figma",
				false,
				"json"
			);
		});

	return data;
};
