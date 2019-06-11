import { units } from '../meta/units.mjs';
import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';

export function setupFontSizeTokens(frame) {
	if (!frame) {
		throw new Error('No frame for setupFontSizeTokens()!');
  }

	let fontSizeObject = {};

  for (let fontSize of frame.children){
    if (!fontSize.name.startsWith('$')) {
      continue;
    }

		let name = camelize(fontSize.name);
		name = formatName(name);
		fontSizeObject[name] = fontSize.style.fontSize / units.globalRemSize + 'rem'; // TODO: Use a converter function?
	}

	return fontSizeObject;
}
