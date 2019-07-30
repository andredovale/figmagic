import { setupColorTokens } from './setupColorTokens.mjs';
import { setupSpacingTokens } from './setupSpacingTokens.mjs';
import { setupFontTokens } from './setupFontTokens.mjs';
import { setupFontSizeTokens } from './setupFontSizeTokens.mjs';
import { setupFontWeightTokens } from './setupFontWeightTokens.mjs';
import { setupLineHeightTokens } from './setupLineHeightTokens.mjs';
import { setupRadiusTokens } from './setupRadiusTokens.mjs';
import { setupBorderTokens } from './setupBorderTokens.mjs';
import { setupShadowTokens } from './setupShadowTokens.mjs';
import { setupAnimationTokens } from './setupAnimationTokens.mjs';

export function processTokens(sheet, name) {
	if (!sheet || !name) {
		throw new Error('No sheet or name for processTokens()!');
	}

	const _name = name.toLowerCase();
	let processedTokens = undefined;

	// Design tokens
	switch (_name) {
		case 'color':
		case 'colour':
		case 'colors':
		case 'colours':
			processedTokens = setupColorTokens(sheet);
			break;
		case 'spacing':
		case 'spacings':
			processedTokens = setupSpacingTokens(sheet);
			break;
		case 'fontfamily':
		case 'fontfamilies':
			processedTokens = setupFontTokens(sheet);
			break;
		case 'fontsize':
		case 'fontsizes':
			processedTokens = setupFontSizeTokens(sheet);
			break;
		case 'fontweight':
		case 'fontweights':
			processedTokens = setupFontWeightTokens(sheet);
			break;
		case 'fontlineheight':
		case 'fontlineheights':
		case 'lineheight':
		case 'lineheights':
			processedTokens = setupLineHeightTokens(sheet);
			break;
		case 'radii':
		case 'radius':
			processedTokens = setupRadiusTokens(sheet);
			break;
		case 'border':
		case 'borders':
			processedTokens = setupBorderTokens(sheet);
			break;
		case 'shadow':
		case 'shadows':
			processedTokens = setupShadowTokens(sheet);
			break;
		case 'animation':
		case 'animations':
			processedTokens = setupAnimationTokens(sheet);
			break;
	}

	return processedTokens;
}
