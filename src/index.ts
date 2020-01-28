import rimraf from "rimraf";

import { getFromApi } from "./functions/get-from-api";
import { writeTokens } from "./functions/write-tokens";

(async () => {
	rimraf("./tokens", () => {});
	rimraf("./figma", () => {});

	const data = await getFromApi();

	writeTokens(data);
})();
