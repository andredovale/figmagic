import fs from "fs";
import yaml from "js-yaml";
import camelCase from "lodash/camelCase";
import kebabCase from "lodash/kebabCase";
import { createFolder } from "./create-folder";

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
	let filePath = `${path}/${kebabCase(name)}`;

	if (isToken) {
		if (format === "yml" || format === "yaml") {
			fileContent = yaml.dump(file);
		} else {
			const camelCaseName = camelCase(name);
			fileContent = `const ${camelCaseName} = ${JSON.stringify(
				file,
				null,
				" "
			)}\n\nexport default ${camelCaseName};`;
		}
		filePath += `.${format}`;
	}

	fs.writeFile(filePath, fileContent, "utf-8", error => {
		if (error) throw new Error(`Error in write() > writeFile(): ${error}`);
	});

	if (typeof file === "object") {
		fs.writeFile(
			filePath.replace(`.${format}`, ".d.ts"),
			`export default ${camelCase(name)};\ndeclare const ${camelCase(
				name
			)}: {\n	"${Object.keys(file).join('": string;\n	"')}": string;\n};\n`,
			"utf-8",
			error => {
				if (error)
					throw new Error(
						`Error in write TypeScript .d.ts file: ${error}`
					);
			}
		);
	}
};
