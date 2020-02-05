import rimraf from "rimraf";

import { getFromApi } from "./functions/get-from-api";
import { writeTokens } from "./functions/write-tokens";
import { config } from "./config";

const { outputFigmaJsonPath, outputFigmaTokensPath } = config;

(async () => {
	rimraf(`./${outputFigmaJsonPath}`, () => {});
	rimraf(`./${outputFigmaTokensPath}`, () => {});

	const data = await getFromApi();

	writeTokens(data);
})();
