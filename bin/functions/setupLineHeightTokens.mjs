import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';
import { normalizeUnits } from './normalizeUnits.mjs';

export function setupLineHeightTokens(frame) {
	if (!frame) {
		throw new Error('No frame for setupLineHeightTokens()!');
  }

  let lineHeightObject = {};

  for (let lineHeight of frame.children) {
    if (!lineHeight.name.startsWith('$')) {
      continue;
    }

    let name = camelize(lineHeight.name);
		name = formatName(name);
		lineHeightObject[name] = normalizeUnits(type.style.lineHeightPercent, 'percent', 'unitless');
	}

	return lineHeightObject;
}
