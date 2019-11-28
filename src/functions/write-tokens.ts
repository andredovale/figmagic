import camelCase from "lodash/camelCase";
import { processTokens } from "./process-tokens";
import { writeFile } from "./write-file";
import { Frame } from "../types/frame";

export const writeTokens = (
	tokens: Frame[],
	format: string,
	styles: { [key: string]: { name: string } }
) => {
	if (!tokens || !tokens.length)
		throw new Error("Less than one token provided to writeTokens()!");

	for (let token of tokens) {
		const processedToken = processTokens(token, token.name, styles);
		if (processedToken)
			writeFile(processedToken, "tokens", token.name, true, format);
	}
};
