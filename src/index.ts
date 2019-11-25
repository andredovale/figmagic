import { createFolder } from "./functions/create-folder";
import { getFromApi } from "./functions/get-from-api";
import { createPage } from "./functions/create-page";
import { writeTokens } from "./functions/write-tokens";

import rimraf from "rimraf";
import dotenv from "dotenv";
dotenv.config();

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
