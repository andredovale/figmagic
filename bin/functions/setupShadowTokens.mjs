import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';
import { roundToDecimal } from './roundToDecimal.mjs';

export function setupShadowTokens(frame) {
	if (!frame) {
		throw new Error('No frame for setupShadowTokens()!');
	}

	let shadows = {
		global: {
			type: 'shadows',
			category: 'web'
		},
		props: {}
	};

	for (let shadow of frame.children) {
		if (!shadow.name.startsWith('$')) {
			continue;
		}

		const shadowOffsetX = shadow.effects[0].offset.x + 'px ';
		const shadowOffsetY = shadow.effects[0].offset.y + 'px ';
		const shadowRadius = shadow.effects[0].radius + 'px ';
		const shadowColorR = Math.round(shadow.effects[0].color.r * 255);
		const shadowColorG = Math.round(shadow.effects[0].color.g * 255);
		const shadowColorB = Math.round(shadow.effects[0].color.b * 255);
		const shadowColorA = roundToDecimal(shadow.effects[0].color.a * 1, 3);
		const shadowColor = `rgba(${shadowColorR}, ${shadowColorG}, ${shadowColorB}, ${shadowColorA})`;

		let token = {
			value: shadowOffsetX + shadowOffsetY + shadowRadius + shadowColor
		};

		let name = camelize(shadow.name);
		name = formatName(name);
		shadows.props[name] = token;
	}

	return shadows;
}
