import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';

export function setupFontTokens(frame) {
	if (!frame) {
		throw new Error('No frame for setupFontTokens()!');
	}

	let fonts = {
		global: {
			type: 'font',
			category: 'web'
		},
		props: {}
	};

	for (let font of frame.children) {
		if (!font.name.startsWith('$') || font.type !== 'TEXT') {
			continue;
		}

		let token = {
			value: font.style.fontPostScriptName
		};

		let name = camelize(font.name);
		name = formatName(name);
		fonts.props[name] = token;
	}

	return fonts;
}
