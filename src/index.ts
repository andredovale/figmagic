import rimraf from "rimraf";

import { getFromApi } from "./functions/get-from-api";
// import { createPage } from "./functions/create-page";
import { writeTokens } from "./functions/write-tokens";

(async () => {
	rimraf("./tokens", () => {});
	rimraf("./figma", () => {});

	const data = await getFromApi();

	// const tokens = createPage(data.document.children);
	// const styles = data.styles;
	writeTokens(data);
})();
