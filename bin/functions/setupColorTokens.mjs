import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';

export function setupColorTokens(frame) {
	if (!frame) {
		throw new Error('No frame for setupColorTokens()!');
	}

	let colors = {
		props: {}
	};

	for (let color of frame.children) {
		if (!color.name.startsWith('$') || color.type !== 'RECTANGLE') {
			continue;
		}

		let token = {
			value: `rgba(${color.fills[0].color.r * 255}, ${color.fills[0].color.g * 255}, ${color
				.fills[0].color.b * 255}, ${color.fills[0].color.a * 1})`,
			type: 'color',
			category: 'background'
		};

		let normalizedName = camelize(color.name);
		normalizedName = formatName(normalizedName);
		colors.props[normalizedName] = token;
	}

	return colors;
}
