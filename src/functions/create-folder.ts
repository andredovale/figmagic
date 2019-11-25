import fs from "fs";

export const createFolder = (directory: string): void => {
	if (!directory)
		throw new Error("No directory specified for createFolder()!");

	if (!fs.existsSync(directory)) fs.mkdirSync(directory);
};
