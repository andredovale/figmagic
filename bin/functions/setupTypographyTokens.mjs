/*
 ** TODO: Make sure this is single-dimensional, as the current one is multi-dimensional
 */

import units from '../meta/units.mjs';

export function setupTypographyTokens(frame) {
	if (!frame) {
		throw new Error('No frame for setupTypographyTokens()!');
  }

  let typeTestObject = {};
	let typeObjects = [];

  for (let typography of frame.children) {
    if (!typography.name.startsWith('$')) {
      continue;
    }

		const fontName = typography.name;
		const fontFamily = typography.style.fontPostScriptName;
		const fontSize = typography.style.fontSize / units.globalRemSize + 'rem';
		const fontWeight = typography.style.fontWeight;
		const lineHeight = typography.style.lineHeightPercent / 100;

		const typeObject = {
			type: fontName,
			'font-family': fontFamily,
			'font-size': fontSize,
			'font-weight': fontWeight,
			'line-height': lineHeight
		};

		// How to deal with nested information?
		typeTestObject[fontName] = fontSize;

		const content = JSON.stringify(typeObject);
		typeObjects.push(content);
	}

	return typeTestObject;
}
