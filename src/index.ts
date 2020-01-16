import fs from "fs";
import argv from "yargs";
import dotenv from "dotenv";
import rimraf from "rimraf";

import defaultConfig from "../.figmagic.json";

import { createFolder } from "./functions/create-folder";
import { getFromApi } from "./functions/get-from-api";
import { createPage } from "./functions/create-page";
import { writeTokens } from "./functions/write-tokens";

dotenv.config();
if (!process.env.FIGMA_URL || !process.env.FIGMA_TOKEN)
	throw new Error(
		"The environment variables 'FIGMA_URL' or 'FIGMA_TOKEN' not provided(s)"
	);

let config: { [key: string]: any } = defaultConfig;

const coerce = (key: string, value: string) => {
	config = {
		...config,
		[key]: value
	};

	return value;
};

argv.alias({ help: "h", version: "v" })
	.option("format", {
		alias: "f",
		coerce: (value: string) => coerce("format", value),
		choices: ["css", "js", "json", "sass", "scss"],
		default: "js",
		describe: "Choose a output format"
	})
	.option("config-file", {
		alias: "c",
		boolean: true,
		coerce: configFile => {
			if (configFile) {
				config = {
					...config,
					...JSON.parse(fs.readFileSync(".figmagic.json", "utf8"))
				};
			}

			return configFile;
		},
		default: false,
		describe: "Extend and modify the default config file: .figmagic.json"
	})
	.option("figma-url", {
		alias: "u",
		coerce: (value: string) => coerce("figmaUrl", value),
		default: process.env.FIGMA_URL,
		required: false,
		string: true
	})
	.option("figma-token", {
		alias: "t",
		coerce: (value: string) => coerce("figmaToken", value),
		default: process.env.FIGMA_TOKEN,
		required: false,
		string: true
	})
	.option("figma-page", {
		alias: "p",
		coerce: (value: string) => coerce("figmaPage", value),
		default: process.env.FIGMA_PAGE || "Design Tokens",
		required: false,
		string: true
	});

(async () => {
	rimraf("./tokens", () => {});
	rimraf("./figma", () => {});

	createFolder("tokens");
	createFolder("figma");

	const data = await getFromApi();

	const tokens = createPage(data.document.children);
	const styles = data.styles;
	writeTokens(tokens.children, config.format, styles);
})();
