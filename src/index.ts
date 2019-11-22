import { createFolder } from "./functions/createFolder";
import { getFromApi } from "./functions/getFromApi";
import { createPage } from "./functions/createPage";
import { writeTokens } from "./functions/writeTokens";

import rimraf from "rimraf";
import { config } from "dotenv";
config();

const [, , ...args] = process.argv;
const format = args[0]?.toLowerCase() ?? "js";

(async () => {
	rimraf("./tokens", () => {});
	rimraf("./figma", () => {});

	createFolder("tokens");
	createFolder("figma");

	const data = await getFromApi();

	const tokens = createPage(data.document.children);
	writeTokens(tokens.children, format);
})();
