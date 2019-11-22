import fs from "fs";
import yaml from "js-yaml";
import { createFolder } from "./createFolder";

type Json = { err?: string; status?: string; [key: string]: any };

type WriteFile = (
	file: Json | string,
	path: string,
	name: string,
	isToken?: boolean,
	format?: string
) => void;

export const writeFile: WriteFile = (
	file,
	path,
	name,
	isToken = false,
	format = "js"
) => {
	if (!file || !path || !name)
		throw new Error(
			"Missing required parameters to correctly run writeFile()!"
		);

	createFolder(path);
	write(file, path, name, isToken, format);
};

const write = (
	file: Json | string,
	path: string,
	name: string,
	isToken: boolean,
	format: string
) => {
	let fileContent: string | Json = file;
	let filePath = `${path}/${name}`;

	if (isToken) {
		if (format === "yml" || format === "yaml") {
			fileContent = yaml.dump(file);
		} else {
			fileContent = `const ${name} = ${JSON.stringify(
				file,
				null,
				" "
			)}\n\nexport default ${name};`;
		}
		filePath += `.${format}`;
	}

	fs.writeFile(filePath, fileContent, "utf-8", error => {
		if (error) throw new Error(`Error in write() > writeFile(): ${error}`);
	});
};
