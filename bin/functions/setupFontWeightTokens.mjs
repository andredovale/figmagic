import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';

export function setupFontWeightTokens(frame) {
	if (!frame) {
		throw new Error('No frame for setupFontWeightTokens()!');
  }

	let fontWeightObject = {};

  for (let fontWeight of frame.children) {
    if (!fontWeight.name.startsWith('$')) {
      continue;
    }

	  let name = camelize(fontWeight.name);
		name = formatName(name);
		fontWeightObject[name] = fontWeight.style.fontWeight;
	}

	return fontWeightObject;
}
