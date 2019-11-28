import { setupColorTokens } from "./setup-color-tokens";
import { setupSpacingTokens } from "./setup-spacing-tokens";
import { setupFontTokens } from "./setup-font-tokens";
import { setupFontSizeTokens } from "./setup-font-size-tokens";
import { setupFontWeightTokens } from "./setup-font-weight-tokens";
import { setupLineHeightTokens } from "./setup-line-height-tokens";
import { setupRadiusTokens } from "./setup-radius-tokens";
import { setupBorderTokens } from "./setup-border-tokens";
import { setupShadowTokens } from "./setup-shadow-tokens";
import { setupAnimationTokens } from "./setup-animation-tokens";
import { setupMixinTokens } from "./setup-mixin-tokens";
import { setupGridTokens } from "./setup-grid-tokens";
import { Frame } from "../types/frame";

export const processTokens = (
	sheet: Frame,
	name: string,
	styles: { [key: string]: { name: string } }
) => {
	if (!sheet || !name)
		throw new Error("No sheet or name for processTokens()!");

	const loweredName = name.toLowerCase();

	try {
		switch (true) {
			case !!loweredName.match("animations?"):
				return setupAnimationTokens(sheet);

			case !!loweredName.match("borders?"):
				return setupBorderTokens(sheet);

			case !!loweredName.match("colou?rs?"):
				return setupColorTokens(sheet, styles);

			case !!loweredName.match("grids?"):
				return setupGridTokens(sheet);

			case !!loweredName.match("fontsizes?"):
				return setupFontSizeTokens(sheet);

			case !!loweredName.match("fontfamil(y|ies)"):
				return setupFontTokens(sheet);

			case !!loweredName.match("fontweights?"):
				return setupFontWeightTokens(sheet);

			case !!loweredName.match("(font)?lineheights?"):
				return setupLineHeightTokens(sheet);

			case !!loweredName.match("mixins?|tim(e|ings?)"):
				return setupMixinTokens(sheet);

			case !!loweredName.match("radi(i|us)"):
				return setupRadiusTokens(sheet);

			case !!loweredName.match("shadows?"):
				return setupShadowTokens(sheet, styles);

			case !!loweredName.match("spac(es?|ings?)"):
				return setupSpacingTokens(sheet);
		}
	} catch (error) {
		console.error(error);
	}
};
