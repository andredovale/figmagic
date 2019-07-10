import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';
import { normalizeUnits } from './normalizeUnits.mjs';

export function setupSpacingTokens(frame) {
	if (!frame) {
		throw new Error('No frame for setupSpacingTokens()!');
	}

	let spacings = {
		global: {
			type: 'spacing',
			category: 'web'
		},
		props: {}
	};

	for (let spacing of frame.children) {
		if (!spacing.name.startsWith('$')) {
			continue;
		}

		let token = {
			value: normalizeUnits(spacing.absoluteBoundingBox.width, 'px', 'em')
		};

		let name = camelize(spacing.name);
		name = formatName(name);
		spacings.props[name] = token;
	}

	return spacings;
}
