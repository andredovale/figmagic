import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';
import { normalizeUnits } from './normalizeUnits.mjs';

export function setupLineHeightTokens(frame) {
	if (!frame) {
		throw new Error('No frame for setupLineHeightTokens()!');
	}

	let lineHeights = {
		global: {
			type: 'lineHeight',
			category: 'web'
		},
		props: {}
	};

	for (let lineHeight of frame.children) {
		if (!lineHeight.name.startsWith('$')) {
			continue;
		}

		let token = {
			value: normalizeUnits(lineHeight.style.lineHeightPercent, 'percent', 'unitless')
		};

		let name = camelize(lineHeight.name);
		name = formatName(name);
		lineHeights.props[name] = token;
	}

	return lineHeights;
}
