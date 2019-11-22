import { setupColorTokens } from "./setupColorTokens";
import { setupSpacingTokens } from "./setupSpacingTokens";
import { setupFontTokens } from "./setupFontTokens";
import { setupFontSizeTokens } from "./setupFontSizeTokens";
import { setupFontWeightTokens } from "./setupFontWeightTokens";
import { setupLineHeightTokens } from "./setupLineHeightTokens";
import { setupRadiusTokens } from "./setupRadiusTokens";
import { setupBorderTokens } from "./setupBorderTokens";
import { setupShadowTokens } from "./setupShadowTokens";
import { setupAnimationTokens } from "./setupAnimationTokens";
import { Frame } from "../types/frame";

export const processTokens = (sheet: Frame, name: string) => {
	if (!sheet || !name)
		throw new Error("No sheet or name for processTokens()!");

	const loweredName = name.toLowerCase();

	switch (true) {
		case !!loweredName.match("animations?"):
			return setupAnimationTokens(sheet);

		case !!loweredName.match("borders?"):
			return setupBorderTokens(sheet);

		case !!loweredName.match("colou?rs?"):
			return setupColorTokens(sheet);

		case !!loweredName.match("fontsizes?"):
			return setupFontSizeTokens(sheet);

		case !!loweredName.match("fontfamil(y|ies)"):
			return setupFontTokens(sheet);

		case !!loweredName.match("fontweights?"):
			return setupFontWeightTokens(sheet);

		case !!loweredName.match("(font)?lineheights?"):
			return setupLineHeightTokens(sheet);

		case !!loweredName.match("radi(i|us)"):
			return setupRadiusTokens(sheet);

		case !!loweredName.match("shadows?"):
			return setupShadowTokens(sheet);

		case !!loweredName.match("spacings?"):
			return setupSpacingTokens(sheet);
	}
};
