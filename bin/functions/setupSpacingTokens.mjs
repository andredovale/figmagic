import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';
import { normalizeUnits } from './normalizeUnits.mjs';

export function setupSpacingTokens(frame) {
	if (!frame) {
		throw new Error('No frame for setupSpacingTokens()!');
  }

	const spacingObject = {};

  for (let spacing of frame.children) {
    if (!spacing.name.startsWith('$')) {
      continue;
    }
		let normalizedName = camelize(spacing.name);
		normalizedName = formatName(normalizedName);
		spacingObject[normalizedName] = normalizeUnits(spacing.absoluteBoundingBox.width, 'px', 'em');
	}

	return spacingObject;
}
