import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';

export function setupRadiusTokens(frame) {
	if (!frame) {
		throw new Error('No frame for setupRadiusTokens()!');
	}

	let radii = {
		global: {
			type: 'radius',
			category: 'web'
		},
		props: {}
	};

	for (let radius of frame.children) {
		if (!radius.name.startsWith('$')) {
			continue;
		}

		let token = {
			value: radius.cornerRadius + 'px'
		};

		let name = camelize(radius.name);
		name = formatName(name);
		radii.props[name] = token;
	}

	return radii;
}
