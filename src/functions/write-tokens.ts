import { config } from "../config";
import { setupToken } from "./setup-token";
import { tokensPage } from "./tokens-page";
import { writeFile } from "./write-file";

const { tokens } = config;

type Json = { err?: string; status?: string; [key: string]: any };

export const writeTokens = (data: Json) => {
	if (!tokens || !tokens.length)
		throw new Error("Less than one token provided to writeTokens()!");

	for (let token of tokens) {
		const processedToken = setupToken(
			token,
			tokensPage(data.document.children),
			data.styles
		);

		if (processedToken)
			writeFile(processedToken, "tokens", token.name, true);
	}
};
