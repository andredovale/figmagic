import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';

export function setupFontWeightTokens(frame) {
	if (!frame) {
		throw new Error('No frame for setupFontWeightTokens()!');
	}

	let fontWeights = {
		global: {
			type: 'fontWeight',
			category: 'web'
		},
		props: {}
	};

	for (let fontWeight of frame.children) {
		if (!fontWeight.name.startsWith('$')) {
			continue;
		}

		let token = {
			value: fontWeight.style.fontWeight
		};

		let name = camelize(fontWeight.name);
		name = formatName(name);
		fontWeights.props[name] = token;
	}

	return fontWeights;
}
