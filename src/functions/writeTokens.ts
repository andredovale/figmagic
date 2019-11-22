import { camelize } from "./camelize";
import { formatName } from "./formatName";
import { processTokens } from "./processTokens";
import { writeFile } from "./writeFile";
import { Frame } from "../types/frame";

export const writeTokens = (tokens: Frame[], format: string) => {
	if (!tokens || !tokens.length)
		throw new Error("Less than one token provided to writeTokens()!");

	for (let token of tokens) {
		const tokenName = formatName(camelize(token.name));

		const processedToken = processTokens(token, tokenName);
		if (processedToken)
			writeFile(processedToken, "tokens", tokenName, true, format);
	}
};
