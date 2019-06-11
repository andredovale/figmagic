import fs from 'fs';
import { createFolder } from './createFolder.mjs';

export function writeFile(file, path, name, isToken = false, format) {
	if (!file || !path || !name) {
		throw new Error('Missing required parameters to correctly run writeFile()!');
  }

	createFolder(path);
	write(file, path, name, isToken, format);
}

function write(file, path, name, isToken, format) {
	let fileContent = file;
	let filePath = `${path}/${name}`;

	if (isToken) {
		fileContent = `const ${name} = ${JSON.stringify(file, null, ' ')}\n\nexport default ${name};`;
		filePath += `.${format}`;
	}

	fs.writeFile(filePath, fileContent, 'utf-8', function(error) {
		if (error) {
			throw new Error('Error in write() > writeFile(): ', error);
		}
	});
}
