import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';

export function setupBorderTokens(frame) {
	if (!frame) {
		throw new Error('No frame for setupBorderTokens()!');
	}

	let borders = {
		global: {
			type: 'borders',
			category: 'web'
		},
		props: {}
	};

	for (let border of frame.children) {
		if (!border.name.startsWith('$')) {
			continue;
		}

		let token = {
			value: border.strokeWeight + 'px ' + border.strokes[0].type
		};

		let name = camelize(border.name);
		name = formatName(name);
		borders.props[name] = token;
	}

	return borders;
}
