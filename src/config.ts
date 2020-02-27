import dotenv from "dotenv";
import fs from "fs";
import argv from "yargs";

import defaultConfig from "../.figmagic.json";

import { Config } from "./types/config.js";

dotenv.config();

let config = (defaultConfig as unknown) as Config;

const coerce = (key: string, value: string) => {
	config = {
		...config,
		[key]: value
	};

	return value;
};

argv
	.alias({ help: "h", version: "v" })
	.option("format", {
		alias: "f",
		coerce: (value: string) => coerce("format", value),
		choices: ["css", "js", "json", "sass", "scss"],
		default: config.format,
		describe: "Choose a output format"
	})
	.option("config-file", {
		alias: "c",
		boolean: true,
		coerce: configFile => {
			if (configFile) {
				config = {
					...config,
					...JSON.parse(
						fs.readFileSync(".figmagic.json", "utf8") || "{}"
					)
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
		describe: "Figma project identification URI",
		required: false,
		string: true
	})
	.option("figma-token", {
		alias: "t",
		coerce: (value: string) => coerce("figmaToken", value),
		default: process.env.FIGMA_TOKEN,
		describe: "Figma development API authorization token",
		required: false,
		string: true
	})
	.option("figma-page", {
		alias: "p",
		coerce: (value: string) => coerce("figmaPage", value),
		default: process.env.FIGMA_PAGE || config.figmaPage,
		describe: "Name of tokens page on Figma",
		required: false,
		string: true
	})
	.option("output", {
		alias: "o",
		coerce: (value: string) => coerce("outputFigmaTokensPath", value),
		describe: "Folder path for the generated tokens",
		required: false,
		string: true
	}).argv;

if (!config.figmaUrl || !config.figmaToken)
	throw new Error(
		"The environment variables 'FIGMA_URL' or 'FIGMA_TOKEN' not provided(s)"
	);

export { config };
