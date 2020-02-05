import fs from "fs";

import { Json, WriteFile } from "../types/common";
import { config } from "../config";

import { createFolder } from "./create-folder";
import { stringParser } from "./parse-string";

const { format } = config;

const writeFile: WriteFile = (file, path, name, isToken = false) => {
	if (!file || !path || !name)
		throw new Error(
			"Missing required parameters to correctly run writeFile()!"
		);

	createFolder(path);
	write(file, path, name, isToken);
};

const writeDeclarations = (
	file: Json | string,
	name: string,
	filePath: string
) => {
	fs.writeFile(
		filePath.replace(`.${format}`, ".d.ts"),
		`export default ${stringParser(
			name,
			"camel"
		)};\n\ndeclare const ${stringParser(name, "camel")}: {\n	"${Object.keys(
			file
		).join('": string;\n	"')}": string;\n};\n`,
		"utf-8",
		error => {
			if (error)
				throw new Error(
					`Error in write TypeScript .d.ts file: ${error}`
				);
		}
	);
};

const write = (
	file: Json | string,
	path: string,
	name: string,
	isToken: boolean
) => {
	let fileContent: string | Json = file;
	let filePath = `${path}/${stringParser(name)}`;

	if (isToken) {
		const camelCaseName = stringParser(name, "camel");
		fileContent = `const ${camelCaseName} = ${JSON.stringify(
			file,
			null,
			"	"
		)}\n\nexport default ${camelCaseName};`;
	}
	filePath += `.${format}`;

	fs.writeFile(filePath, fileContent, "utf-8", error => {
		if (error) throw new Error(`Error in write() > writeFile(): ${error}`);
	});

	if (format === "js" && typeof file === "object")
		writeDeclarations(file, name, filePath);
};

export { writeFile };
