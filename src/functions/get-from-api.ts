import fetch from "node-fetch";

import { Json } from "../types/common";
import { config } from "../config";

import { writeFile } from "./write-file";

const {
	apiBaseUrl,
	figmaJson,
	figmaUrl,
	figmaToken,
	outputFigmaJsonPath,
	outputFigmaJsonName
} = config;

export const getFromApi = async () => {
	let data: Json = {};

	const url = apiBaseUrl + figmaUrl;

	await fetch(url, {
		headers: {
			"X-Figma-Token": figmaToken
		}
	})
		.catch(error => {
			throw new Error("Figma Error: " + error);
		})
		.then(async response => {
			if (response.status !== 200)
				throw new Error("Error getting Figma metadata from API");

			const json: Json = await response.json();

			if (json.err)
				throw new Error(
					"Figma Error: " + json.status + " - " + json.err
				);

			data = json;

			if (figmaJson)
				writeFile(
					JSON.stringify(json, undefined, 2),
					outputFigmaJsonPath,
					outputFigmaJsonName,
					false
				);
		});

	return data;
};
