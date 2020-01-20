import fetch from "node-fetch";

import { config } from "../config";
import { writeFile } from "./write-file";

const { apiBaseUrl, figmaJson, figmaUrl, figmaToken } = config;

type Json = { err?: string; status?: string; [key: string]: any };

export const getFromApi = async () => {
	let data: Json = {};

	const url = apiBaseUrl + figmaUrl;

	await fetch(url, {
		headers: {
			"X-Figma-Token": figmaToken as string
		}
	})
		.catch(error => {
			throw new Error("Figma Error: " + error);
		})
		.then(response => {
			if (response.status !== 200)
				throw new Error("Error to get Figma metadata from API");

			return response.json();
		})
		.then((json: Json) => {
			if (json.err)
				throw new Error(
					"Figma Error: " + json.status + " - " + json.err
				);

			data = json;

			if (figmaJson)
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
