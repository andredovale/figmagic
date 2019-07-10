import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';

export function setupAnimationTokens(frame) {
	if (!frame) {
		throw new Error('No frame for setupAnimationTokens()!');
	}

	let animations = {
		global: {
			type: 'animations',
			category: 'web'
		},
		props: {}
	};

	for (let animation of frame.children) {
		if (!animation.name.startsWith('$')) {
			continue;
		}

		let token = {
			value: animation.absoluteBoundingBox.width + 'ms'
		};

		let name = camelize(animation.name);
		name = formatName(name);
		animations.props[name] = token;
	}

	return animations;
}
