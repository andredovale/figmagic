import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';
import { roundToDecimal } from './roundToDecimal.mjs';

export function setupColorTokens(frame) {
	if (!frame) {
		throw new Error('No frame for setupColorTokens()!');
	}

	let colors = {
		global: {
			type: 'color',
			category: 'web'
		},
		props: {}
	};

	for (let color of frame.children) {
		if (!color.name.startsWith('$') || color.type !== 'RECTANGLE') {
			continue;
		}

		const colorR = Math.round(color.fills[0].color.r * 255);
		const colorG = Math.round(color.fills[0].color.g * 255);
		const colorB = Math.round(color.fills[0].color.b * 255);
		const colorA = roundToDecimal(color.fills[0].color.a * 1, 3);

		let token = {
			value: `rgba(${colorR}, ${colorG}, ${colorB}, ${colorA})`
		};

		let name = camelize(color.name);
		name = formatName(name);
		colors.props[name] = token;
	}

	return colors;
}
