import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';

export function setupFontTokens(frame) {
	if (!frame) {
		throw new Error('No frame for setupFontTokens()!');
  }

  let fontObject = {};

  for (let font of frame.children){
    if(!font.name.startsWith('$') || font.type !== 'TEXT') {
      continue;
    }

    let name = camelize(font.name);
    name = formatName(name);
    fontObject[name] = font.style.fontPostScriptName;
  }

	return fontObject;
}
